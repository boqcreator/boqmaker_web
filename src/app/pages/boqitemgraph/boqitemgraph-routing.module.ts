import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoqitemgraphPage } from './boqitemgraph.page';

const routes: Routes = [
  {
    path: '',
    component: BoqitemgraphPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoqitemgraphPageRoutingModule {}
