import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddothertocostPageRoutingModule } from './addothertocost-routing.module';

import { AddothertocostPage } from './addothertocost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddothertocostPageRoutingModule
  ],
  declarations: [AddothertocostPage]
})
export class AddothertocostPageModule {}
