import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLabourPage } from './edit-labour.page';

const routes: Routes = [
  {
    path: '',
    component: EditLabourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLabourPageRoutingModule {}
