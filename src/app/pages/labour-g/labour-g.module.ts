import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabourGPageRoutingModule } from './labour-g-routing.module';

import { LabourGPage } from './labour-g.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabourGPageRoutingModule,
    SharedModule
  ],
  declarations: [LabourGPage]
})
export class LabourGPageModule {}
