import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriallibPage } from './materiallib.page';

const routes: Routes = [
  {
    path: '',
    component: MateriallibPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriallibPageRoutingModule {}
