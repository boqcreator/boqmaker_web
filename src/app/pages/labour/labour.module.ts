import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabourPageRoutingModule } from './labour-routing.module';

import { LabourPage } from './labour.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabourPageRoutingModule,
    SharedModule
  ],
  declarations: [LabourPage]
})
export class LabourPageModule {}
