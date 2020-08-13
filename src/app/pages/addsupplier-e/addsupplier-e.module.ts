import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsupplierEPageRoutingModule } from './addsupplier-e-routing.module';

import { AddsupplierEPage } from './addsupplier-e.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsupplierEPageRoutingModule,
    SharedModule
  ],
  declarations: [AddsupplierEPage]
})
export class AddsupplierEPageModule {}
