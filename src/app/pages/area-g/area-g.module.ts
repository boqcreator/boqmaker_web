import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaGPageRoutingModule } from './area-g-routing.module';

import { AreaGPage } from './area-g.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaGPageRoutingModule,
    SharedModule
  ],
  declarations: [AreaGPage]
})
export class AreaGPageModule {}
