import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialGPage } from './material-g.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialGPageRoutingModule {}
