import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaG5PageRoutingModule } from './area-g5-routing.module';

import { AreaG5Page } from './area-g5.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaG5PageRoutingModule,
    SharedModule
  ],
  declarations: [AreaG5Page]
})
export class AreaG5PageModule {}
