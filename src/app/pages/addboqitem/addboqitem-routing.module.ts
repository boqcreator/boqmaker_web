import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddboqitemPage } from './addboqitem.page';

const routes: Routes = [
  {
    path: '',
    component: AddboqitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddboqitemPageRoutingModule {}
