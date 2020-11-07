import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemlibPageRoutingModule } from './boqitemlib-routing.module';

import { BoqitemlibPage } from './boqitemlib.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemlibPageRoutingModule,
    SharedModule
  ],
  declarations: [BoqitemlibPage]
})
export class BoqitemlibPageModule {}
