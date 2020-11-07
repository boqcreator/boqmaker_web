import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaG5Page } from './area-g5.page';

const routes: Routes = [
  {
    path: '',
    component: AreaG5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaG5PageRoutingModule {}
