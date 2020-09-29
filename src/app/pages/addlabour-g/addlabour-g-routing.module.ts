import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddlabourGPage } from './addlabour-g.page';

const routes: Routes = [
  {
    path: '',
    component: AddlabourGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddlabourGPageRoutingModule {}
