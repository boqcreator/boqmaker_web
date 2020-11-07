import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditsuppliereqPageRoutingModule } from './editsuppliereq-routing.module';

import { EditsuppliereqPage } from './editsuppliereq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditsuppliereqPageRoutingModule
  ],
  declarations: [EditsuppliereqPage]
})
export class EditsuppliereqPageModule {}
