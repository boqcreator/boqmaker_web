import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Report1LabourPageRoutingModule } from './report1-labour-routing.module';

import { Report1LabourPage } from './report1-labour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Report1LabourPageRoutingModule
  ],
  declarations: [Report1LabourPage]
})
export class Report1LabourPageModule {}
