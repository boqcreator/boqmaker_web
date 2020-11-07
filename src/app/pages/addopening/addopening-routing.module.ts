import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddopeningPage } from './addopening.page';

const routes: Routes = [
  {
    path: '',
    component: AddopeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddopeningPageRoutingModule {}
