import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddopeningPageRoutingModule } from './addopening-routing.module';

import { AddopeningPage } from './addopening.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddopeningPageRoutingModule
  ],
  declarations: [AddopeningPage]
})
export class AddopeningPageModule {}
