import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpeningPageRoutingModule } from './opening-routing.module';

import { OpeningPage } from './opening.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpeningPageRoutingModule,
    SharedModule
  ],
  declarations: [OpeningPage]
})
export class OpeningPageModule {}
