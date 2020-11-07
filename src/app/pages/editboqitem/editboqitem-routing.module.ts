import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditboqitemPage } from './editboqitem.page';

const routes: Routes = [
  {
    path: '',
    component: EditboqitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditboqitemPageRoutingModule {}
