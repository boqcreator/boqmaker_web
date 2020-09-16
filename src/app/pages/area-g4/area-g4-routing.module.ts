import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaG4Page } from './area-g4.page';

const routes: Routes = [
  {
    path: '',
    component: AreaG4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaG4PageRoutingModule {}
