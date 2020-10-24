import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostgraphPage } from './costgraph.page';

const routes: Routes = [
  {
    path: '',
    component: CostgraphPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostgraphPageRoutingModule {}
