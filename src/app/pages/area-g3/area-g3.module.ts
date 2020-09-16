import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaG3PageRoutingModule } from './area-g3-routing.module';

import { AreaG3Page } from './area-g3.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaG3PageRoutingModule,
    SharedModule
  ],
  declarations: [AreaG3Page]
})
export class AreaG3PageModule {}
