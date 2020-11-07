import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddboqitemG2Page } from './addboqitem-g2.page';

const routes: Routes = [
  {
    path: '',
    component: AddboqitemG2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddboqitemG2PageRoutingModule {}
