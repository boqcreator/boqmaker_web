import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddothertocostPage } from './addothertocost.page';

const routes: Routes = [
  {
    path: '',
    component: AddothertocostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddothertocostPageRoutingModule {}
