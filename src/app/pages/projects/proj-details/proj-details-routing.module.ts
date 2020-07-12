import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjDetailsPage } from './proj-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProjDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjDetailsPageRoutingModule {}
