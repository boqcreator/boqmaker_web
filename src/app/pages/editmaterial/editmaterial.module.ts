import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditmaterialPageRoutingModule } from './editmaterial-routing.module';

import { EditmaterialPage } from './editmaterial.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditmaterialPageRoutingModule,
    SharedModule
  ],
  declarations: [EditmaterialPage]
})
export class EditmaterialPageModule {}
