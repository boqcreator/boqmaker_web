import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprojectPageRoutingModule } from './addproject-routing.module';

import { AddprojectPage } from './addproject.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddprojectPageRoutingModule,
    SharedModule
  ],
  declarations: [AddprojectPage]
})
export class AddprojectPageModule {}
