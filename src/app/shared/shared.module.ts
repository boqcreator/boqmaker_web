import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNFmZlFl1hxTTTYWaau-GEDdiwVrk48j8',
      libraries: ['places']
    })
  ],
  exports:[Ng2SearchPipeModule , AgmCoreModule]
})
export class SharedModule { }
