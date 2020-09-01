import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController, LoadingController, AlertController, NavController, ModalController} from '@ionic/angular';
import { DesctentangPage } from '../pages/desctentang/desctentang.page';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  exitval:any = '1';
  hal:any = '2';

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private router: Router,
    private statusBar: StatusBar
  ) {
    this.statusBar.backgroundColorByHexString('#273677');
    this.exit();
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

  async opendesctentang(id,desc,header){
    const modal = await this.modalCtrl.create({
      component: DesctentangPage,
      componentProps: {
        id:id,
        desc:desc,
        header:header
      }
    });
    modal.onDidDismiss().then((data) => {
      // this.ionViewWillEnter();
    });
    modal.present();
  }

  openfb(){
  	window.open('https://www.facebook.com/posindonesia', '_system');
  }

  openig(){
  	window.open('https://www.instagram.com/posindonesia.ig/', '_system');
  }

  openpci(){
    window.open('https://www.posindonesia.co.id/id', '_system');
  }

  opendjp(){
    window.open('https://www.pajak.go.id/', '_system');
  }

  exit(){
    this.platform.backButton.subscribeWithPriority(10, () => {
        setTimeout(() => {
        this.exitval = '1';
        console.log(this.exitval);
      }, 2200);
      if(this.hal == '2'){
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
