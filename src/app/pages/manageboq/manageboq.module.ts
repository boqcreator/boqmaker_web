import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageboqPageRoutingModule } from './manageboq-routing.module';

import { ManageboqPage } from './manageboq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageboqPageRoutingModule
  ],
  declarations: [ManageboqPage]
})
export class ManageboqPageModule {}
