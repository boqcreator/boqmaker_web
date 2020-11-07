import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Report1OtherPage } from './report1-other.page';

const routes: Routes = [
  {
    path: '',
    component: Report1OtherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Report1OtherPageRoutingModule {}
