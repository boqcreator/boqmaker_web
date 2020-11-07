import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaG4PageRoutingModule } from './area-g4-routing.module';

import { AreaG4Page } from './area-g4.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaG4PageRoutingModule,
    SharedModule
  ],
  declarations: [AreaG4Page]
})
export class AreaG4PageModule {}
