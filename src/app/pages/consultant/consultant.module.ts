import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultantPageRoutingModule } from './consultant-routing.module';

import { ConsultantPage } from './consultant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultantPageRoutingModule
  ],
  declarations: [ConsultantPage]
})
export class ConsultantPageModule {}
