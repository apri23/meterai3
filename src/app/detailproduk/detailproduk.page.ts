import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detailproduk',
  templateUrl: './detailproduk.page.html',
  styleUrls: ['./detailproduk.page.scss'],
})
export class DetailprodukPage implements OnInit {
	Produk:any;
	idproduk:any;
	private qtynumber = 5;
  member:any;

  date:any = Date.now();

  minqty:any;

  hal:any = 'detail';

  qtyok:any;
  qtyokk:any;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private accsPrvds: AccessProvider,
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform
  ) { 

  	this.route.queryParams.subscribe(params => {
  		if(this.router.getCurrentNavigation().extras.state){
  			this.getproduk(this.router.getCurrentNavigation().extras.state.idproduk);
  			this.idproduk = this.router.getCurrentNavigation().extras.state.idproduk;
        this.get_min_qty();
  		} else {
        this.navCtrl.navigateRoot('/tabs/tab1');
  			this.idproduk = null;
  		}
  	});

    this.exit();
  	
  }

  ionViewWillEnter() {
    this.member = null;
    this.storage.get('storage_xxx_wom_pos').then((res) => {
    if(res == null){
        this.member = null;
      } else {
        this.member = res.member_username;
      }
    });
  	
  }

  ngOnInit() {
  	if(this.idproduk == null){
      this.navCtrl.navigateRoot('/tabs/tab1');
  	}
  }

  doRefresh(event) {
    this.getproduk(this.idproduk);
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  cek_qty(){
    this.qtyokk = this.qtyok;
    // console.log(this.qtyok);
    if(this.qtyokk == null){

    } else if(this.qtyokk < this.minqty){
      this.presentToastqty('Jumlah Minimal Pesanan '+this.minqty+' '+this.Produk.catalog_satuan);
    }
  }

  get canadd() {
    return this.minqty <= this.qtyok;
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      mode: 'ios',
      color: 'danger'
    });
    toast.present();
  }

  async presentToastqty(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: 'middle',
      mode: 'ios',
      color: 'danger',
    });
    toast.present();
  }

  async get_min_qty(){
    let body = {};
    this.accsPrvds.postData(body, 'get_min_qty').subscribe((res:any)=>{
      this.qtyok = res.respon_data.idpp_value;
      this.minqty = res.respon_data.idpp_value;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async getproduk(id){
  	this.Produk = null;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
    	id_produk: id,
    };
    this.accsPrvds.postData(body, 'get_produk_byid').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      this.Produk = res.respon_data;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

	private increment () {
		this.qtynumber++;
	}

	private decrement () {
		if(this.qtynumber == this.minqty){

		} else {
				this.qtynumber--;
		}
	}

	async aksibeli(){
		// console.log(this.idproduk+' '+this.qtynumber+' '+this.member);

    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let nologin = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Kamu belum masuk..',
      message: 'Yuk masuk ke akun kamu untuk lanjutkan belanja',
      buttons: [
        {
          text: 'Daftar',
          handler: () => {
            nologin.dismiss();
            this.navCtrl.navigateRoot('/register');
          }
        },{
        text: 'Masuk',
        handler: () => {
          nologin.dismiss();
          this.navCtrl.navigateRoot('/login');
        }
      }]
    });
    let body = {
      id_produk: this.idproduk,
      qty: this.qtyok,
      member_username: this.member,
    };
    this.accsPrvds.postData(body, 'add_trx_prdk').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '99'){
        nologin.present();
      } else if(res.code == '00'){
        this.navCtrl.navigateRoot('/tabs/tab4');
      }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
	}

	async aksitambahkeranjang(){
		// console.log(this.idproduk+' '+this.qtynumber+' '+this.member);

    let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });
    Loading.present();
    let nologin = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Kamu belum masuk..',
      message: 'Yuk masuk ke akun kamu untuk lanjutkan belanja',
      buttons: [
        {
          text: 'Daftar',
          handler: () => {
            this.navCtrl.navigateRoot('/register');
          }
        },{
        text: 'Masuk',
        handler: () => {
          this.navCtrl.navigateRoot('/login');
        }
      }]
    });
    let sukses = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Berhasil..',
      message: 'Produk di tambah ke keranjang',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.ngOnInit();
            this.qtyok = this.minqty;
          }
        }]
    });
    let body = {
      id_produk: this.idproduk,
      qty: this.qtyok,
      member_username: this.member,
    };
    this.accsPrvds.postData(body, 'add_trx_prdk').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.code == '99'){
        nologin.present();
      } else if(res.code == '00'){
        sukses.present();
      }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
	}

	loadkeranjang(){

	}

  back_tabs1(){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  exit(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      if(this.hal == 'detail'){
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    });
  }

}
