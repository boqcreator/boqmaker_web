import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemG5PageRoutingModule } from './boqitem-g5-routing.module';

import { BoqitemG5Page } from './boqitem-g5.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemG5PageRoutingModule,
    SharedModule
  ],
  declarations: [BoqitemG5Page]
})
export class BoqitemG5PageModule {}
