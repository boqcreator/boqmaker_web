import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Report1EquipmentPage } from './report1-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: Report1EquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Report1EquipmentPageRoutingModule {}
