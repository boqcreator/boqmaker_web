import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditareasubcatPageRoutingModule } from './editareasubcat-routing.module';

import { EditareasubcatPage } from './editareasubcat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditareasubcatPageRoutingModule
  ],
  declarations: [EditareasubcatPage]
})
export class EditareasubcatPageModule {}
