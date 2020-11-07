import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Report1DetailsPageRoutingModule } from './report1-details-routing.module';

import { Report1DetailsPage } from './report1-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Report1DetailsPageRoutingModule
  ],
  declarations: [Report1DetailsPage]
})
export class Report1DetailsPageModule {}
