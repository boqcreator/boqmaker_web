import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditsupplieroPage } from './editsuppliero.page';

const routes: Routes = [
  {
    path: '',
    component: EditsupplieroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditsupplieroPageRoutingModule {}
