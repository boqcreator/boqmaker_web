import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoqitemGPage } from './boqitem-g.page';

const routes: Routes = [
  {
    path: '',
    component: BoqitemGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoqitemGPageRoutingModule {}
