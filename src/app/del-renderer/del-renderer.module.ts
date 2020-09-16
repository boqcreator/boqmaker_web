import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared.module';
import { DelRendererComponent } from './del-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    SharedModule
  ],
  declarations: [DelRendererComponent]
})
export class DelRendererComponentModule {}
