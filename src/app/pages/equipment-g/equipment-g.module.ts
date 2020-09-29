import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentGPageRoutingModule } from './equipment-g-routing.module';

import { EquipmentGPage } from './equipment-g.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentGPageRoutingModule,
    SharedModule
  ],
  declarations: [EquipmentGPage]
})
export class EquipmentGPageModule {}
