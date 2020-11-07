import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddequipmentGPageRoutingModule } from './addequipment-g-routing.module';

import { AddequipmentGPage } from './addequipment-g.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddequipmentGPageRoutingModule
  ],
  declarations: [AddequipmentGPage]
})
export class AddequipmentGPageModule {}
