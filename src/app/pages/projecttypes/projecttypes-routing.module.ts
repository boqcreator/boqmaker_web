import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjecttypesPage } from './projecttypes.page';

const routes: Routes = [
  {
    path: '',
    component: ProjecttypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjecttypesPageRoutingModule {}
