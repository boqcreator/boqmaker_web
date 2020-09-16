import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoqitemG5Page } from './boqitem-g5.page';

const routes: Routes = [
  {
    path: '',
    component: BoqitemG5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoqitemG5PageRoutingModule {}
