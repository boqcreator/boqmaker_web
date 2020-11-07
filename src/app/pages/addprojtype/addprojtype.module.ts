import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprojtypePageRoutingModule } from './addprojtype-routing.module';

import { AddprojtypePage } from './addprojtype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddprojtypePageRoutingModule
  ],
  declarations: [AddprojtypePage]
})
export class AddprojtypePageModule {}
