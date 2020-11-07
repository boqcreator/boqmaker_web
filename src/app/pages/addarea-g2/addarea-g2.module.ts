import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddareaG2PageRoutingModule } from './addarea-g2-routing.module';

import { AddareaG2Page } from './addarea-g2.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddareaG2PageRoutingModule,
    SharedModule
  ],
  declarations: [AddareaG2Page]
})
export class AddareaG2PageModule {}
