import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavParams, PopoverController, ToastController, LoadingController, AlertController, NavController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
	trx_det:any;
	deskripsi:any;
	qtynumber:any;
  minqty:any

  qtyok:any;
  qtyokk:any;

  constructor(
    private router: Router,
  	private navParams: NavParams,
  	private popoverCtrl: PopoverController,
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private accsPrvds: AccessProvider,
  ) { }

  ngOnInit() {
  	this.trx_det = this.navParams.get('trx_det');
  	this.deskripsi = this.navParams.get('deskripsi');
  	this.qtynumber = this.navParams.get('qty');
    this.qtyok = this.navParams.get('qty');
    this.minqty = this.navParams.get('minqty');
    this.cek_qty();
    // console.log(this.minqty);
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

  cek_qty(){
    this.qtyokk = this.qtyok;
    if(this.qtyok == null || this.qtyok == ''){
      return;
    }
    if(parseInt(this.qtyok) < parseInt(this.minqty)){
      this.presentToastqty('Jumlah Minimal Pesanan '+this.minqty+' Keping');
    } else {

    }
  }

  get canadd() {
    return parseInt(this.minqty) <= parseInt(this.qtyok) ;
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      mode: 'ios',
      color: 'danger',
    });
    toast.present();
  }

  async presentToastqty(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
      mode: 'ios',
      color: 'danger',
    });
    toast.present();
  }

  async presentToastok(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      mode: 'ios',
      color: 'success',
    });
    toast.present();
  }

  async Simpan(){
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
      trx_det: this.trx_det,
      qtynumber: this.qtyok
    };
    this.accsPrvds.postData(body, 'update_detail').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res.code);
      if(res.code == '00'){
        this.presentToastok(res.respon_data);
        this.popoverCtrl.dismiss();
      } else {
        this.presentToast(res.respon_data);
      }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  	
  }

  closePopover(){
    console.log(this.qtyok);
  	this.popoverCtrl.dismiss();
  }

}
