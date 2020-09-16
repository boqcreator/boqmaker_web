import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditareasPage } from './editareas.page';

const routes: Routes = [
  {
    path: '',
    component: EditareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditareasPageRoutingModule {}
