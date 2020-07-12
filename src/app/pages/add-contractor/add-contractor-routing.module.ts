import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddContractorPage } from './add-contractor.page';

const routes: Routes = [
  {
    path: '',
    component: AddContractorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddContractorPageRoutingModule {}
