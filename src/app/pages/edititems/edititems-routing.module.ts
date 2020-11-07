import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdititemsPage } from './edititems.page';

const routes: Routes = [
  {
    path: '',
    component: EdititemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdititemsPageRoutingModule {}
