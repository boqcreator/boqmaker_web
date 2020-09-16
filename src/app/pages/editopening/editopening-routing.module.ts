import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditopeningPage } from './editopening.page';

const routes: Routes = [
  {
    path: '',
    component: EditopeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditopeningPageRoutingModule {}
