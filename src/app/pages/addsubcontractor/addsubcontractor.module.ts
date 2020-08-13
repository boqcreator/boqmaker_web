import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsubcontractorPageRoutingModule } from './addsubcontractor-routing.module';

import { AddsubcontractorPage } from './addsubcontractor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsubcontractorPageRoutingModule
  ],
  declarations: [AddsubcontractorPage]
})
export class AddsubcontractorPageModule {}
