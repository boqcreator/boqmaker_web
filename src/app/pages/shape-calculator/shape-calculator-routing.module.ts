import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShapeCalculatorPage } from './shape-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: ShapeCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShapeCalculatorPageRoutingModule {}
