import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	_provinsi: any;
	_kabkot: any;
	_kecamatan: any;
	_kelurahan: any;
	_postal: any;

	get nama_depan() {
	  return this.registrationForm.get("nama_depan");
	}
	get nama_belakang(){
		return this.registrationForm.get("nama_belakang");
	}
	get telepon() {
	  return this.registrationForm.get('telepon');
	}
	get provinsi() {
	  return this.registrationForm.get("provinsi");
	}
	get kabkot() {
	  return this.registrationForm.get("kabkot");
	}
	get kecamatan() {
	  return this.registrationForm.get("kecamatan");
	}
	get kelurahan() {
	  return this.registrationForm.get("kelurahan");
	}
	get zip() {
	  return this.registrationForm.get('zip');
	}
	get street() {
	  return this.registrationForm.get('street');
	}
	get email() {
	  return this.registrationForm.get("email");
	}
	get username() {
	  return this.registrationForm.get("username");
	}
	get password() {
	  return this.registrationForm.get("password");	
	}
	get konfirmpassword() {
	  return this.registrationForm.get("konfirmpassword");	
	}

	public errorMessages = {
	    nama_depan: [
	      { type: 'required', message: 'Nama Depan tidak boleh kosong.' },
	    ],
	    nama_belakang: [
	      { type: 'required', message: 'Nama Belakang tidak boleh kosong.' },
	    ],
	    telepon: [
	      { type: 'required', message: 'Nomor Handphone tidak boleh kosong.' },
	      { type: 'pattern', message: 'Masukkan Nomor Handphone yang benar.' },
	      { type: 'minlength', message: 'Nomor Handphone tidak boleh kurang dari 10 karakter.'},
	      { type: 'maxlength', message: 'Nomor Handphone tidak boleh lebih dari 12 karakter.'},
	    ],
	    provinsi: [
	      { type: 'required', message: 'Provinsi tidak boleh kosong.' },
	    ],
	    kabkot: [
	      { type: 'required', message: 'Kab/Kota tidak boleh kosong.' },
	    ],
	    kecamatan: [
	      { type: 'required', message: 'Kab/Kota tidak boleh kosong.' },
	    ],
	    kelurahan: [
	      { type: 'required', message: 'Kab/Kota tidak boleh kosong.' },
	    ],
	    zip: [ 
	      { type: 'required', message: 'Kode Pos tida boleh kosong' }, 
	      { type: 'pattern', message: 'Masukkan Kode Pos yang benar.' },
	    ],
	    street: [
	      { type: 'required', message: 'Alamat tidak boleh kosong' },
	      { type: 'maxlength', message: 'Alamat tidak boleh lebih dari 12 karakter.' },
	    ],
	    email: [
	      { type: 'required', message: 'E-mail tidak boleh kosong.' },
	      { type: 'pattern', message: 'Masukkan E-mail yang benar' },
	    ],
	    username: [
	      { type: 'required', message: 'Nama Pengguna tidak boleh kosong.' },
	    ],
	    password: [
	      { type: 'required', message: 'Paswword tidak boleh kosong.' },
	      { type: 'minlength', message: 'Kata Sandi tidak boleh kurang dari 6 karakter.'},
	    ],
	    konfirmpassword: [
	      { type: 'required', message: 'Konfirmasi Password tidak boleh kosong.' },
	      { type: 'minlength', message: 'Konfirmasi Kata Sandi tidak boleh kurang dari 6 karakter.'},
	    ],
	};

	registrationForm = this.formBuilder.group({
		nama_depan: ['', [Validators.required]],
		nama_belakang: ['', [Validators.required]],
		telepon: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
		provinsi: ['', [Validators.required]],
		kabkot: ['', [Validators.required]],
		kecamatan: [''],
		kelurahan: [''],
		zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
		street: ['', [Validators.required, Validators.maxLength(800)]],
		email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
		username: ['', [Validators.required]],
		password: ['', [Validators.required, Validators.minLength(6),]],
		konfirmpassword: ['', [Validators.required, Validators.minLength(6),]],
	});

	showPassword = false;
	passwordToggleIcon = 'eye-off';

	showPassword2 = false;
	passwordToggleIcon2 = 'eye-off';

	customOptionsprov: any = {
		header: '--- Pilih Provinsi ---',
		cancelText: 'Batal',
	};

	customOptionskota: any = {
		header: '--- Pilih Kabupaten/Kota ---',
		cancelText: 'Batal',
	};

	customOptionskec: any = {
		header: '--- Pilih Kecamatan ---',
		cancelText: 'Batal',
	};

	customOptionskel: any = {
		header: '--- Pilih Kelurahan ---',
		cancelText: 'Batal',
	};

  constructor(
  	private formBuilder: FormBuilder,
  	private router: Router,
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private navCtrl: NavController,
    private statusBar: StatusBar
  ) { }

  ngOnInit() {
  	this.statusBar.backgroundColorByHexString('#273677');
  	this.get_prov();
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 4000,
      mode:'ios',
      color:'danger',
    });
    toast.present();
  }

  async presentToastok(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      mode:'ios',
      color:'success',
    });
    toast.present();
  }

  togglePassword(){
  	this.showPassword = !this.showPassword;
  	if(this.passwordToggleIcon == 'eye-off'){
  		this.passwordToggleIcon = 'eye';
  	} else {
  		this.passwordToggleIcon = 'eye-off';
  	}
  }

  togglePassword2(){
  	this.showPassword2 = !this.showPassword2;
  	if(this.passwordToggleIcon2 == 'eye-off'){
  		this.passwordToggleIcon2 = 'eye';
  	} else {
  		this.passwordToggleIcon2 = 'eye-off';
  	}
  }

  public async submit() {
  	if(this.registrationForm.value.password != this.registrationForm.value.konfirmpassword){
  		this.presentToast('Konfirmasi Kata Sandi tidak cocok.');
  		return;
  	}
  	// console.log(this.registrationForm.value);

  	let Loading = await this.loadingCtrl.create({
		spinner: 'dots',
		mode:'ios',
	});
	Loading.present();
	const alertSuccess = await this.alertCtrl.create({
		mode: 'ios',
		header: 'Berhasil',
		message: 'Cek E-mail kamu untuk verifikasi akun.',
		buttons: [{
			text: 'OK',
			handler: () => {
				this.registrationForm.reset();
				this.login_action();
			}
		}]
    });
	let body = {
		value: this.registrationForm.value,
	};
	this.accsPrvds.postData(body, 'create_member').subscribe((res:any)=>{
		Loading.dismiss();
		if(res.code == '00'){
			alertSuccess.present();
		} else if(res.code == '99'){
			this.presentToast(res.respon_data);
		} else {
			this.presentToast('Gagal Menyimpan Data..');
		}
		// console.log(res);
	},(err)=>{
		this.presentToast('Tidak dapat terhubung ke server');
		Loading.dismiss();
	});

  }

  login_action(){
  	this.navCtrl.navigateRoot('/login');
  }

  async get_prov(){
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios',
    });
    Loading.present();
    let body = {};
    this.accsPrvds.postData(body, 'get_provinsi').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res.respon_data);
      this._provinsi = res.respon_data.responses.response;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async get_kabkot($event){
  	this.registrationForm.get('kabkot').setValue('');
  	this.registrationForm.get('kecamatan').setValue('');
  	this.registrationForm.get('kelurahan').setValue('');
  	this._kabkot = null;
	this._kecamatan = null;
	this._kelurahan = null;
	if($event.target.value == ''){
  		return;
  	}

  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios',
    });
    Loading.present();
    let body = {
    	value: $event.target.value,
    };
    this.accsPrvds.postData(body, 'get_kabkot').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res.respon_data);
      this._kabkot = res.respon_data.responses.response;
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  async get_kec($event){
  	this.registrationForm.get('kecamatan').setValue('');
  	this.registrationForm.get('kelurahan').setValue('');
  	this._kecamatan = null;
	this._kelurahan = null;
  	if($event.target.value == ''){
  		return;
  	}
	let Loading = await this.loadingCtrl.create({
		spinner: 'dots',
      	mode:'ios',
	});
	Loading.present();
	let body = {
		value: $event.target.value,
	};
	this.accsPrvds.postData(body, 'get_kec').subscribe((res:any)=>{
		Loading.dismiss();
		// console.log(res.respon_data);
		if(res.respon_data.responses == null){
			this.presentToast('Maaf! Data kecamatan tidak di temukan.');
		} else {
			this._kecamatan = res.respon_data.responses.response;
		}
	},(err)=>{
		this.presentToast('Tidak dapat terhubung ke server');
	});
  	
  }

  async get_kel($event){
  	this.registrationForm.get('kelurahan').setValue('');
	this._kelurahan = null;
  	if($event.target.value == ''){
  		return;
  	}
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios',
    });
    Loading.present();
    let body = {
    	value: $event.target.value,
    };
    this.accsPrvds.postData(body, 'get_kel').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res.respon_data);
      if(res.respon_data.responses == null){
      	this.presentToast('Maaf! Data kelurahan tidak di temukan.');
      } else {
		this._kelurahan = res.respon_data.responses.response;
	  }
    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  get_postal($event){
  	var val = $event.target.value;
  	var splt = val.split('~');
  	this._postal = splt[1];
  }

}
