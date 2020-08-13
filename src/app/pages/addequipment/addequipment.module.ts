import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddequipmentPageRoutingModule } from './addequipment-routing.module';

import { AddequipmentPage } from './addequipment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddequipmentPageRoutingModule,
    SharedModule
  ],
  declarations: [AddequipmentPage]
})
export class AddequipmentPageModule {}
