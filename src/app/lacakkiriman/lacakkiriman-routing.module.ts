import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LacakkirimanPage } from './lacakkiriman.page';

const routes: Routes = [
  {
    path: '',
    component: LacakkirimanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LacakkirimanPageRoutingModule {}
