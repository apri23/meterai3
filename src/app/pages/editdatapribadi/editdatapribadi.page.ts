import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, ToastController, LoadingController, AlertController, NavController, ModalController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-editdatapribadi',
  templateUrl: './editdatapribadi.page.html',
  styleUrls: ['./editdatapribadi.page.scss'],
})
export class EditdatapribadiPage implements OnInit {

	_username:any;

  _provinsi: any;
	_kabkot: any;
	_kecamatan: any;
	_kelurahan: any;
	_postal: any;

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

	get nama_depan() {
	  return this.registrationForm.get("nama_depan");
	}
	get nama_belakang() {
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
	get postal() {
	  return this.registrationForm.get('postal');
	}
	get street() {
	  return this.registrationForm.get('street');
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
	    postal: [ 
	      { type: 'required', message: 'Kode Pos tida boleh kosong' }, 
	      { type: 'pattern', message: 'Masukkan Kode Pos yang benar.' },
	    ],
	    street: [
	      { type: 'required', message: 'Alamat tidak boleh kosong' },
	      { type: 'maxlength', message: 'Alamat tidak boleh lebih dari 12 karakter.' },
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
		postal: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
		street: ['', [Validators.required, Validators.maxLength(800)]],
	});

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
  		this.registrationForm.get("nama_depan").setValue(this.navParams.get('nama_depan_'));
  		this.registrationForm.get("nama_belakang").setValue(this.navParams.get('nama_belakang_'));
  		this.registrationForm.get("telepon").setValue(this.navParams.get('telpon_'));
  		// this.registrationForm.get("street").setValue(this.navParams.get('alamat_'));

        this.get_alamat_full(this.navParams.get('region_'),this.navParams.get('city_'),this.navParams.get('kecamatan_'),this.navParams.get('kelurahan_'));

  	} else {
  		this.closemodal();
  	}
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

  closemodal(){
  	this.modalCtrl.dismiss();
  }

  async get_alamat_full(region,city,kec,kel){
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios',
    });
    Loading.present();
    let body = {
    	region: region,
        city: city,
        kecamatan: kec,
        kelurahan: kel
    };
    this.accsPrvds.postData(body, 'get_alamat_full').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);

      this._provinsi = res.prov;
      let prov = res.prov.find(e => e.provinceName === region);
      this.registrationForm.get("provinsi").setValue(prov.provinceName+'~'+prov.provinceCode);

      this._kabkot = res.kabkot;
      let kabkotf = res.kabkot.find(e => e.cityType+' '+e.cityName === city);
      this.registrationForm.get("kabkot").setValue(kabkotf.cityType+' '+kabkotf.cityName+'~'+kabkotf.cityCode);

      if(res.kec == null || res.kec == ''){
  		  this._kecamatan = '';
  	  } else {
    		this._kecamatan = res.kec;
    		let kecf = res.kec.find(e => e.subDistrictType+' '+e.subDistrictName === kec);
    		this.registrationForm.get("kecamatan").setValue(kecf.subDistrictType+' '+kecf.subDistrictName+'~'+kecf.subDistrictCode);
  	  }

  	  if(res.kel == null || res.kel == ''){
        	this._kelurahan = '';
      } else {
    		this._kelurahan = res.kel;
    		let kelf = res.kel.find(e => e.subSubDistrictType+' '+e.subSubDistrictName === kel);
    		this.registrationForm.get("kelurahan").setValue(kelf.subSubDistrictType+' '+kelf.subSubDistrictName+'~'+kelf.postalCode);
  	  }

  	  this.registrationForm.get("postal").setValue(res.kd_pos);

    },(err)=>{
      this.presentToast('Tidak dapat terhubung ke server');
    });
  }

  // async get_prov(){
  // 	let Loading = await this.loadingCtrl.create({
  //     spinner: 'dots',
  //     mode:'ios',
  //   });
  //   Loading.present();
  //   let body = {};
  //   this.accsPrvds.postData(body, 'get_provinsi').subscribe((res:any)=>{
  //     Loading.dismiss();
  //     // console.log(res.respon_data);
  //     this._provinsi = res.respon_data.responses.response;
  //     if(this._region_ != ''){
	 //      let prov = res.respon_data.responses.response.find(e => e.provinceName === this._region_);
	 //      this.provinsi = prov.provinceName+'~'+prov.provinceCode;
	 //      this._region_ = '';
  //     }
  //   },(err)=>{
  //     this.presentToast('Tidak dapat terhubung ke server');
  //   });
  // }

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
  	this.registrationForm.get("postal").setValue(splt[1]);
  }

  async submit(){

  	let Loading = await this.loadingCtrl.create({
		spinner: 'dots',
		mode:'ios',
	});
	Loading.present();
	let body = {
		value: this.registrationForm.value,
		username: this._username,
	};
	this.accsPrvds.postData(body, 'save_data_pribadi').subscribe((res:any)=>{
		Loading.dismiss();
		// console.log(res);
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
