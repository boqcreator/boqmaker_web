import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditareaPage } from './editarea.page';

const routes: Routes = [
  {
    path: '',
    component: EditareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditareaPageRoutingModule {}
