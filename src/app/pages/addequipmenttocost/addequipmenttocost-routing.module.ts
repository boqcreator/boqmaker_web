import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddequipmenttocostPage } from './addequipmenttocost.page';

const routes: Routes = [
  {
    path: '',
    component: AddequipmenttocostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddequipmenttocostPageRoutingModule {}
