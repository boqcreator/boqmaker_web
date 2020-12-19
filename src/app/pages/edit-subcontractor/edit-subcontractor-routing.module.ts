import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSubcontractorPage } from './edit-subcontractor.page';

const routes: Routes = [
  {
    path: '',
    component: EditSubcontractorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSubcontractorPageRoutingModule {}
