import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// firebase imports, omit what you don't need for your app
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore'
// environment
import { environment } from '../environments/environment';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from './shared/shared.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddContractorPageModule } from './pages/add-contractor/add-contractor.module';
import { AddprojectPageModule } from './pages/addproject/addproject.module';
import { FirebaseService } from './firebase.service';
import { ContractorCatPageModule } from './pages/constractor/contractor-cat/contractor-cat.module';
import { AddareaPageModule } from './pages/area/addarea/addarea.module';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddsupplierPageModule } from './pages/addsupplier/addsupplier.module';
import { AddmaterialPageModule } from './pages/addmaterial/addmaterial.module';
import { Html2canvasServiceService } from './html2canvas-service.service';
import { ReportFinalPricedBillPageModule } from './pages/report-final-priced-bill/report-final-priced-bill.module';
import { AddsupplierLPageModule } from './pages/addsupplier-l/addsupplier-l.module';
import { AddlabourPageModule } from './pages/addlabour/addlabour.module';
import { AddsupplierEPageModule } from './pages/addsupplier-e/addsupplier-e.module';
import { AddequipmentPageModule } from './pages/addequipment/addequipment.module';
import { AddsupplierOPageModule } from './pages/addsupplier-o/addsupplier-o.module';
import { AddotherPageModule } from './pages/addother/addother.module';
import { AddsubcontractorPageModule } from './pages/addsubcontractor/addsubcontractor.module';
import { AddboqitemGPageModule } from './pages/addboqitem-g/addboqitem-g.module';
import { BoqitemlibPageModule } from './pages/boqitemlib/boqitemlib.module';
import { ArealibPageModule } from './pages/arealib/arealib.module';
import { AddmaterialtocostPageModule } from './pages/addmaterialtocost/addmaterialtocost.module';
import { AddlabourtocostPageModule } from './pages/addlabourtocost/addlabourtocost.module';
import { AddequipmenttocostPageModule } from './pages/addequipmenttocost/addequipmenttocost.module';
import { AddsubcontractortocostPageModule } from './pages/addsubcontractortocost/addsubcontractortocost.module';
import { AddothertocostPageModule } from './pages/addothertocost/addothertocost.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AgGridModule.withComponents([]),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AddContractorPageModule,
    AddprojectPageModule,
    ContractorCatPageModule,
    AddareaPageModule,
    AddsupplierPageModule,
    AddmaterialPageModule,
    ReportFinalPricedBillPageModule,
    AddsupplierLPageModule,
    AddlabourPageModule,
    AddsupplierEPageModule,
    AddequipmentPageModule,
    AddsupplierOPageModule,
    AddotherPageModule,
    AddsubcontractorPageModule,
    AddboqitemGPageModule,
    BoqitemlibPageModule,
    ArealibPageModule,
    AddmaterialtocostPageModule,
    AddlabourtocostPageModule,
    AddequipmenttocostPageModule,
    AddsubcontractortocostPageModule,
    AddothertocostPageModule,
    
  ],
  providers: [
    StatusBar,
    UserService,
    Html2canvasServiceService,
    FirebaseService,
    AuthService,
    SplashScreen,
    HTTP,
    HttpClient,
    SharedModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
