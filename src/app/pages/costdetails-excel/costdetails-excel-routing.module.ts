import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostdetailsExcelPage } from './costdetails-excel.page';

const routes: Routes = [
  {
    path: '',
    component: CostdetailsExcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostdetailsExcelPageRoutingModule {}
