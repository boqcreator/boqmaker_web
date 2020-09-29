import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalqtytablePage } from './finalqtytable.page';

const routes: Routes = [
  {
    path: '',
    component: FinalqtytablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalqtytablePageRoutingModule {}
