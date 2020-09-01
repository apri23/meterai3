import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LacakkirimanPageRoutingModule } from './lacakkiriman-routing.module';

import { LacakkirimanPage } from './lacakkiriman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LacakkirimanPageRoutingModule
  ],
  declarations: [LacakkirimanPage]
})
export class LacakkirimanPageModule {}
