import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditsuppliermatPageRoutingModule } from './editsuppliermat-routing.module';

import { EditsuppliermatPage } from './editsuppliermat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditsuppliermatPageRoutingModule
  ],
  declarations: [EditsuppliermatPage]
})
export class EditsuppliermatPageModule {}
