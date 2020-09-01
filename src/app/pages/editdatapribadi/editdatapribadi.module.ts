import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdatapribadiPageRoutingModule } from './editdatapribadi-routing.module';

import { EditdatapribadiPage } from './editdatapribadi.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditdatapribadiPageRoutingModule
  ],
  declarations: [EditdatapribadiPage]
})
export class EditdatapribadiPageModule {}
