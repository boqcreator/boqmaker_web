import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypespicPageRoutingModule } from './typespic-routing.module';

import { TypespicPage } from './typespic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypespicPageRoutingModule
  ],
  declarations: [TypespicPage]
})
export class TypespicPageModule {}
