import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddboqitemG3PageRoutingModule } from './addboqitem-g3-routing.module';

import { AddboqitemG3Page } from './addboqitem-g3.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddboqitemG3PageRoutingModule,
    SharedModule
  ],
  declarations: [AddboqitemG3Page]
})
export class AddboqitemG3PageModule {}
