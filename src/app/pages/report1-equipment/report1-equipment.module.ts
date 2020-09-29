import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Report1EquipmentPageRoutingModule } from './report1-equipment-routing.module';

import { Report1EquipmentPage } from './report1-equipment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Report1EquipmentPageRoutingModule
  ],
  declarations: [Report1EquipmentPage]
})
export class Report1EquipmentPageModule {}
