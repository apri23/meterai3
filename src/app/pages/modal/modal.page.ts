import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams, PopoverController, ToastController, LoadingController, AlertController, NavController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
	news_id:any;
	mark_header:any;
	mark_caption:any;
	mark_description:any;

  constructor(
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
  	this.news_id = this.navParams.get('news_id');
  	this.mark_header = this.navParams.get('mark_header');
  	this.mark_caption = this.navParams.get('mark_caption');
  	this.mark_description = this.navParams.get('mark_description');
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

}
