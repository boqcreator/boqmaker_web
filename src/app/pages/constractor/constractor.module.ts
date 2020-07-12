import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConstractorPageRoutingModule } from './constractor-routing.module';

import { ConstractorPage } from './constractor.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstractorPageRoutingModule,
    SharedModule
  ],
  declarations: [ConstractorPage]
})
export class ConstractorPageModule {}
