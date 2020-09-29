import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriallibPageRoutingModule } from './materiallib-routing.module';

import { MateriallibPage } from './materiallib.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriallibPageRoutingModule,
    SharedModule
  ],
  declarations: [MateriallibPage]
})
export class MateriallibPageModule {}
