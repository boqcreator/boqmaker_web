import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageboqPage } from './manageboq.page';

const routes: Routes = [
  {
    path: '',
    component: ManageboqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageboqPageRoutingModule {}
