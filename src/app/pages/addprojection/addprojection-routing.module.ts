import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddprojectionPage } from './addprojection.page';

const routes: Routes = [
  {
    path: '',
    component: AddprojectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddprojectionPageRoutingModule {}
