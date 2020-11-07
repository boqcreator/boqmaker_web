import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoqitemgraphPageRoutingModule } from './boqitemgraph-routing.module';

import { BoqitemgraphPage } from './boqitemgraph.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoqitemgraphPageRoutingModule
  ],
  declarations: [BoqitemgraphPage]
})
export class BoqitemgraphPageModule {}
