import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractorCatPageRoutingModule } from './contractor-cat-routing.module';

import { ContractorCatPage } from './contractor-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractorCatPageRoutingModule
  ],
  declarations: [ContractorCatPage]
})
export class ContractorCatPageModule {}
