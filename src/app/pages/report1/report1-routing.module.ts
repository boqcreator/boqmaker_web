import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Report1Page } from './report1.page';

const routes: Routes = [
  {
    path: '',
    component: Report1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Report1PageRoutingModule {}
