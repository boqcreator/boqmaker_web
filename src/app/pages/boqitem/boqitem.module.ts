import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemPageRoutingModule } from './boqitem-routing.module';

import { BoqitemPage } from './boqitem.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemPageRoutingModule,
    SharedModule
  ],
  declarations: [BoqitemPage]
})
export class BoqitemPageModule {}
