import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabourlibPageRoutingModule } from './labourlib-routing.module';

import { LabourlibPage } from './labourlib.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabourlibPageRoutingModule,
    SharedModule
  ],
  declarations: [LabourlibPage]
})
export class LabourlibPageModule {}
