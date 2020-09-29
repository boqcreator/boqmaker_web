import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddlabourGPageRoutingModule } from './addlabour-g-routing.module';

import { AddlabourGPage } from './addlabour-g.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlabourGPageRoutingModule
  ],
  declarations: [AddlabourGPage]
})
export class AddlabourGPageModule {}
