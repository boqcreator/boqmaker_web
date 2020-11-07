import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditboqitemPageRoutingModule } from './editboqitem-routing.module';

import { EditboqitemPage } from './editboqitem.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditboqitemPageRoutingModule,
    SharedModule
  ],
  declarations: [EditboqitemPage]
})
export class EditboqitemPageModule {}
