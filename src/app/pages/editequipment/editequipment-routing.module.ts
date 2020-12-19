import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditequipmentPage } from './editequipment.page';

const routes: Routes = [
  {
    path: '',
    component: EditequipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditequipmentPageRoutingModule {}
