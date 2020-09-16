import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddboqitemG5PageRoutingModule } from './addboqitem-g5-routing.module';

import { AddboqitemG5Page } from './addboqitem-g5.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddboqitemG5PageRoutingModule,
    SharedModule
  ],
  declarations: [AddboqitemG5Page]
})
export class AddboqitemG5PageModule {}
