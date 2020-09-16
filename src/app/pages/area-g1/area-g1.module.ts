import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaG1PageRoutingModule } from './area-g1-routing.module';

import { AreaG1Page } from './area-g1.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaG1PageRoutingModule,
    SharedModule
  ],
  declarations: [AreaG1Page]
})
export class AreaG1PageModule {}
