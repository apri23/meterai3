import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, PopoverController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';
import { UbahalamatPage } from '../pages/ubahalamat/ubahalamat.page';
import { IntrusksipembayaranPage } from '../intrusksipembayaran/intrusksipembayaran.page';

@Component({
  selector: 'app-pengiriman',
  templateUrl: './pengiriman.page.html',
  styleUrls: ['./pengiriman.page.scss'],
})
export class PengirimanPage implements OnInit {

  hal:any = 'dd';

	_ringkasan_pesanan_1:any;
	_ringkasan_jmlproduk:any;
	_ringkasan_jmlberat:any;
	_ringkasan_jmlprice:any;

	_ringkasan_ongkir:any;
	_ringkasan_total_tarif:any;
	_ringkasan_trx_total_tarif:any;
	_ringkasan_trx_total_tax:any;

	_ringkasan_asuransi:any;
  _ringkasan_total_asuransi:any;
  _ringkasan_trx_insurance:any;
  _ringkasan_trx_insuranceTax:any;

  _ringkasan_diskon_produk:any;
  _ringkasan_promo:any;
  _ringkasan_point:any;
  _grand_total_harga:any;

	_member_id:any;
	
	_receiver:any;

	_layanan_kirim:any;
	_layanan_val:any;
	_dt_layanan_use:any;

	_show_asuransi:any = false;
	_asuransi_checkbox:any = true;
	
	_produk:any;
	_totalhargaproduk:any;
	
	_promo:any;
	_trx_id:any;
	_promo_val:any;
	_dt_promo_use:any;

	_point:any;
	_pointreward:any;
	_point_toggle:any;

	customOptionsprov: any = {
		header: '--- Pilih Promo ---',
	};

	customOptionslayanan: any = {
		header: '--- Pilih Layanan Kirim ---',
	};

  constructor(
  	private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
  ) { }

  ionViewWillEnter() {
  	this.storage.get('storage_xxx_wom_pos').then((res) => {
    if(res == null){
        this.navCtrl.navigateRoot('/login');
      } else {
      	this._member_id = res.member_username;
        
        this.get_receiver(res.member_username);
        
        this.get_layanan(res.member_username);

        this.get_produk_checkout(res.member_username);
        this.get_total_harga(res.member_username);
        
        this.getpromo();
        this.gettrxoncart(res.member_username);

        this.get_point_member(res.member_username);
        this.get_pointrewards();
        this._point_toggle = false;


        this.reset_promo_dll(res.member_username);

        this._show_asuransi = false;
    		this._asuransi_checkbox = true;

    		this.ringkasan_pesanan_1(res.member_username);

    		this.ringkasan_diskon_produk(res.member_username);

    		this.grand_total_harga(res.member_username);

    		this._ringkasan_ongkir = 22;
    		this._ringkasan_asuransi = 22;
    		this._ringkasan_diskon_produk = 22;
    		this._ringkasan_promo = 22;
    		this._ringkasan_point = 22;
      }
    });
  }

  ionViewWillLeave(){
  	this.reset_promo_dll(this._member_id);
  }


  ngOnInit() {

  }

  filterlayanankirim(filt) {
	  return filt.filter(item => item.serviceCode === 240 || item.serviceCode === 447);
	}

