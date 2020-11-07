import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditareaPageRoutingModule } from './editarea-routing.module';

import { EditareaPage } from './editarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditareaPageRoutingModule
  ],
  declarations: [EditareaPage]
})
export class EditareaPageModule {}
