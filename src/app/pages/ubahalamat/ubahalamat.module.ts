import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbahalamatPageRoutingModule } from './ubahalamat-routing.module';

import { UbahalamatPage } from './ubahalamat.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    UbahalamatPageRoutingModule
  ],
  declarations: [UbahalamatPage]
})
export class UbahalamatPageModule {}
