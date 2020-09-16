import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditareasPageRoutingModule } from './editareas-routing.module';

import { EditareasPage } from './editareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditareasPageRoutingModule
  ],
  declarations: [EditareasPage]
})
export class EditareasPageModule {}
