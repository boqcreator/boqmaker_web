import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsubcontractorPage } from './addsubcontractor.page';

const routes: Routes = [
  {
    path: '',
    component: AddsubcontractorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsubcontractorPageRoutingModule {}
