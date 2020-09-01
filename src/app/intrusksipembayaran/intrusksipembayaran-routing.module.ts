import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntrusksipembayaranPage } from './intrusksipembayaran.page';

const routes: Routes = [
  {
    path: '',
    component: IntrusksipembayaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntrusksipembayaranPageRoutingModule {}
