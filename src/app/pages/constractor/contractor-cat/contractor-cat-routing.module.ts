import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorCatPage } from './contractor-cat.page';

const routes: Routes = [
  {
    path: '',
    component: ContractorCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorCatPageRoutingModule {}
