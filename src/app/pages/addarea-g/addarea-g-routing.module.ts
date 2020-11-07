import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddareaGPage } from './addarea-g.page';

const routes: Routes = [
  {
    path: '',
    component: AddareaGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddareaGPageRoutingModule {}
