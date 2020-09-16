import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddareaG3Page } from './addarea-g3.page';

const routes: Routes = [
  {
    path: '',
    component: AddareaG3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddareaG3PageRoutingModule {}
