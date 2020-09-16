import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditareacatPage } from './editareacat.page';

const routes: Routes = [
  {
    path: '',
    component: EditareacatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditareacatPageRoutingModule {}
