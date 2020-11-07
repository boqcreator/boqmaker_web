import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditvaritiondetailsPage } from './editvaritiondetails.page';

const routes: Routes = [
  {
    path: '',
    component: EditvaritiondetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditvaritiondetailsPageRoutingModule {}
