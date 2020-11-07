import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubcontractorPage } from './subcontractor.page';

const routes: Routes = [
  {
    path: '',
    component: SubcontractorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcontractorPageRoutingModule {}
