import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdatapribadiPage } from './editdatapribadi.page';

const routes: Routes = [
  {
    path: '',
    component: EditdatapribadiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdatapribadiPageRoutingModule {}
