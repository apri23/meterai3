import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesctransaksiPageRoutingModule } from './desctransaksi-routing.module';

import { DesctransaksiPage } from './desctransaksi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesctransaksiPageRoutingModule
  ],
  declarations: [DesctransaksiPage]
})
export class DesctransaksiPageModule {}
