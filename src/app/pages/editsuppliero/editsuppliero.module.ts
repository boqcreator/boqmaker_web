import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditsupplieroPageRoutingModule } from './editsuppliero-routing.module';

import { EditsupplieroPage } from './editsuppliero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditsupplieroPageRoutingModule
  ],
  declarations: [EditsupplieroPage]
})
export class EditsupplieroPageModule {}
