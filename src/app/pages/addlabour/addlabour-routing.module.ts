import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddlabourPage } from './addlabour.page';

const routes: Routes = [
  {
    path: '',
    component: AddlabourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddlabourPageRoutingModule {}
