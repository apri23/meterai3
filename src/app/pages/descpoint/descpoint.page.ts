import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-descpoint',
  templateUrl: './descpoint.page.html',
  styleUrls: ['./descpoint.page.scss'],
})
export class DescpointPage implements OnInit {
	_member_id:any;

  constructor(
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
  ) { }

  ionViewWillEnter() {
  	this.storage.get('storage_xxx_wom_pos').then((res) => {
    if(res == null){
        this.navCtrl.navigateRoot('/login');
      } else {
      	this._member_id = res.member_username;
      }
    });
  }

  ngOnInit() {
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

}
