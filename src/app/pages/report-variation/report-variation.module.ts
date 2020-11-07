import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportVariationPageRoutingModule } from './report-variation-routing.module';

import { ReportVariationPage } from './report-variation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportVariationPageRoutingModule
  ],
  declarations: [ReportVariationPage]
})
export class ReportVariationPageModule {}
