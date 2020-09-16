import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemG1PageRoutingModule } from './boqitem-g1-routing.module';

import { BoqitemG1Page } from './boqitem-g1.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemG1PageRoutingModule,
    SharedModule
  ],
  declarations: [BoqitemG1Page]
})
export class BoqitemG1PageModule {}
