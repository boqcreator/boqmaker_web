import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabourGPage } from './labour-g.page';

const routes: Routes = [
  {
    path: '',
    component: LabourGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabourGPageRoutingModule {}
