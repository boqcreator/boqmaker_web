import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLabourPageRoutingModule } from './edit-labour-routing.module';

import { EditLabourPage } from './edit-labour.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLabourPageRoutingModule,
    SharedModule
  ],
  declarations: [EditLabourPage]
})
export class EditLabourPageModule {}
