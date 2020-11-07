import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaG2PageRoutingModule } from './area-g2-routing.module';

import { AreaG2Page } from './area-g2.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaG2PageRoutingModule,
    SharedModule
  ],
  declarations: [AreaG2Page]
})
export class AreaG2PageModule {}
