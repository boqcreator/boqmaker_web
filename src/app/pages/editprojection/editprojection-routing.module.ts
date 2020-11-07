import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditprojectionPage } from './editprojection.page';

const routes: Routes = [
  {
    path: '',
    component: EditprojectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditprojectionPageRoutingModule {}
