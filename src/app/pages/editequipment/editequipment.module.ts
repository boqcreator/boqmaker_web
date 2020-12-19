import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditequipmentPageRoutingModule } from './editequipment-routing.module';

import { EditequipmentPage } from './editequipment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditequipmentPageRoutingModule,
    SharedModule
  ],
  declarations: [EditequipmentPage]
})
export class EditequipmentPageModule {}
