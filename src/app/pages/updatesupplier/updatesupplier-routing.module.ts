import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesupplierPage } from './updatesupplier.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatesupplierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatesupplierPageRoutingModule {}
