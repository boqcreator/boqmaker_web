import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOtherPageRoutingModule } from './edit-other-routing.module';

import { EditOtherPage } from './edit-other.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOtherPageRoutingModule,
    SharedModule
  ],
  declarations: [EditOtherPage]
})
export class EditOtherPageModule {}
