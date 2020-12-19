import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcontractorPageRoutingModule } from './editcontractor-routing.module';

import { EditcontractorPage } from './editcontractor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcontractorPageRoutingModule
  ],
  declarations: [EditcontractorPage]
})
export class EditcontractorPageModule {}
