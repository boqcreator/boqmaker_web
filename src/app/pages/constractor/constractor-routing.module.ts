import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstractorPage } from './constractor.page';

const routes: Routes = [
  {
    path: '',
    component: ConstractorPage
  },
  {
    path: 'contractor-cat',
    loadChildren: () => import('./contractor-cat/contractor-cat.module').then( m => m.ContractorCatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstractorPageRoutingModule {}
