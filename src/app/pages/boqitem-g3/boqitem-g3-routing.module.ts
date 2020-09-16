import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoqitemG3Page } from './boqitem-g3.page';

const routes: Routes = [
  {
    path: '',
    component: BoqitemG3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoqitemG3PageRoutingModule {}
