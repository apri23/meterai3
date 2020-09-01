import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { Storage } from '@ionic/storage';
import { EditdatapribadiPage } from '../pages/editdatapribadi/editdatapribadi.page';
import { EditdataakunPage } from '../pages/editdataakun/editdataakun.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
	MemberData:any;
  user_name_:any;

  gambar:any;

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  exitval:any = '1';
  hal:any = '5';

  versi:any;

  constructor(
  	private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private file: File,
    private transfer: FileTransfer,
    private http: HttpClient,
    private platform: Platform,
    private appVersion: AppVersion,
    private statusBar: StatusBar
  ) {
    this.statusBar.backgroundColorByHexString('#273677');
    this.exit();
  }

  ionViewWillEnter() {
    this.MemberData = null;
    this.storage.get('storage_xxx_wom_pos').then((res) => {
    if(res == null){
        this.navCtrl.navigateRoot('/login');
      } else {
        this.get_member(res.member_username);
        this.user_name_ = res.member_username;
        this.cek_gambar_profile();
      }
    });
  }

  ionViewWillLeave() {
    
  }

  ngOnInit() {
    this.appVersion.getVersionNumber().then(res => {
      this.versi = 'Versi '+res;
    });
  }

   doRefresh(event) {
    this.MemberData = null;
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
      color: "danger",
      mode:"ios"
    });
    toast.present();
  }

  async presentToastok(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      color: "success",
      mode:"ios"
    });
    toast.present();
  }

  async get_member(id){
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios',
    });
    Loading.present();
    let body = {
      member_username: id
    };
    this.accsPrvds.postData(body, 'get_member').subscribe((res:any)=>{
      Loading.dismiss();
      this.MemberData = res.respon_data;
    },(err)=>{
      this.presentToast('Tidak dapat');
    });
  }

  openlogin(){
    this.navCtrl.navigateRoot('/login');
  }

  openregister(){
    this.navCtrl.navigateRoot('/register');
  }

  editdatafoto(){
    console.log('edit data foto');
  }

  async editdatapribadi(){
    const modal = await this.modalCtrl.create({
      component: EditdatapribadiPage,
      componentProps: {
        username_: this.MemberData.member_username,
        nama_depan_: this.MemberData.member_nama_depan,
        nama_belakang_: this.MemberData.member_nama_belakang,
        telpon_: this.MemberData.member_phone,
        region_: this.MemberData.member_region,
        city_: this.MemberData.member_city,
        kecamatan_: this.MemberData.member_address.split('~')[0],
        kelurahan_: this.MemberData.member_address.split('~')[1],
        alamat_: this.MemberData.member_address.split('~')[2],
        kode_pos_: this.MemberData.member_postal_code,
      }
    });
    modal.onDidDismiss().then((data) => {
      this.ionViewWillEnter();
    });
    modal.present();
  }

  async editdataakun(){
  	const modal = await this.modalCtrl.create({
      component: EditdataakunPage,
      componentProps: {
        username_: this.MemberData.member_username,
        email_: this.MemberData.member_email,
      }
    });
    modal.onDidDismiss().then((data) => {
      this.ionViewWillEnter();
    });
    modal.present();
  }

  notif(){
    console.log('notif');
  }

  async out_akun(){
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios',
    });
    let Alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
        message: 'Apakah Anda Yakin ?',
        mode: 'ios',
        buttons: [
          {
              text: 'Batal',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Cancel');
              }
          }, 
          {
              text: 'Ya',
              handler: () => {
                Loading.present();
                this.storage.clear();

                setTimeout(() => {
                  Loading.dismiss();
                  this.navCtrl.navigateRoot('/login');
                }, 1000);
              }
          }
        ]
    })
    Alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Pilih Sumber Gambar',
      mode:"ios",
      buttons: [{
        text: 'Galeri',
        handler: () => {
          this.takeSnap(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Kamera',
        handler: () => {
          this.takeSnap(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Batal',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  takeSnap(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:false,
      allowEdit:true,
      targetWidth:500,
      targetHeight:500,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.uploadphoto(imageData);
    }, (err) => {
      // Handle error
      this.presentToast(err);
    });
  }

  async uploadphoto(base64Image){
    // console.log(base64Image);
    let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios',
    });
    Loading.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let url = 'https://meterai.posindonesia.co.id/Mobile_Api/upload_pctr_mmbr_prfle';
    
    let options: FileUploadOptions = {
      fileKey: 'fileupload',
      fileName: this.user_name_+ ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {
        'Authorization': 'possale_wom-ec23210baf490fd837641de501514548'
      }
    }

    fileTransfer.upload(base64Image, url, options).then((data) => {
        Loading.dismiss();
        var res = JSON.parse(data.response);
        if(res.code == '00'){
          this.presentToastok(res.respon_data);
          this.cek_gambar_profile();
        } else {
          this.presentToast(res.respon_data);
        }
        console.log(res);
    }, (err) => {
        this.presentToast(err);
    });
  }

  async cek_gambar_profile(){
    this.gambar = null;
    let body = {
      member_username: this.user_name_,
    };
    this.accsPrvds.postData(body, 'cek_gambar_profile').subscribe((res:any)=>{
      if(res.code == '00'){
        this.gambar = 'https://meterai.posindonesia.co.id/image/profile/'+res.respon_data+'?'+Date.now();
      } else {
        this.gambar = null;
      }
      // console.log(this.gambar);
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
      if(this.hal == '5'){
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
