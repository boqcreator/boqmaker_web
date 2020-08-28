import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArealibPage } from './arealib.page';

const routes: Routes = [
  {
    path: '',
    component: ArealibPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArealibPageRoutingModule {}
