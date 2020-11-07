import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabourlibPage } from './labourlib.page';

const routes: Routes = [
  {
    path: '',
    component: LabourlibPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabourlibPageRoutingModule {}
