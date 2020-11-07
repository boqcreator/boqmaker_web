import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentlibPageRoutingModule } from './equipmentlib-routing.module';

import { EquipmentlibPage } from './equipmentlib.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentlibPageRoutingModule,
    SharedModule
  ],
  declarations: [EquipmentlibPage]
})
export class EquipmentlibPageModule {}
