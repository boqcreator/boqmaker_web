import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdititemsPageRoutingModule } from './edititems-routing.module';

import { EdititemsPage } from './edititems.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdititemsPageRoutingModule,
    SharedModule
  ],
  declarations: [EdititemsPage]
})
export class EdititemsPageModule {}
