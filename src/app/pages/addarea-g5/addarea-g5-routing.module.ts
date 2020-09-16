import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddareaG5Page } from './addarea-g5.page';

const routes: Routes = [
  {
    path: '',
    component: AddareaG5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddareaG5PageRoutingModule {}
