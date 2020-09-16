import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddareaG1Page } from './addarea-g1.page';

const routes: Routes = [
  {
    path: '',
    component: AddareaG1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddareaG1PageRoutingModule {}
