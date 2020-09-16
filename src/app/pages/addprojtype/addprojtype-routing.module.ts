import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddprojtypePage } from './addprojtype.page';

const routes: Routes = [
  {
    path: '',
    component: AddprojtypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddprojtypePageRoutingModule {}
