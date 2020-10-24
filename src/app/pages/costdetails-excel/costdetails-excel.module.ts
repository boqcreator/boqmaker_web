import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostdetailsExcelPageRoutingModule } from './costdetails-excel-routing.module';

import { CostdetailsExcelPage } from './costdetails-excel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostdetailsExcelPageRoutingModule
  ],
  declarations: [CostdetailsExcelPage]
})
export class CostdetailsExcelPageModule {}
