import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsubcontractortocostPageRoutingModule } from './addsubcontractortocost-routing.module';

import { AddsubcontractortocostPage } from './addsubcontractortocost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsubcontractortocostPageRoutingModule
  ],
  declarations: [AddsubcontractortocostPage]
})
export class AddsubcontractortocostPageModule {}
