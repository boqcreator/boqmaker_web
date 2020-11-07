import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditsuppliereqPage } from './editsuppliereq.page';

const routes: Routes = [
  {
    path: '',
    component: EditsuppliereqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditsuppliereqPageRoutingModule {}
