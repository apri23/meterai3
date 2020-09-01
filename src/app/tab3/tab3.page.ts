import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';
import { DesctransaksiPage } from '../pages/desctransaksi/desctransaksi.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  _member_username:any;

  exitval:any = '1';
  hal:any = '3';

	TransaksiData:any;

  minDate:any = '2020-03-01';

  maxDate:any;

  tglsatu:any;

  tgl_1:any;
  tgl_2:any;

  constructor(
  	private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private statusBar: StatusBar
  ) {
    this.statusBar.backgroundColorByHexString('#273677');
    this.exit();
  }

  ionViewWillEnter() {
    this.storage.get('storage_xxx_wom_pos').then((res) => {
    if(res == null){
        this.navCtrl.navigateRoot('/login');
      } else {
        this.date();
        this.datesatu();

        this._member_username = res.member_username;
        this.filter_trx_bytgl(res.member_username,this.tgl_1,this.tgl_2);
      }
    });
  }

  ionViewWillLeave() {
    
  }

  ngOnInit() {
  	
  }

  date(){
    var today:any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy+'-'+mm+'-'+dd;
    this.maxDate = today;
    this.tgl_2 = today;
  }

  datesatu(){
    var today:any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy+'-'+mm+'-'+'01';
    this.tglsatu = today;
    this.tgl_1 = today;
  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async toastexit(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2200,
      mode: 'ios',
      color: "dark",

    });
    toast.present();
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      mode: 'ios',
      color: "danger",
    });
    toast.present();
  }

  async get_trx(id){
    this.TransaksiData = null;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios'
    });
    Loading.present();
    let body = {
      member_username:id
    };
    this.accsPrvds.postData(body, 'get_trx').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
        this.TransaksiData = res.respon_data;
      } else {
        this.TransaksiData = '99';
      }
    },(err)=>{
      this.presentToast('Kesalahan Layanan Api');
    });
  }

  async filter_trx_bytgl(usr,tg1,tg2){
    this.TransaksiData = null;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios'
    });
    Loading.present();
    let body = {
      member_username: usr,
      tgl1: tg1,
      tgl2: tg2,
    };
    this.accsPrvds.postData(body, 'get_trx_bytgl').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
        this.TransaksiData = res.respon_data;
      } else {
        this.TransaksiData = '99';
      }
    },(err)=>{
      this.presentToast('Kesalahan Layanan Api');
    });

  }

  async detail_transaksi(trx_id){
    const modal = await this.modalCtrl.create({
      component: DesctransaksiPage,
      componentProps: {
        trx_id:trx_id
      }
    });
    modal.onDidDismiss().then((data) => {
      // this.ionViewWillEnter();
      this.filter_trx_bytgl(this._member_username,this.tgl_1,this.tgl_2);
    });
    modal.present();
  }

  tohome(){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  exit(){
    this.platform.backButton.subscribeWithPriority(10, () => {
        setTimeout(() => {
        this.exitval = '1';
        console.log(this.exitval);
      }, 2200);
      if(this.hal == '3'){
        if(this.exitval == '1'){
          this.toastexit('Tekan sekali lagi untuk keluar');
        } else if(this.exitval == '2'){
          navigator['app'].exitApp();
        }
        this.exitval = '2';
      }
    });
  }
}

