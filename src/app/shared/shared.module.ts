import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AgmCoreModule } from '@agm/core';
import { NgxCurrencyModule } from "ngx-currency";
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../renderer/button-renderer.component';
import { TwobuttonRendererComponent } from '../renderer/twobutton-renderer.component';
import { DelRendererComponent } from '../del-renderer/del-renderer.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgGridModule.withComponents([ButtonRendererComponent,TwobuttonRendererComponent,DelRendererComponent]),
    Ng2SearchPipeModule,
    NgxCurrencyModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNFmZlFl1hxTTTYWaau-GEDdiwVrk48j8',
      libraries: ['places']
    })
  ],
  exports:[Ng2SearchPipeModule , AgmCoreModule,NgxCurrencyModule, AgGridModule]
})
export class SharedModule { }
