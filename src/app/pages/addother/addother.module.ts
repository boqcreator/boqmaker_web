import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddotherPageRoutingModule } from './addother-routing.module';

import { AddotherPage } from './addother.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddotherPageRoutingModule,
    SharedModule
  ],
  declarations: [AddotherPage]
})
export class AddotherPageModule {}
