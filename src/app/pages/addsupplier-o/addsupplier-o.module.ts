import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsupplierOPageRoutingModule } from './addsupplier-o-routing.module';

import { AddsupplierOPage } from './addsupplier-o.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsupplierOPageRoutingModule
  ],
  declarations: [AddsupplierOPage]
})
export class AddsupplierOPageModule {}
