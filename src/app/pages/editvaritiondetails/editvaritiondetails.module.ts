import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditvaritiondetailsPageRoutingModule } from './editvaritiondetails-routing.module';

import { EditvaritiondetailsPage } from './editvaritiondetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditvaritiondetailsPageRoutingModule
  ],
  declarations: [EditvaritiondetailsPage]
})
export class EditvaritiondetailsPageModule {}
