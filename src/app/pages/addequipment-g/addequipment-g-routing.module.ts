import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddequipmentGPage } from './addequipment-g.page';

const routes: Routes = [
  {
    path: '',
    component: AddequipmentGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddequipmentGPageRoutingModule {}
