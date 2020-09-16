import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddboqitemG4PageRoutingModule } from './addboqitem-g4-routing.module';

import { AddboqitemG4Page } from './addboqitem-g4.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddboqitemG4PageRoutingModule,
    SharedModule
  ],
  declarations: [AddboqitemG4Page]
})
export class AddboqitemG4PageModule {}
