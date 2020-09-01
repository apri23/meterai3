import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams, PopoverController, ToastController, LoadingController, AlertController, NavController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { IntrusksipembayaranPage } from '../../intrusksipembayaran/intrusksipembayaran.page';
import { LacakkirimanPage } from '../../lacakkiriman/lacakkiriman.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-desctransaksi',
  templateUrl: './desctransaksi.page.html',
  styleUrls: ['./desctransaksi.page.scss'],
})
export class DesctransaksiPage implements OnInit {
	_trx:any;
	_trx_va:any;
	_trx_det:any;
	_trx_det_sum:any;

  constructor(
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private clipboard: Clipboard,
  ) { }

  ionViewWillEnter() {
    
    if(this.navParams.get('trx_id')){
  		this.get_trx_and_det(this.navParams.get('trx_id'));
  	} else {
  		this.closemodal();
  	}
  }

  ngOnInit() {
  	this._trx = 11;
  	this._trx_va = 11;
    this._trx_det = 11;
    this._trx_det_sum = 11;
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

  async presentToastWithOptionsok(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 5000,
      color: "light",
      mode: "ios",
      buttons: [
        {
          text: 'oke',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

  async get_trx_and_det(id){
  	this._trx = 11;
  	this._trx_va = 11;
    this._trx_det = 11;
    this._trx_det_sum = 11;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
    	trx_id: id
    };
    this.accsPrvds.postData(body, 'get_trx_and_det').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      this._trx = res.trx;
      this._trx_va = res.trx_va;
      this._trx_det = res.trx_det;
      this._trx_det_sum = res.trx_det_sum;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  splite_alamat(str){
  	let nn = str.split('~');
    return nn[2]+' '+nn[1]+' '+nn[0];
  }

  ongkir(str1:any,str2:any){
  	let nn = parseInt(str1)+parseInt(str2);
  	return nn;
  }

  asuransi(str1:any,str2:any){
  	let nn = parseInt(str1)+parseInt(str2);
  	return nn;
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
      	this.closemodal();
      } else {
      	this.presentToast(res.message);
      }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  copy_resi(text){
    this.clipboard.copy(text);
    this.presentToastWithOptionsok('Nomor Barcode di Salin');
  }

}
