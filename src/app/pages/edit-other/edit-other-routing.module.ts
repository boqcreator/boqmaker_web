import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOtherPage } from './edit-other.page';

const routes: Routes = [
  {
    path: '',
    component: EditOtherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOtherPageRoutingModule {}
