import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoqitemG4Page } from './boqitem-g4.page';

const routes: Routes = [
  {
    path: '',
    component: BoqitemG4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoqitemG4PageRoutingModule {}
