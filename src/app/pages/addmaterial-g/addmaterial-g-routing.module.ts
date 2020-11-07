import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmaterialGPage } from './addmaterial-g.page';

const routes: Routes = [
  {
    path: '',
    component: AddmaterialGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmaterialGPageRoutingModule {}
