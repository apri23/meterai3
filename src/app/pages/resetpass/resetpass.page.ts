import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController, PopoverController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
	email_input:any;

  constructor(
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private statusBar: StatusBar
  ) {
    this.statusBar.backgroundColorByHexString('#273677');
  }

  ngOnInit() {
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

  get canSave() {
    return this.email_input == '' || this.email_input == null;
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

  async presentToastok(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      mode: 'ios',
      color: 'success',
    });
    toast.present();
  }

  async reset_action(){
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
      email_input: this.email_input,
    };
    this.accsPrvds.postData(body, 'reset_action_email').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res.code);
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

}
