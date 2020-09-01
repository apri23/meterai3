import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesctentangPage } from './desctentang.page';

const routes: Routes = [
  {
    path: '',
    component: DesctentangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesctentangPageRoutingModule {}
