import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddlabourtocostPage } from './addlabourtocost.page';

const routes: Routes = [
  {
    path: '',
    component: AddlabourtocostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddlabourtocostPageRoutingModule {}
