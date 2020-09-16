import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaG1Page } from './area-g1.page';

const routes: Routes = [
  {
    path: '',
    component: AreaG1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaG1PageRoutingModule {}
