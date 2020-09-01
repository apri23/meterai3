import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-descjnsmember',
  templateUrl: './descjnsmember.page.html',
  styleUrls: ['./descjnsmember.page.scss'],
})
export class DescjnsmemberPage implements OnInit {

  MemberData:any;
  jenis:any;

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
      // console.log(res);
      if(res == null){
        this.MemberData = null;
      } else {
        this.get_member(res.member_username);
      }
    });

  }

  ngOnInit() {
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      mode: 'ios',
      color: "danger",

    });
    toast.present();
  }

  async get_member(id){
    this.MemberData = null;
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    // Loading.present();
    let body = {
      member_username: id,
    };
    this.accsPrvds.postData(body, 'get_member').subscribe((res:any)=>{
      // Loading.dismiss();
      this.jenis = res.respon_data.isFreeOfCharge;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

}
