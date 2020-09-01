import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescpointPage } from './descpoint.page';

const routes: Routes = [
  {
    path: '',
    component: DescpointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescpointPageRoutingModule {}
