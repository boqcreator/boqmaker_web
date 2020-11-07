import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsupplierEPage } from './addsupplier-e.page';

const routes: Routes = [
  {
    path: '',
    component: AddsupplierEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsupplierEPageRoutingModule {}
