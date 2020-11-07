import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditsupplierlabPage } from './editsupplierlab.page';

const routes: Routes = [
  {
    path: '',
    component: EditsupplierlabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditsupplierlabPageRoutingModule {}
