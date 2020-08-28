import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmaterialtocostPage } from './addmaterialtocost.page';

const routes: Routes = [
  {
    path: '',
    component: AddmaterialtocostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmaterialtocostPageRoutingModule {}
