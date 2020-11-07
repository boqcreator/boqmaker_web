import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjDetailsPageRoutingModule } from './proj-details-routing.module';

import { ProjDetailsPage } from './proj-details.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjDetailsPageRoutingModule,
    ColorPickerModule,
    SharedModule
  ],
  declarations: [ProjDetailsPage]
})
export class ProjDetailsPageModule {}
