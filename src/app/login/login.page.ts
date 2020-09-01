import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';
import { ResetpassPage } from '../pages/resetpass/resetpass.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username?: string;
  password?: string;

  showPassword = false;
  passwordToggleIcon = 'eye-off';

  constructor(
  	private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private navCtrl: NavController,
    private storage: Storage,
    private modalCtrl: ModalController,
    private statusBar: StatusBar
  ) {
    this.statusBar.backgroundColorByHexString('#e67016');
  }

  ngOnInit() {
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye-off'){
      this.passwordToggleIcon = 'eye';
    } else {
      this.passwordToggleIcon = 'eye-off';
    }
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

  async presentToastOk(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      mode: 'ios',
      color:'success',
    });
    toast.present();
  }

  tabs1_action(){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  register_action(){
    this.navCtrl.navigateRoot('/register');
  }

  get canSave() {
    return this.username && this.password;
  }

  async login_action(){
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
      postInputUsername: this.username,
      postInputPassword: this.password,
    };
    this.accsPrvds.postData(body, 'login_action').subscribe((res:any)=>{
      if(res.code == '91'){
        this.presentToast(res.message);
        Loading.dismiss();
      } else if(res.code == '00'){
        this.storage.set('storage_xxx_wom_pos', res.respon_data);
        
        setTimeout(() => {
          this.username = '';
          this.passwordToggleIcon = '';
          Loading.dismiss();
          this.presentToastOk('Selamat Datang, '+res.respon_data.member_nama_depan+' '+res.respon_data.member_nama_belakang);
          this.navCtrl.navigateRoot('/tabs/tab1');
        }, 3000);
      } else {
        Loading.dismiss();
        this.presentToast('Bad request.');
      }
      // console.log(res);
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
      Loading.dismiss();
    });

  }

  async show_reset_pass(){
    const modal = await this.modalCtrl.create({
      component: ResetpassPage,
      componentProps: {
        
      }
    });
    modal.onDidDismiss().then((data) => {
      this.statusBar.backgroundColorByHexString('#e67016');
    });
    modal.present();
  }

}
