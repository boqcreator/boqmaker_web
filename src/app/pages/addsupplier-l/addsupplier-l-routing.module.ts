import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsupplierLPage } from './addsupplier-l.page';

const routes: Routes = [
  {
    path: '',
    component: AddsupplierLPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsupplierLPageRoutingModule {}
