import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsupplierOPage } from './addsupplier-o.page';

const routes: Routes = [
  {
    path: '',
    component: AddsupplierOPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsupplierOPageRoutingModule {}
