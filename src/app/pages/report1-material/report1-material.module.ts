import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Report1MaterialPageRoutingModule } from './report1-material-routing.module';

import { Report1MaterialPage } from './report1-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Report1MaterialPageRoutingModule
  ],
  declarations: [Report1MaterialPage]
})
export class Report1MaterialPageModule {}
