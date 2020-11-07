import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsubcontractortocostPage } from './addsubcontractortocost.page';

const routes: Routes = [
  {
    path: '',
    component: AddsubcontractortocostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsubcontractortocostPageRoutingModule {}
