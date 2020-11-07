import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaG2Page } from './area-g2.page';

const routes: Routes = [
  {
    path: '',
    component: AreaG2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaG2PageRoutingModule {}
