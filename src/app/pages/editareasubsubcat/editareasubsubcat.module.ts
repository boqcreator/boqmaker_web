import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditareasubsubcatPageRoutingModule } from './editareasubsubcat-routing.module';

import { EditareasubsubcatPage } from './editareasubsubcat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditareasubsubcatPageRoutingModule
  ],
  declarations: [EditareasubsubcatPage]
})
export class EditareasubsubcatPageModule {}
