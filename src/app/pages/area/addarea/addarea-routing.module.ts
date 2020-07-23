import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddareaPage } from './addarea.page';

const routes: Routes = [
  {
    path: '',
    component: AddareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddareaPageRoutingModule {}
