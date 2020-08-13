import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportFinalPricedBillPageRoutingModule } from './report-final-priced-bill-routing.module';

import { ReportFinalPricedBillPage } from './report-final-priced-bill.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportFinalPricedBillPageRoutingModule,
    SharedModule
  ],
  declarations: [ReportFinalPricedBillPage]
})
export class ReportFinalPricedBillPageModule {}
