import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostgraphPageRoutingModule } from './costgraph-routing.module';

import { CostgraphPage } from './costgraph.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostgraphPageRoutingModule
  ],
  declarations: [CostgraphPage]
})
export class CostgraphPageModule {}
