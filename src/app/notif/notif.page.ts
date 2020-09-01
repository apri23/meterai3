import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController, LoadingController, AlertController, NavController, PopoverController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';
import { IntrusksipembayaranPage } from '../intrusksipembayaran/intrusksipembayaran.page';
import { LacakkirimanPage } from '../lacakkiriman/lacakkiriman.page';
import { DesctransaksiPage } from '../pages/desctransaksi/desctransaksi.page';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.page.html',
  styleUrls: ['./notif.page.scss'],
})
export class NotifPage implements OnInit {
  _dikeranjang:any;
	_menunggupembayaran:any;
	_konfirmasiselesai:any;

  hal:any = 'notif';

  constructor(
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private platform: Platform
  ) { 
    this.exit();
  }

  ionViewWillEnter() {
    
    this.storage.get('storage_xxx_wom_pos').then((res) => {
    if(res == null){
        this.navCtrl.navigateRoot('/login');
      } else {
        // this.get_trx(res.member_username);
        this.get_notif(res.member_username);
      }
    });
  }

  ngOnInit() {
  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
      
    }, 1000);
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      color: "danger",
      mode:"ios"
    });
    toast.present();
  }

  async presentToastok(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      color: "success",
      mode:"ios"
    });
    toast.present();
  }

  async get_notif(id){
  	this._menunggupembayaran = 11;
    this._konfirmasiselesai = 11;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
    	member_username: id
    };
    this.accsPrvds.postData(body, 'get_notif').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.dikeranjang == ''){
        this._dikeranjang = 99;
      } else {
      this._dikeranjang = res.dikeranjang;
      }

      if(res.menunggupembayaran == ''){
      	this._menunggupembayaran = 99;
      } else {
	    this._menunggupembayaran = res.menunggupembayaran;
      }

      if(res.konfirmasiselesai == ''){
      	this._konfirmasiselesai = 99;
      } else {
	    this._konfirmasiselesai = res.konfirmasiselesai;
      }
      // console.log(res.tes);
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async paymentintruction(trx_id){
  	const modal = await this.modalCtrl.create({
      component: IntrusksipembayaranPage,
      componentProps: {
        trx_id:trx_id
      }
    });
    modal.onDidDismiss().then((data) => {
  		// this.navCtrl.navigateRoot('/tabs/tab1');
    });
    modal.present();
  }

  async konfirmasi_selesai(trx_id){
  	const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah ingin mengkonfirmasi pesanan selesai dengan No. Transaksi '+trx_id+'?',
      mode: 'ios',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
            this.change_status_complete(trx_id);
          }
        }
      ]
    });

    await alert.present();
  }

  async lacak_kiriman(no_barcode,id_trx){
  	const modal2 = await this.modalCtrl.create({
      component: LacakkirimanPage,
      componentProps: {
        no_barcode:no_barcode,
        trx_id:id_trx
      }
    });
    modal2.onDidDismiss().then((data) => {
  		
    });
    modal2.present();
  }

  async change_status_complete(trx_id){
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
    	trx_id: trx_id
    };
    this.accsPrvds.postData(body, 'change_status_complete').subscribe((res:any)=>{
      Loading.dismiss();
      if(res.code == '00'){
      	this.presentToastok(res.message);
      	this.ionViewWillEnter();
      } else {
      	this.presentToast(res.message);
      }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
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
      this.ionViewWillEnter();
    });
    modal.present();
  }

  ke_keranjang(){
    this.navCtrl.navigateRoot('/tabs/tab4');
  }

  back_tabs1(){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  exit(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      if(this.hal == 'notif'){
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    });
  }

}
