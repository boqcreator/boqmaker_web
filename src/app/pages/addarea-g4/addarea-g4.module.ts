import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddareaG4PageRoutingModule } from './addarea-g4-routing.module';

import { AddareaG4Page } from './addarea-g4.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddareaG4PageRoutingModule,
    SharedModule
  ],
  declarations: [AddareaG4Page]
})
export class AddareaG4PageModule {}
