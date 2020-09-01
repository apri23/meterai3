import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescjnsmemberPage } from './descjnsmember.page';

const routes: Routes = [
  {
    path: '',
    component: DescjnsmemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescjnsmemberPageRoutingModule {}
