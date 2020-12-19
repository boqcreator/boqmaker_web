import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShapeCalculatorPageRoutingModule } from './shape-calculator-routing.module';

import { ShapeCalculatorPage } from './shape-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShapeCalculatorPageRoutingModule
  ],
  declarations: [ShapeCalculatorPage]
})
export class ShapeCalculatorPageModule {}
