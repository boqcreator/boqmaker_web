import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaG3Page } from './area-g3.page';

const routes: Routes = [
  {
    path: '',
    component: AreaG3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaG3PageRoutingModule {}
