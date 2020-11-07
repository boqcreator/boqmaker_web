import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArealibPageRoutingModule } from './arealib-routing.module';

import { ArealibPage } from './arealib.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArealibPageRoutingModule,
    SharedModule
  ],
  declarations: [ArealibPage]
})
export class ArealibPageModule {}
