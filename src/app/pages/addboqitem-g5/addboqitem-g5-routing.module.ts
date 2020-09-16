import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddboqitemG5Page } from './addboqitem-g5.page';

const routes: Routes = [
  {
    path: '',
    component: AddboqitemG5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddboqitemG5PageRoutingModule {}
