import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Report1LabourPage } from './report1-labour.page';

const routes: Routes = [
  {
    path: '',
    component: Report1LabourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Report1LabourPageRoutingModule {}
