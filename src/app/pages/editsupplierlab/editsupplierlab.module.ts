import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditsupplierlabPageRoutingModule } from './editsupplierlab-routing.module';

import { EditsupplierlabPage } from './editsupplierlab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditsupplierlabPageRoutingModule
  ],
  declarations: [EditsupplierlabPage]
})
export class EditsupplierlabPageModule {}
