import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemG2PageRoutingModule } from './boqitem-g2-routing.module';

import { BoqitemG2Page } from './boqitem-g2.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemG2PageRoutingModule,
    SharedModule
  ],
  declarations: [BoqitemG2Page]
})
export class BoqitemG2PageModule {}
