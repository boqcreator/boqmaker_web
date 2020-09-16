import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditareasubcatPage } from './editareasubcat.page';

const routes: Routes = [
  {
    path: '',
    component: EditareasubcatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditareasubcatPageRoutingModule {}
