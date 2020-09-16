import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddareaG1PageRoutingModule } from './addarea-g1-routing.module';

import { AddareaG1Page } from './addarea-g1.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddareaG1PageRoutingModule,
    SharedModule
  ],
  declarations: [AddareaG1Page]
})
export class AddareaG1PageModule {}
