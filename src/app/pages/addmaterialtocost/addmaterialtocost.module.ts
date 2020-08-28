import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmaterialtocostPageRoutingModule } from './addmaterialtocost-routing.module';

import { AddmaterialtocostPage } from './addmaterialtocost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmaterialtocostPageRoutingModule
  ],
  declarations: [AddmaterialtocostPage]
})
export class AddmaterialtocostPageModule {}
