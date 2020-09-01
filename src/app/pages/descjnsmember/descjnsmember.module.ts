import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescjnsmemberPageRoutingModule } from './descjnsmember-routing.module';

import { DescjnsmemberPage } from './descjnsmember.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescjnsmemberPageRoutingModule
  ],
  declarations: [DescjnsmemberPage]
})
export class DescjnsmemberPageModule {}
