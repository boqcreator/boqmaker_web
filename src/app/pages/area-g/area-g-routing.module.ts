import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaGPage } from './area-g.page';

const routes: Routes = [
  {
    path: '',
    component: AreaGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaGPageRoutingModule {}
