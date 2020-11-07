import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportFinalPricedBillPage } from './report-final-priced-bill.page';

const routes: Routes = [
  {
    path: '',
    component: ReportFinalPricedBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportFinalPricedBillPageRoutingModule {}
