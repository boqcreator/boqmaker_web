import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditprojectionPageRoutingModule } from './editprojection-routing.module';

import { EditprojectionPage } from './editprojection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprojectionPageRoutingModule
  ],
  declarations: [EditprojectionPage]
})
export class EditprojectionPageModule {}
