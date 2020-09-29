import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectionPage } from './projection.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectionPageRoutingModule {}
