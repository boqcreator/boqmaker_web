import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';
import { TwobuttonRendererComponent } from './twobutton-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    SharedModule
  ],
  declarations: [TwobuttonRendererComponent]
})
export class TwobuttonRendererComponentModule {}
