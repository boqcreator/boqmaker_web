import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmaterialPageRoutingModule } from './addmaterial-routing.module';

import { AddmaterialPage } from './addmaterial.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmaterialPageRoutingModule,
    SharedModule
  ],
  declarations: [AddmaterialPage]
})
export class AddmaterialPageModule {}
