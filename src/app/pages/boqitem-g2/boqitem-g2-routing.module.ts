import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoqitemG2Page } from './boqitem-g2.page';

const routes: Routes = [
  {
    path: '',
    component: BoqitemG2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoqitemG2PageRoutingModule {}
