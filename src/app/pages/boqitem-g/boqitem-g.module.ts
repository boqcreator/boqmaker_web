import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemGPageRoutingModule } from './boqitem-g-routing.module';

import { BoqitemGPage } from './boqitem-g.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemGPageRoutingModule,
    SharedModule
  ],
  declarations: [BoqitemGPage]
})
export class BoqitemGPageModule {}
