import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { ToastController, LoadingController, AlertController, NavController} from '@ionic/angular';
import { AccessProvider } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ubahalamat',
  templateUrl: './ubahalamat.page.html',
  styleUrls: ['./ubahalamat.page.scss'],
})
export class UbahalamatPage implements OnInit {
	_member_id:any;
	_provinsi: any;
	_kabkot: any;
	_kecamatan: any;
	_kelurahan: any;
	_postal: any;

	get nama_depan() {
	  return this.ubahForm.get("nama_depan");
	}
	get telepon() {
	  return this.ubahForm.get('telepon');
	}
	get provinsi() {
	  return this.ubahForm.get("provinsi");
	}
	get kabkot() {
	  return this.ubahForm.get("kabkot");
	}
	get kecamatan() {
	  return this.ubahForm.get("kecamatan");
	}
	get kelurahan() {
	  return this.ubahForm.get("kelurahan");
	}
	get zip() {
	  return this.ubahForm.get('zip');
	}
	get street() {
	  return this.ubahForm.get('street');
	}

	public errorMessages = {
	    nama_depan: [
	      { type: 'required', message: 'Nama tidak boleh kosong.' },
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
	};

	ubahForm = this.formBuilder.group({
		nama_depan: ['', [Validators.required]],
		telepon: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
		provinsi: ['', [Validators.required]],
		kabkot: ['', [Validators.required]],
		kecamatan: [''],
		kelurahan: [''],
		zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
		street: ['', [Validators.required, Validators.maxLength(800)]],
	});

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
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private storage: Storage,
    private formBuilder: FormBuilder,
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
  	this.get_prov();
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: '<ion-icon name="alert-circle-outline"></ion-icon> '+text,
      duration: 2500
    });
    toast.present();
  }

  public async submit(){
  	// console.log(this.ubahForm.value);

  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
    });

  	const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Alamat pengiriman sudah sesuai?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
            Loading.present();
            let body = {
            	member_id: this._member_id,
    		    	data_pengiriman_update: this.ubahForm.value,
    		    };
    		    this.accsPrvds.postData(body, 'update_pengiriman').subscribe((res:any)=>{
    		      Loading.dismiss();
    		      if(res.code == '00'){
    		      	this.modalCtrl.dismiss();
    		      } else {
    		      	this.presentToast(res.message);
    		      }
    		    },(err)=>{
    		      this.presentToast('Tidak dapat terhubung ke server');
    		    });

          }
        }
      ]
    });

    await alert.present();
  }

  async get_prov(){
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
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
  	this.ubahForm.get('kabkot').setValue('');
  	this.ubahForm.get('kecamatan').setValue('');
  	this.ubahForm.get('kelurahan').setValue('');
  	this._kabkot = null;
	this._kecamatan = null;
	this._kelurahan = null;
	if($event.target.value == ''){
  		return;
  	}

  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots'
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
  	this.ubahForm.get('kecamatan').setValue('');
  	this.ubahForm.get('kelurahan').setValue('');
  	this._kecamatan = null;
	this._kelurahan = null;
  	if($event.target.value == ''){
  		return;
  	}
	let Loading = await this.loadingCtrl.create({
		mode: 'ios',
    spinner: 'dots'
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
  	this.ubahForm.get('kelurahan').setValue('');
	this._kelurahan = null;
  	if($event.target.value == ''){
  		return;
  	}
  	let Loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'dots'
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
