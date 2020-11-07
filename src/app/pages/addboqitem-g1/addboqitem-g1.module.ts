import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddboqitemG1PageRoutingModule } from './addboqitem-g1-routing.module';

import { AddboqitemG1Page } from './addboqitem-g1.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddboqitemG1PageRoutingModule,
    SharedModule
  ],
  declarations: [AddboqitemG1Page]
})
export class AddboqitemG1PageModule {}
