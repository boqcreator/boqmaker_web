import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcontractorPageRoutingModule } from './subcontractor-routing.module';

import { SubcontractorPage } from './subcontractor.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcontractorPageRoutingModule,
    SharedModule
  ],
  declarations: [SubcontractorPage]
})
export class SubcontractorPageModule {}
