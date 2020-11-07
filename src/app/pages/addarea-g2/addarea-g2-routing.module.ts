import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddareaG2Page } from './addarea-g2.page';

const routes: Routes = [
  {
    path: '',
    component: AddareaG2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddareaG2PageRoutingModule {}
