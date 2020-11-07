import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddboqitemG2PageRoutingModule } from './addboqitem-g2-routing.module';

import { AddboqitemG2Page } from './addboqitem-g2.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddboqitemG2PageRoutingModule,
    SharedModule
  ],
  declarations: [AddboqitemG2Page]
})
export class AddboqitemG2PageModule {}
