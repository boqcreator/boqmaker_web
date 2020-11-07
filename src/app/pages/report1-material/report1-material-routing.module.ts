import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Report1MaterialPage } from './report1-material.page';

const routes: Routes = [
  {
    path: '',
    component: Report1MaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Report1MaterialPageRoutingModule {}
