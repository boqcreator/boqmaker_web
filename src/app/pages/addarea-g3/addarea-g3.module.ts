import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddareaG3PageRoutingModule } from './addarea-g3-routing.module';

import { AddareaG3Page } from './addarea-g3.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddareaG3PageRoutingModule,
    SharedModule
  ],
  declarations: [AddareaG3Page]
})
export class AddareaG3PageModule {}
