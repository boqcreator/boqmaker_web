import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Report1DetailsPage } from './report1-details.page';

const routes: Routes = [
  {
    path: '',
    component: Report1DetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Report1DetailsPageRoutingModule {}
