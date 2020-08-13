import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsupplierLPageRoutingModule } from './addsupplier-l-routing.module';

import { AddsupplierLPage } from './addsupplier-l.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsupplierLPageRoutingModule
  ],
  declarations: [AddsupplierLPage]
})
export class AddsupplierLPageModule {}
