import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprojectionPageRoutingModule } from './addprojection-routing.module';

import { AddprojectionPage } from './addprojection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddprojectionPageRoutingModule
  ],
  declarations: [AddprojectionPage]
})
export class AddprojectionPageModule {}
