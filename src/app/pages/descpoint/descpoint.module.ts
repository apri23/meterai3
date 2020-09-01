import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescpointPageRoutingModule } from './descpoint-routing.module';

import { DescpointPage } from './descpoint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescpointPageRoutingModule
  ],
  declarations: [DescpointPage]
})
export class DescpointPageModule {}
