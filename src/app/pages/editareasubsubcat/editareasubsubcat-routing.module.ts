import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditareasubsubcatPage } from './editareasubsubcat.page';

const routes: Routes = [
  {
    path: '',
    component: EditareasubsubcatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditareasubsubcatPageRoutingModule {}
