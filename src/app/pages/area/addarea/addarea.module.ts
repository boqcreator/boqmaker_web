import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddareaPageRoutingModule } from './addarea-routing.module';

import { AddareaPage } from './addarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddareaPageRoutingModule
  ],
  declarations: [AddareaPage]
})
export class AddareaPageModule {}
