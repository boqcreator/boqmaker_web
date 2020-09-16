import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditopeningPageRoutingModule } from './editopening-routing.module';

import { EditopeningPage } from './editopening.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditopeningPageRoutingModule
  ],
  declarations: [EditopeningPage]
})
export class EditopeningPageModule {}
