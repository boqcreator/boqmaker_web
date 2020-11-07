import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemG4PageRoutingModule } from './boqitem-g4-routing.module';

import { BoqitemG4Page } from './boqitem-g4.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemG4PageRoutingModule,
    SharedModule
  ],
  declarations: [BoqitemG4Page]
})
export class BoqitemG4PageModule {}
