import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmaterialGPageRoutingModule } from './addmaterial-g-routing.module';

import { AddmaterialGPage } from './addmaterial-g.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmaterialGPageRoutingModule
  ],
  declarations: [AddmaterialGPage]
})
export class AddmaterialGPageModule {}
