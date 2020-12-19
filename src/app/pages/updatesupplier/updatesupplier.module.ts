import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatesupplierPageRoutingModule } from './updatesupplier-routing.module';

import { UpdatesupplierPage } from './updatesupplier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatesupplierPageRoutingModule
  ],
  declarations: [UpdatesupplierPage]
})
export class UpdatesupplierPageModule {}
