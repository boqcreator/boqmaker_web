import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditareacatPageRoutingModule } from './editareacat-routing.module';

import { EditareacatPage } from './editareacat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditareacatPageRoutingModule
  ],
  declarations: [EditareacatPage]
})
export class EditareacatPageModule {}
