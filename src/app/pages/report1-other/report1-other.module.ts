import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Report1OtherPageRoutingModule } from './report1-other-routing.module';

import { Report1OtherPage } from './report1-other.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Report1OtherPageRoutingModule
  ],
  declarations: [Report1OtherPage]
})
export class Report1OtherPageModule {}
