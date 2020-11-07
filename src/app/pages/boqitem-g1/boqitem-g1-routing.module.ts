import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoqitemG1Page } from './boqitem-g1.page';

const routes: Routes = [
  {
    path: '',
    component: BoqitemG1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoqitemG1PageRoutingModule {}
