import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddboqitemG4Page } from './addboqitem-g4.page';

const routes: Routes = [
  {
    path: '',
    component: AddboqitemG4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddboqitemG4PageRoutingModule {}
