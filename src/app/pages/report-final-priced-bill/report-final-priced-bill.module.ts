import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportFinalPricedBillPageRoutingModule } from './report-final-priced-bill-routing.module';

import { ReportFinalPricedBillPage } from './report-final-priced-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportFinalPricedBillPageRoutingModule
  ],
  declarations: [ReportFinalPricedBillPage]
})
export class ReportFinalPricedBillPageModule {}
