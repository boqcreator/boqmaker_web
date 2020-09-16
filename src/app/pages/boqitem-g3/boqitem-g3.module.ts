import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemG3PageRoutingModule } from './boqitem-g3-routing.module';

import { BoqitemG3Page } from './boqitem-g3.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemG3PageRoutingModule,
    SharedModule
  ],
  declarations: [BoqitemG3Page]
})
export class BoqitemG3PageModule {}
