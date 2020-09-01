import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdataakunPage } from './editdataakun.page';

const routes: Routes = [
  {
    path: '',
    component: EditdataakunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdataakunPageRoutingModule {}
