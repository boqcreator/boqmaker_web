import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalqtytablePageRoutingModule } from './finalqtytable-routing.module';

import { FinalqtytablePage } from './finalqtytable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalqtytablePageRoutingModule
  ],
  declarations: [FinalqtytablePage]
})
export class FinalqtytablePageModule {}
