import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddareaG4Page } from './addarea-g4.page';

const routes: Routes = [
  {
    path: '',
    component: AddareaG4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddareaG4PageRoutingModule {}
