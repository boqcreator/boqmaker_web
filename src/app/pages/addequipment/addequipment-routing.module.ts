import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddequipmentPage } from './addequipment.page';

const routes: Routes = [
  {
    path: '',
    component: AddequipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddequipmentPageRoutingModule {}
