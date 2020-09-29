import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialGPageRoutingModule } from './material-g-routing.module';

import { MaterialGPage } from './material-g.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialGPageRoutingModule,
    SharedModule
  ],
  declarations: [MaterialGPage]
})
export class MaterialGPageModule {}
