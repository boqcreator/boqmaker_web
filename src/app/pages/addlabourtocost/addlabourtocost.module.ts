import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddlabourtocostPageRoutingModule } from './addlabourtocost-routing.module';

import { AddlabourtocostPage } from './addlabourtocost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlabourtocostPageRoutingModule
  ],
  declarations: [AddlabourtocostPage]
})
export class AddlabourtocostPageModule {}
