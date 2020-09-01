import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdataakunPageRoutingModule } from './editdataakun-routing.module';

import { EditdataakunPage } from './editdataakun.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditdataakunPageRoutingModule
  ],
  declarations: [EditdataakunPage]
})
export class EditdataakunPageModule {}
