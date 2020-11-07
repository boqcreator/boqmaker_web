import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentGPage } from './equipment-g.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentGPageRoutingModule {}
