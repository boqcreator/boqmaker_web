import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddareaGPageRoutingModule } from './addarea-g-routing.module';

import { AddareaGPage } from './addarea-g.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddareaGPageRoutingModule,
    SharedModule
  ],
  declarations: [AddareaGPage]
})
export class AddareaGPageModule {}
