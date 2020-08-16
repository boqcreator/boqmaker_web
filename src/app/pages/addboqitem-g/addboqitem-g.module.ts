import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddboqitemGPageRoutingModule } from './addboqitem-g-routing.module';

import { AddboqitemGPage } from './addboqitem-g.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddboqitemGPageRoutingModule
  ],
  declarations: [AddboqitemGPage]
})
export class AddboqitemGPageModule {}
