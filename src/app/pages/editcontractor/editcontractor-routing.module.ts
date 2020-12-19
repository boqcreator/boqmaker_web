import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcontractorPage } from './editcontractor.page';

const routes: Routes = [
  {
    path: '',
    component: EditcontractorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcontractorPageRoutingModule {}
