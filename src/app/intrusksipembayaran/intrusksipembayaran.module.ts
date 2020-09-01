import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntrusksipembayaranPageRoutingModule } from './intrusksipembayaran-routing.module';

import { IntrusksipembayaranPage } from './intrusksipembayaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntrusksipembayaranPageRoutingModule
  ],
  declarations: [IntrusksipembayaranPage]
})
export class IntrusksipembayaranPageModule {}
