import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultantPage } from './consultant.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultantPageRoutingModule {}
