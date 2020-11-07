import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddareaG5PageRoutingModule } from './addarea-g5-routing.module';

import { AddareaG5Page } from './addarea-g5.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddareaG5PageRoutingModule,
    SharedModule
  ],
  declarations: [AddareaG5Page]
})
export class AddareaG5PageModule {}
