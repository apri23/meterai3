import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, ToastController, LoadingController, AlertController, NavController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-editdataakun',
  templateUrl: './editdataakun.page.html',
  styleUrls: ['./editdataakun.page.scss'],
})
export class EditdataakunPage implements OnInit {

	_username:any;

	email:any;

	get password__() {
	  return this.registrationForm.get("password__");	
	}
	get password1__() {
	  return this.registrationForm.get("password1__");	
	}
	get konfirmpassword__() {
	  return this.registrationForm.get("konfirmpassword__");	
	}

	public errorMessages = {
	    password__: [
	      { type: 'required', message: 'Paswword tidak boleh kosong.' },
	      { type: 'minlength', message: 'Kata Sandi tidak boleh kurang dari 6 karakter.'},
	    ],
	    password1__: [
	      { type: 'required', message: 'Paswword tidak boleh kosong.' },
	      { type: 'minlength', message: 'Kata Sandi tidak boleh kurang dari 6 karakter.'},
	    ],
	    konfirmpassword__: [
	      { type: 'required', message: 'Konfirmasi Password tidak boleh kosong.' },
	      { type: 'minlength', message: 'Konfirmasi Kata Sandi tidak boleh kurang dari 6 karakter.'},
	    ],
	};

	registrationForm = this.formBuilder.group({
		password__: ['', [Validators.required, Validators.minLength(6),]],
		password1__: ['', [Validators.required, Validators.minLength(6),]],
		konfirmpassword__: ['', [Validators.required, Validators.minLength(6),]],
	});

	showPassword__ = false;
	passwordToggleIcon__ = 'eye-off';

	showPassword1__ = false;
	passwordToggleIcon1__ = 'eye-off';

	showPassword2__ = false;
	passwordToggleIcon2__ = 'eye-off';

  constructor(
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if(this.navParams.get('username_')){
    	this._username = this.navParams.get('username_');
    	this.email = this.navParams.get('email_');
  	} else {
  		this.closemodal();
  	}
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 4500,
      color: "danger",
      mode: "ios",
      buttons: [
      	{
          text: 'oke',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
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

  togglePassword__(){
  	this.showPassword__ = !this.showPassword__;
  	if(this.passwordToggleIcon__ == 'eye-off'){
  		this.passwordToggleIcon__ = 'eye';
  	} else {
  		this.passwordToggleIcon__ = 'eye-off';
  	}
  }

  togglePassword1__(){
  	this.showPassword1__ = !this.showPassword1__;
  	if(this.passwordToggleIcon1__ == 'eye-off'){
  		this.passwordToggleIcon1__ = 'eye';
  	} else {
  		this.passwordToggleIcon1__ = 'eye-off';
  	}
  }

  togglePassword2__(){
  	this.showPassword2__ = !this.showPassword2__;
  	if(this.passwordToggleIcon2__ == 'eye-off'){
  		this.passwordToggleIcon2__ = 'eye';
  	} else {
  		this.passwordToggleIcon2__ = 'eye-off';
  	}
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

  public async submit() {
  	if(this.registrationForm.value.password1__ != this.registrationForm.value.konfirmpassword__){
  		this.presentToast('Konfirmasi Kata Sandi Baru tidak cocok.');
  		return;
  	}

  	let Loading = await this.loadingCtrl.create({
		spinner: 'dots',
		mode:'ios',
	});
	Loading.present();
	let body = {
		username: this._username,
		value: this.registrationForm.value,
	};
	this.accsPrvds.postData(body, 'ubah_password__').subscribe((res:any)=>{
		Loading.dismiss();
		console.log(res);
		if(res.code == '00'){
			this.presentToastok(res.message);
			this.closemodal();
		} else {
			this.presentToast(res.message);
		}
	},(err)=>{
		this.presentToast('Tidak dapat terhubung ke server');
		Loading.dismiss();
	});

  }

}
