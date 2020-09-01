import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesctransaksiPage } from './desctransaksi.page';

const routes: Routes = [
  {
    path: '',
    component: DesctransaksiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesctransaksiPageRoutingModule {}
