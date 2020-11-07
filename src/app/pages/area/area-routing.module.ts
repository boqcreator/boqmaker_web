import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaPage } from './area.page';

const routes: Routes = [
  {
    path: '',
    component: AreaPage
  },
  {
    path: 'addarea',
    loadChildren: () => import('./addarea/addarea.module').then( m => m.AddareaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaPageRoutingModule {}
