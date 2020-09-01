import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController, LoadingController, AlertController, NavController, PopoverController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {

	yudsegment:any;

	_diskon:any;
	_promo:any;

  hal:any = 'promo';

  constructor(
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private navCtrl: NavController,
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
        this.get_diskon_promo();
      }
    });
  }

  ngOnInit() {
  	this.yudsegment = 'disc';
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

  async get_diskon_promo(){
  	this._diskon = '';
      this._promo = '';
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {};
    this.accsPrvds.postData(body, 'get_diskon_promo_all').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      if(res.diskon == ''){
      	this._diskon = 99;
      } else {
	    this._diskon = res.diskon;
      }

      if(res.promo == ''){
      	this._promo = 99;
      } else {
	    this._promo = res.promo;
      }
      // console.log(this._promo);
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  back_tabs1(){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  exit(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      if(this.hal == 'promo'){
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    });
  }

}
