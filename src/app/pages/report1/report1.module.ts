import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Report1PageRoutingModule } from './report1-routing.module';

import { Report1Page } from './report1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Report1PageRoutingModule
  ],
  declarations: [Report1Page]
})
export class Report1PageModule {}
