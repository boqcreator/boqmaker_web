import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostdetailsPage } from './costdetails.page';

const routes: Routes = [
  {
    path: '',
    component: CostdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostdetailsPageRoutingModule {}
