import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-desctentang',
  templateUrl: './desctentang.page.html',
  styleUrls: ['./desctentang.page.scss'],
})
export class DesctentangPage implements OnInit {
	__id:any;
	__desc:any;
	__header:any;

	pengertian:any = false;
	pembuatanakun:any = false;
	pemesanan:any = false;
	hargadanpembayaran:any = false;
	pengirimanpesanan:any = false;
	persediaanbarang:any = false;
	barangrusakatauhilang:any = false;
	sebabkahar:any = false;
	lainlain:any = false;

  constructor(
  	private navParams: NavParams,
  	private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if(this.navParams.get('id')){
    	this.__id = this.navParams.get('id');
    	this.__desc = this.navParams.get('desc');
    	this.__header = this.navParams.get('header');
  	} else {
  		this.closemodal();
  	}
  }

  closemodal(){
  	this.modalCtrl.dismiss();
  }

  hidenpengertian(){
  	if(this.pengertian == true){
  		this.pengertian = false;
  	} else {
  		this.pengertian = true;
  	}
  }

  hidenpembuatanakun(){
  	if(this.pembuatanakun == true){
  		this.pembuatanakun = false;
  	} else {
  		this.pembuatanakun = true;
  	}
  }

  hidenpemesanan(){
  	if(this.pemesanan == true){
  		this.pemesanan = false;
  	} else {
  		this.pemesanan = true;
  	}
  }

  hidenhargadanpembayaran(){
  	if(this.hargadanpembayaran == true){
  		this.hargadanpembayaran = false;
  	} else {
  		this.hargadanpembayaran = true;
  	}
  }

  hidenpengirimanpesanan(){
  	if(this.pengirimanpesanan == true){
  		this.pengirimanpesanan = false;
  	} else {
  		this.pengirimanpesanan = true;
  	}
  }

  hidenpersediaanbarang(){
  	if(this.persediaanbarang == true){
  		this.persediaanbarang = false;
  	} else {
  		this.persediaanbarang = true;
  	}
  }

  hidenbarangrusakatauhilang(){
  	if(this.barangrusakatauhilang == true){
  		this.barangrusakatauhilang = false;
  	} else {
  		this.barangrusakatauhilang = true;
  	}
  }

  hidensebabkahar(){
  	if(this.sebabkahar == true){
  		this.sebabkahar = false;
  	} else {
  		this.sebabkahar = true;
  	}
  }

  hidenlainlain(){
  	if(this.lainlain == true){
  		this.lainlain = false;
  	} else {
  		this.lainlain = true;
  	}
  }

  openhalopos(){
    window.open('mailto:halopos@posindonesia.co.id', '_system');
  }

  openpci(){
    window.open('https://www.posindonesia.co.id/id', '_system');
  }

  opengiroposcare(){
    window.open('mailto:giroposcare@posindonesia.co.id', '_system');
  }
  
  opencsmeterai(){
    window.open('mailto:cs.meterai@posindonesia.co.id', '_system');
  }

}