  doRefresh(event) {
    this.ngOnInit();
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async back_keranjang(){
  	const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Konfirmasi',
      message: 'Apakah ingin keluar dari halaman ini? Semua perubahan yang telah dilakukan akan hilang.',
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
            this.navCtrl.navigateRoot('/tabs/tab4');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3500,
      color: "danger",
      mode: "ios",
    });
    toast.present();
  }

  async presentToastWithOptions(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3500,
      color: "danger",
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

  async presentToastWithOptionsok(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 5000,
      color: "success",
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

  async get_receiver(member_username){
  	this._receiver = null;
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    // Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'get_receiver').subscribe((res:any)=>{
      // Loading.dismiss();
      // console.log(res);
      if(res.code == '99'){
        this.navCtrl.navigateRoot('/tabs/tab4');
      } else {
        this._receiver = res.respon_data;
      }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async ubahalamat(){
  	const modal = await this.modalCtrl.create({
      component: UbahalamatPage,
      componentProps: {
        
      }
    });
    modal.onDidDismiss().then((data) => {
        // this.ionViewWillEnter();
        this.delete_layanan();
        this.get_receiver(this._member_id);
        this.grand_total_harga(this._member_id);
    });

    modal.present();
  	// this.navCtrl.navigateRoot('/ubahalamat');
  }

  async get_layanan(member_username){
  	this._layanan_kirim = 11;
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    // Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'get_layanan').subscribe((res:any)=>{
      // Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	this._layanan_kirim = res.respon_data;
      } else if(res.code == '22'){
      	this._layanan_kirim = 22;
      } else {
      	this._layanan_kirim = null;
      }
      this.get_point_member(member_username);
    },(err)=>{
      
    });
  }

  async use_layanan_kirim(){
  	this._layanan_kirim = 11;
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
    	member_username: this._member_id,
    	layanan_kirim: this._layanan_val,
    };
    this.accsPrvds.postData(body, 'use_layanan_kirim').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	this._layanan_kirim = '00';
      	this._layanan_val = null;
      	this._dt_layanan_use = res.respon_data;
      	this.ringkasan_ongkir(this._member_id);
      	this.ringkasan_asuransi(this._member_id);
      	this.grand_total_harga(this._member_id);
      } else {
      	this.presentToastWithOptions(res.message);
      	this.get_layanan(this._member_id);
      }
      this._show_asuransi = true;
    },(err)=>{
      
    });
  }

  async asuransi_use(){
  	
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
  	let body = {
		asuransi: this._asuransi_checkbox,
    	member_username: this._member_id,
    	layanan_kirim: this._dt_layanan_use.real_data,
    };
  	this.accsPrvds.postData(body, 'use_asuransi_kirim').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	this.presentToastWithOptionsok(res.message);
      	this.ringkasan_asuransi(this._member_id);
      	this.grand_total_harga(this._member_id);
      } else {
      	this.presentToastWithOptions(res.message);
      }
    },(err)=>{
      
    });
  }

  async delete_layanan(){
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
    	member_username: this._member_id,
    };
    this.accsPrvds.postData(body, 'delete_layanan').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	this._show_asuransi = false;
      	this._asuransi_checkbox = true;
      	this._layanan_val = null;
      	this.get_layanan(this._member_id);
      	this.ringkasan_ongkir(this._member_id);
      	this.ringkasan_asuransi(this._member_id);
      	this.grand_total_harga(this._member_id);
      } else {
      	this.presentToastWithOptions(res.message);
      }
      
    },(err)=>{
      
    });
  }

  async get_produk_checkout(member_username){
  	this._produk = null;
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    // Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'get_produk_checkout').subscribe((res:any)=>{
      // Loading.dismiss();
      // console.log(res.respon_data);
      this._produk = res.respon_data;
    },(err)=>{
      
    });
  }

  async get_total_harga(member_username){
    this._totalhargaproduk = null;
    let body = {
      member_username: member_username,
    };
    this.accsPrvds.postData(body, 'get_total_harga').subscribe((res:any)=>{
      // console.log(res);
      if(res.code == '00'){
        this._totalhargaproduk = res.respon_data.jumlah_harga;
      } else {
        this._totalhargaproduk = null;
      }
      
    },(err)=>{
      
    });
  }

  async getpromo(){
  	this._promo = 11;
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    // Loading.present();
    let body = {
    	
    };
    this.accsPrvds.postData(body, 'get_promo').subscribe((res:any)=>{
      // Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	this._promo = res.respon_data;
      } else {
      	this._promo = null;
      }
    },(err)=>{
      
    });
  }

  async gettrxoncart(member_username){
  	this._trx_id = 11;
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    // Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'get_trx_on_cart').subscribe((res:any)=>{
      // Loading.dismiss();
      // console.log(res.respon_data);
      this._trx_id = res.respon_data.trx_id;
    },(err)=>{
      
    });
  }

  async use_promo(promo_id){
  	this._promo = 11;
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    Loading.present();
    let body = {
    	trx_id: this._trx_id,
    	promo_id: this._promo_val,
    };
    this.accsPrvds.postData(body, 'use_promo').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	this._promo = 21;
      	this._promo_val = null;
      	this._dt_promo_use = res.respon_data;
      	this.ringkasan_promo(this._member_id);
      	this.grand_total_harga(this._member_id);
      } else {
      	this.presentToastWithOptions(res.message);
      	this._promo_val = null;
      	this.getpromo();
      }
    },(err)=>{
      
    });
  }

  async delete_promo(){
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    Loading.present();
    let body = {
    	member_username: this._member_id,
    };
    this.accsPrvds.postData(body, 'delete_promo').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	this._promo_val = null;
      	this.getpromo();
      	this.ringkasan_promo(this._member_id);
      	this.grand_total_harga(this._member_id);
      } else {
      	this.presentToastWithOptions(res.message);
      }
      
    },(err)=>{
      
    });

  }

  async get_point_member(member_username){
  	this._point = 11;
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    // Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'get_point_member').subscribe((res:any)=>{
      // Loading.dismiss();
      // console.log(res.respon_data);
      this._point = res.respon_data;
    },(err)=>{
      
    });
  }

  async get_pointrewards(){
  	this._pointreward = 11;
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    // Loading.present();
    let body = {
    	
    };
    this.accsPrvds.postData(body, 'get_pointrewards').subscribe((res:any)=>{
      // Loading.dismiss();
      // console.log(res.respon_data);
      if(res.code == '00'){
      	this._pointreward = res.respon_data;
      } else {
      	this._pointreward = null;
      }
    },(err)=>{
      
    });
  }

  toggle_point_use(){
  	if(this._point_toggle == true){
  		// console.log('pakai poin');
  		this.point_use(this._member_id);
  	} else {
  		// console.log('tidak pakai poin');
  		this.point_use_remove(this._member_id);
  	}
  }

  async point_use(member_username){
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'point_use').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	this.presentToastWithOptionsok(res.message);
      	this.ringkasan_point(this._member_id);
      	this.grand_total_harga(this._member_id);
      } else {
      	this.presentToastWithOptions(res.message);
      }
      this.get_point_member(member_username);
    },(err)=>{
      
    });
  }

  async point_use_remove(member_username){
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'point_use_remove').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '00'){
      	// this.presentToast(res.message);
      	this.ringkasan_point(this._member_id);
      	this.grand_total_harga(this._member_id);
      } else {
      	this.presentToastWithOptions(res.message);
      }
      this.get_point_member(member_username);
    },(err)=>{
      
    });
  }

  async reset_promo_dll(member_username){
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    // Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'reset_promo_dll').subscribe((res:any)=>{
      // Loading.dismiss();
      // console.log(res);
      this.grand_total_harga(this._member_id);
    },(err)=>{
      
    });
  }

  async ringkasan_pesanan_1(member_username){
  	this._ringkasan_pesanan_1 = 11;
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'ringkasan_pesanan_1').subscribe((res:any)=>{
      // console.log(res);
      this._ringkasan_pesanan_1 = res.respon_data;
      this._ringkasan_jmlproduk = res.respon_data.trx_totalcatalog;
      this._ringkasan_jmlberat = res.respon_data.trx_total_weight;
      this._ringkasan_jmlprice = res.respon_data.trx_total_price;
    },(err)=>{
      
    });
  }

  async ringkasan_ongkir(member_username){
  	this._ringkasan_ongkir = 22;
  	// let Loading = await this.loadingCtrl.create({
  	//   message: 'Loading Ringkasan..',
   //    spinner: 'dots'
   //  });
   //  Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'ringkasan_ongkir').subscribe((res:any)=>{
      // Loading.dismiss();
      if(res.code == '00'){
      	this._ringkasan_ongkir = res.respon_data;
        this._ringkasan_total_tarif = res.respon_data.total_tarif;
  	    this._ringkasan_trx_total_tarif = res.respon_data.trx_total_tarif;
  	    this._ringkasan_trx_total_tax = res.respon_data.trx_total_tax;
      } else {
      	this._ringkasan_ongkir = 22;
      }
      	// console.log(this._ringkasan_ongkir);
    },(err)=>{
      
    });
  }

  async ringkasan_asuransi(member_username){
  	this._ringkasan_asuransi = 22;
  	// let Loading = await this.loadingCtrl.create({
  	//   message: 'Loading Ringkasan..',
   //    spinner: 'dots'
   //  });
   //  Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'ringkasan_asuransi').subscribe((res:any)=>{
      // Loading.dismiss();
      if(res.code == '00'){
      	this._ringkasan_asuransi = res.respon_data;
        this._ringkasan_total_asuransi = res.respon_data.total_asuransi;
  	    this._ringkasan_trx_insurance = res.respon_data.trx_insurance;
  	    this._ringkasan_trx_insuranceTax = res.respon_data.trx_insuranceTax;
      } else {
      	this._ringkasan_asuransi = 22;
      }
      	// console.log(this._ringkasan_asuransi);
    },(err)=>{
      
    });
  }

  async ringkasan_diskon_produk(member_username){
  	this._ringkasan_diskon_produk = 22;
  	// let Loading = await this.loadingCtrl.create({
  	//   message: 'Loading Ringkasan..',
   //    spinner: 'dots'
   //  });
   //  Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'ringkasan_diskon_produk').subscribe((res:any)=>{
      // Loading.dismiss();
      if(res.code == '00'){
      	this._ringkasan_diskon_produk = res.respon_data.trx_paid_usediscctl;
      } else {
      	this._ringkasan_diskon_produk = 22;
      }
      	// console.log(this._ringkasan_diskon_produk);
    },(err)=>{
      
    });
  }
  
  async ringkasan_promo(member_username){
  	this._ringkasan_promo = 22;
  	// let Loading = await this.loadingCtrl.create({
  	//   message: 'Loading Ringkasan..',
   //    spinner: 'dots'
   //  });
   //  Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'ringkasan_promo').subscribe((res:any)=>{
      // Loading.dismiss();
      if(res.code == '00'){
      	this._ringkasan_promo = res.respon_data.trx_paid_usepromo;
      } else {
      	this._ringkasan_promo = 22;
      }
      	// console.log(this._ringkasan_promo);
    },(err)=>{
      
    });
  }

  async ringkasan_point(member_username){
  	this._ringkasan_point = 22;
  	// let Loading = await this.loadingCtrl.create({
  	//   message: 'Loading Ringkasan..',
   //    spinner: 'dots'
   //  });
   //  Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'ringkasan_point').subscribe((res:any)=>{
      // Loading.dismiss();
      if(res.code == '00'){
      	this._ringkasan_point = res.respon_data.trx_paid_usepoint;
      } else {
      	this._ringkasan_point = 22;
      }
      	// console.log(this._ringkasan_point);
    },(err)=>{
      
    });
  }

  async grand_total_harga(member_username){
  	this._grand_total_harga = '';
  	// let Loading = await this.loadingCtrl.create({
  	//   message: 'Loading Ringkasan..',
   //    spinner: 'dots'
   //  });
   //  Loading.present();
    let body = {
    	member_username: member_username
    };
    this.accsPrvds.postData(body, 'grand_total_harga').subscribe((res:any)=>{
      // Loading.dismiss();
      if(res.code == '00'){
      	this._grand_total_harga = res.respon_data.grand_total;
      } else {
      	this._grand_total_harga = '';
      }
      	// console.log(this._grand_total_harga);
    },(err)=>{
      
    });
  }

  async proses(){
  	// console.log(this._layanan_kirim);
  	if(this._layanan_kirim != '00' && this._layanan_kirim != 22){
  		this.presentToastWithOptions('Pastikan kamu telah memilih layanan pengiriman yang tersedia');
  		return;
  	}
  	// this.presentToast('Oke siap');
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    Loading.present();
    let body = {
    	member_username: this._member_id
    };
    this.accsPrvds.postData(body, 'proses_checkout').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      // this._receiver = res.respon_data;
      if(res.code == 11){
      	this.presentToastWithOptions(res.message);
      } else if(res.code == 99){
      	this.presentToastWithOptions(res.message);
      } else if(res.code == '00'){
      	this.presentToastWithOptionsok(res.message);
      	this.paymentintruction(res.trx_id);
      }
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
  		this.navCtrl.navigateRoot('/tabs/tab1');
    });
    modal.present();
  }

  async presentAlerttips(msg) {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Informasi',
      message: msg,
      mode: 'ios',
      buttons: ['OK']
    });

    await alert.present();
  }

  pop_alamat(){
    this.presentAlerttips('Pastikan Kode Pos pada alamat pengiriman sudah benar.');
  }

  pop_kntr_pngirim(){
    this.presentAlerttips('Kantor Pos pengirim adalah kantor yang akan mengirimkan pesanan anda, kami akan menetapkan kantor pos pengirim yang terdekat berdasarkan alamat tujuan pengiriman yang anda tetapkan.');
  }

  pop_layanan(){
    this.presentAlerttips('Jika Layanan Pengiriman tidak tersedia mohon cek Kode Pos pada alamat pengiriman.');
  }

  pop_prod_desc(){
    this.presentAlerttips('Pastikan produk dan jumlah produk telah sesuai.');
  }

}
