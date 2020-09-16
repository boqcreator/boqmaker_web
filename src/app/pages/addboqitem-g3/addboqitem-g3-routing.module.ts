import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddboqitemG3Page } from './addboqitem-g3.page';

const routes: Routes = [
  {
    path: '',
    component: AddboqitemG3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddboqitemG3PageRoutingModule {}
