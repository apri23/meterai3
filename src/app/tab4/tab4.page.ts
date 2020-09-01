import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, PopoverController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';
import { PopoverPage } from '../pages/popover/popover.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var window;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
	TransaksiDataDetail:any;
  Totalharga:any;
  Totalproduk:any;
  member_username:any;
  minqty:any;

  exitval:any = '1';
  hal:any = '4';

  constructor(
  	private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private popoverCtrl: PopoverController,
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
        this.get_trx_det(res.member_username);
        this.get_total_harga(res.member_username);
        this.member_username = res.member_username;
        this.get_min_qty();
      }
    });
  }

  ionViewWillLeave(){
    this.TransaksiDataDetail = null;
    this.Totalharga = null;
    this.Totalproduk = null;
  }

  ngOnInit() {
  }

  doRefresh(event) {
    this.ngOnInit();
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
      color:'danger',
    });
    toast.present();
  }

  async get_min_qty(){
    let body = {};
    this.accsPrvds.postData(body, 'get_min_qty').subscribe((res:any)=>{
      this.minqty = res.respon_data.idpp_value;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async get_trx_det(id){
  	this.TransaksiDataDetail = null;
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
    	member_username: id,
    };
    this.accsPrvds.postData(body, 'get_trx_det').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      this.TransaksiDataDetail = res.respon_data;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });

  }

  async get_total_harga(id){
    this.Totalharga = null;
    let body = {
      member_username: id,
    };
    this.accsPrvds.postData(body, 'get_total_harga').subscribe((res:any)=>{
      // console.log(res);
      if(res.code == '00'){
        this.Totalharga = res.respon_data.jumlah_harga;
        this.Totalproduk = res.respon_data.jumlah_qty;
      } else {
        this.Totalharga = null;
        this.Totalproduk = null;
      }
      
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async ubahqty(trxd_id,trxd_catalog_id, memeber_username, catalog_desc, trxd_qty, minqty) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      componentProps: {
        deskripsi: catalog_desc,
        qty: trxd_qty,
        trx_det: trxd_id+'~'+trxd_catalog_id+'~'+memeber_username,
        minqty: minqty,
      }
    });
    popover.onDidDismiss().then((data) => {
        this.ionViewWillEnter();
    });

    popover.present();
  }

  async hapusproduk(trxd_id, trxd_catalog_id, catalog_desc){
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    let pertanyaan = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Hapus Produk..',
      message: 'Yakin ingin menghapus produk '+catalog_desc,
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            
          }
        },
        {
          text: 'Ya',
          handler: () => {
            Loading.present();
            let body = {
              trxd_id: trxd_id,
              trxd_catalog_id: trxd_catalog_id,
            };
            this.accsPrvds.postData(body, 'hapus_produk_trx_det').subscribe((res:any)=>{
              if(res.code == '00'){
                Loading.dismiss();
                this.presentToast(res.respon_data);
                pertanyaan.dismiss();
                this.ionViewWillEnter();
                window.tabs.getcountcart(this.member_username);
              } else {
                this.presentToast(res.respon_data);
                pertanyaan.dismiss();
              }
            },(err)=>{
              this.presentToast('Tidak dapat terhubung ke server');
            });
          }
        },
      ]
    });
    pertanyaan.present();

  }

  tohome(){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  async proses(){
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
      member_username: this.member_username
    };
    this.accsPrvds.postData(body, 'updt_trxdet_to_trx').subscribe((res:any)=>{
      Loading.dismiss();
      if(res.code == '00'){
        this.navCtrl.navigateRoot('/pengiriman');
        console.log(res);
      } else {
        this.presentToast('Tidak dapat terhubung ke server');
      }
      
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
      if(this.hal == '4'){
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
