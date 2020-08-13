import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddotherPage } from './addother.page';

const routes: Routes = [
  {
    path: '',
    component: AddotherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddotherPageRoutingModule {}
