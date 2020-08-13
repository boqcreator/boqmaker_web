import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddlabourPageRoutingModule } from './addlabour-routing.module';

import { AddlabourPage } from './addlabour.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlabourPageRoutingModule,
    SharedModule
  ],
  declarations: [AddlabourPage]
})
export class AddlabourPageModule {}
