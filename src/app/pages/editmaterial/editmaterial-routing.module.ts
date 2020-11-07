import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditmaterialPage } from './editmaterial.page';

const routes: Routes = [
  {
    path: '',
    component: EditmaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditmaterialPageRoutingModule {}
