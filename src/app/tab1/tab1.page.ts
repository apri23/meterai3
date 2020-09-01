import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, PopoverController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';
import { DescpointPage } from '../pages/descpoint/descpoint.page';
import { DescjnsmemberPage } from '../pages/descjnsmember/descjnsmember.page';
import { ModalPage } from '../pages/modal/modal.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  Slidenew: any;
  Produk:any;
  MemberData:any;
  _notif:number;
  _pointreward:any;

  notiflogin:any;

  slideOptsOne = {
    autoplay:true,
    effect:'flip', 
    speed: 1000,
    initialSlide: 1,
  };

  date:any = Date.now();

  backButtonSubscription;

  exitval:any = '1';
  hal:any = '1';

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
      // console.log(res);
      if(res == null){
        this.MemberData = null;
        this._notif = 0;
        setTimeout(() => {
          this.notiflogin = true;
        }, 5000);
        this.get_pointrewards();
      } else {
        this.get_member(res.member_username);
        this.get_notif(res.member_username);
        setTimeout(() => {
          this.notiflogin = false;
        }, 5000);
        this.get_pointrewards();
      }
    });

  }

  ionViewWillLeave(){
    this.MemberData = null;
  }

  ngOnInit() {
    this.get_news();
    this.get_produk();

    // this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
    //   navigator['app'].exitApp();
    // });
  }

  doRefresh(event) {
    this.ngOnInit();
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
      this.slideOptsOne;
    }, 1000);
  }

  notif(){
    this.navCtrl.navigateRoot('/notif');
  }

  diskon_action(){
    this.navCtrl.navigateRoot('/promo');
  }

  async show_detail(id,id2,id3,id4){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        news_id:id,
        mark_header:id2,
        mark_caption:id3,
        mark_description:id4,
      }
    });
    modal.onDidDismiss().then((data) => {
      
    });
    modal.present();
  }

  async showpoint(){
    const modal = await this.modalCtrl.create({
      component: DescpointPage,
      // componentProps: {
      //   trx_id:trx_id
      // }
    });
    modal.onDidDismiss().then((data) => {
      
    });
    modal.present();
  }

  async showjenismember(){
    const modal = await this.modalCtrl.create({
      component: DescjnsmemberPage,
      // componentProps: {
      //   trx_id:trx_id
      // }
    });
    modal.onDidDismiss().then((data) => {
      
    });
    modal.present();
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

  async toastexit(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2200,
      mode: 'ios',
      color: "dark",
    });
    toast.present();
  }

  async get_news(){
    this.Slidenew = null;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    // Loading.present();
    let body = {};
    this.accsPrvds.postData(body, 'get_news').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      this.Slidenew = res.respon_data;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async get_pointrewards(){
    this._pointreward = 11;
    
    let body = {};
    this.accsPrvds.postData(body, 'get_pointrewards').subscribe((res:any)=>{
      // console.log(res);
      if(res.code == '00'){
        this._pointreward = res.code;
      } else {
        this._pointreward = res.code;
      }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async get_produk(){
    this.Produk = null;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    // Loading.present();
    let body = {};
    this.accsPrvds.postData(body, 'get_produk').subscribe((res:any)=>{
      Loading.dismiss();
      this.Produk = res.respon_data;
      // console.log(res);
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async get_member(id){
    this.MemberData = null;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    // Loading.present();
    let body = {
      member_username: id,
    };
    this.accsPrvds.postData(body, 'get_member').subscribe((res:any)=>{
      // Loading.dismiss();
      if(res.code == '00'){
        this.MemberData = res.respon_data;
      } else {
        this.MemberData = null;
        this.storage.clear();
        this.navCtrl.navigateRoot('/login');
      }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  show_detail_produk(id){
    let navigationExtras: NavigationExtras = {
      state: {
        idproduk : id
      }
    }
   this.router.navigate(['/detailproduk'],navigationExtras)
  }

  to_masuk(){
    this.navCtrl.navigateRoot('/login');
  }

  to_daftar(){
    this.navCtrl.navigateRoot('/register');
  }

  async get_notif(member_username){
    this._notif = 0;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    // Loading.present();
    let body = {
      member_username: member_username,
    };
    this.accsPrvds.postData(body, 'get_notif_count').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      this._notif = res.jumlah_notif;      

    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  exit(){
    this.platform.backButton.subscribeWithPriority(10, () => {
        setTimeout(() => {
        this.exitval = '1';
        console.log(this.exitval);
      }, 2200);
      if(this.hal == '1'){
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
