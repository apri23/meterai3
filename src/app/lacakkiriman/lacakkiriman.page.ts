import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController, LoadingController, AlertController, NavController, NavParams} from '@ionic/angular';
import { AccessProvider } from '../providers/access-providers';

@Component({
  selector: 'app-lacakkiriman',
  templateUrl: './lacakkiriman.page.html',
  styleUrls: ['./lacakkiriman.page.scss'],
})
export class LacakkirimanPage implements OnInit {
  _lacak_kiriman_last_status:any;
  _lacak_kiriman:any;
  _trx:any;

  opendesctrack:any = false;

  constructor(
  	private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProvider,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
  	if(this.navParams.get('no_barcode')){
  		this.lacak_kiriman_ipos(this.navParams.get('no_barcode'),this.navParams.get('trx_id'));
  	} else {
  		this.closemodal();
  	}
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      color: "danger",
      duration: 3500,
      mode:"ios",
    });
    toast.present();
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

  async lacak_kiriman_ipos(no_barcode,id_trx){
  	let Loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
    });
    Loading.present();
    let body = {
    	barcode: no_barcode,
      trx_id:id_trx,
    };
    this.accsPrvds.postData(body, 'lacak_kiriman_detail').subscribe((res:any)=>{
      Loading.dismiss();
      // console.log(res);
      this._lacak_kiriman_last_status = res.track_last_status;
      this._lacak_kiriman = res.track_detail;
      this._trx = res.trx_data;
    },(err)=>{
      Loading.dismiss();
      this.presentToast('Untuk saat ini tidak dapat melacak kiriman. '+err.name);
    });
  }

  split_lacakkirimanlast_pengirim(str){
    let nn = str.split('~~');
    return nn[2].replace('Pengirim : ','');
  }

  split_lacakkirimanlast_pengirim_alamat(str){
    let nn = str.split('~~');
    return nn[3];
  }

  split_lacakkirimanlast_penerima(str){
    let nn = str.split('~~');
    return nn[6].replace('Penerima : ','');
  }

  split_lacakkirimanlast_penerima_alamat(str){
    let nn = str.split('~~');
    return nn[7]; 
  }

  split_last_status(str){
    let nn = str.split(';');
    return nn[3];
  }

  split_detail_2(str){
    let nn = str.split('~~');
    if(nn[2] == ' '){
      return '';
    } else {
      return ' - '+nn[2];
    }
  }

  split_detail_0(str){
    let nn = str.split('~~');
    return nn[0];
  }

  splitelast_desc_status(str){
    let nn = str.split(';');
    return nn[2];
  }

  splitelast_desc_ket(str){
    let nn = str.split(';');
    return nn[3];
  }

  hidenopendesctrack(){
    if(this.opendesctrack == true){
      this.opendesctrack = false;
    } else {
      this.opendesctrack = true;
    }
  }

}
