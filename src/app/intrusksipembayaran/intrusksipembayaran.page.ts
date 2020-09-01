import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { NavParams, PopoverController, ToastController, LoadingController, AlertController, NavController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-intrusksipembayaran',
  templateUrl: './intrusksipembayaran.page.html',
  styleUrls: ['./intrusksipembayaran.page.scss'],
})
export class IntrusksipembayaranPage implements OnInit {
	_trx_id:any;
	_dt_virtual_acc:any;

	_channel:any;
	_cgs_id:any;
	_va:any;

	otomatistutup = true;

  constructor(
  	private modalCtrl: ModalController,
  	private navParams: NavParams,
  	private accsPrvds: AccessProvider,
  	private clipboard: Clipboard,
  	private toastCtrl: ToastController,
  ) { }

  ionViewWillEnter() {
  	this._trx_id = this.navParams.get('trx_id');
  	this.get_va(this.navParams.get('trx_id'));
  }

  ionViewWillLeave(){
  	
  }

  ngOnInit() {
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

  copyva(text){
  	// console.log(text);
  	this.clipboard.copy(text);
  	this.presentToastWithOptionsok('Nomor Virtual Account di Salin');
  }

  copybsu(text){
  	this.clipboard.copy(text);
  	this.presentToastWithOptionsok('Jumlah Uang di Salin');
  }

  async get_va(trx_id){
  	this._dt_virtual_acc = 11;
    let body = {
    	trx_id:trx_id,
    };
    this.accsPrvds.postData(body, 'get_va').subscribe((res:any)=>{
      setTimeout(() => {
      	// console.log(res);
      	if(res.code == '00'){
	      	this._channel = res['channel'];
			this._cgs_id = res.cgs_id.idpp_value;
			this._va = res.va;
			this._dt_virtual_acc = '00';
	    } else {
	      	this._dt_virtual_acc = 99;
	    }
	  }, 2500);
    },(err)=>{
      
    });
  }

  toogleselection(index){
  	this._channel[index].open = !this._channel[index].open;

  	if(this.otomatistutup && this._channel[index].open){
  		this._channel
  		.filter((item, itemIndex) => itemIndex != index)
  		.map(item => item.open = false);
  	}
  }

}
