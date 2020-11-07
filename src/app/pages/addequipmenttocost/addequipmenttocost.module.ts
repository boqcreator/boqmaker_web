import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddequipmenttocostPageRoutingModule } from './addequipmenttocost-routing.module';

import { AddequipmenttocostPage } from './addequipmenttocost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddequipmenttocostPageRoutingModule
  ],
  declarations: [AddequipmenttocostPage]
})
export class AddequipmenttocostPageModule {}
