import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentlibPage } from './equipmentlib.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentlibPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentlibPageRoutingModule {}
