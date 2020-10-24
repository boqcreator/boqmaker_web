import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostdetailsPageRoutingModule } from './costdetails-routing.module';

import { CostdetailsPage } from './costdetails.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostdetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [CostdetailsPage]
})
export class CostdetailsPageModule {}
