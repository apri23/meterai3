import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { AccessProvider } from '../providers/access-providers';

declare var window;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	storage_xxx_wom_pos:any;
  _cart:any;

  constructor(
  	private storage: Storage,
  	private router: Router,
    private accsPrvds: AccessProvider,
  ) {
	     window.tabs = this;
  }

  ionViewWillEnter() {
    this.storage.get('storage_xxx_wom_pos').then((res) => {
      if(res == null){
        this.storage_xxx_wom_pos = null;
      } else {
        this.storage_xxx_wom_pos = res;
        this.getcountcart(res.member_username);
      }
      // console.log(this.storage_xxx_wom_pos);
    });
  }

  getcountcart(id){
    let body = {
      member_username: id,
    };
    this.accsPrvds.postData(body, 'getcountcart').subscribe((res:any)=>{
      // console.log(res);
      this._cart = res.respon_data.count_ctlg;
    },(err)=>{
      
    });

  }

}
