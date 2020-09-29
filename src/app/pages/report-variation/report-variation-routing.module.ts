import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportVariationPage } from './report-variation.page';

const routes: Routes = [
  {
    path: '',
    component: ReportVariationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportVariationPageRoutingModule {}
