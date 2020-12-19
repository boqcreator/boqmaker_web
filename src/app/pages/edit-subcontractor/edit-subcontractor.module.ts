import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSubcontractorPageRoutingModule } from './edit-subcontractor-routing.module';

import { EditSubcontractorPage } from './edit-subcontractor.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSubcontractorPageRoutingModule,
    SharedModule
  ],
  declarations: [EditSubcontractorPage]
})
export class EditSubcontractorPageModule {}
