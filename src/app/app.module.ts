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
import { EditareasPageModule } from './pages/editareas/editareas.module';
import { EdititemsPageModule } from './pages/edititems/edititems.module';
import { AddboqitemG1PageModule } from './pages/addboqitem-g1/addboqitem-g1.module';
import { AddboqitemG2PageModule } from './pages/addboqitem-g2/addboqitem-g2.module';
import { AddboqitemG3PageModule } from './pages/addboqitem-g3/addboqitem-g3.module';
import { AddboqitemG4PageModule } from './pages/addboqitem-g4/addboqitem-g4.module';
import { AddboqitemG5PageModule } from './pages/addboqitem-g5/addboqitem-g5.module';
import { AddareaG1PageModule } from './pages/addarea-g1/addarea-g1.module';
import { AddareaG2PageModule } from './pages/addarea-g2/addarea-g2.module';
import { AddareaG3PageModule } from './pages/addarea-g3/addarea-g3.module';
import { AddareaG4PageModule } from './pages/addarea-g4/addarea-g4.module';
import { AddareaG5PageModule } from './pages/addarea-g5/addarea-g5.module';
import { AddprojtypePageModule } from './pages/addprojtype/addprojtype.module';
import { AddopeningPageModule } from './pages/addopening/addopening.module';
import { EditareacatPageModule } from './pages/editareacat/editareacat.module';
import { EditareasubcatPageModule } from './pages/editareasubcat/editareasubcat.module';
import { EditareasubsubcatPageModule } from './pages/editareasubsubcat/editareasubsubcat.module';
import { EditareaPageModule } from './pages/editarea/editarea.module';
import { EditvaritiondetailsPageModule } from './pages/editvaritiondetails/editvaritiondetails.module';
import { AddprojectionPageModule } from './pages/addprojection/addprojection.module';
import { EditprojectionPageModule } from './pages/editprojection/editprojection.module';
import { FinalqtytablePageModule } from './pages/finalqtytable/finalqtytable.module';
import { AddmaterialGPageModule } from './pages/addmaterial-g/addmaterial-g.module';
import { AddlabourGPageModule } from './pages/addlabour-g/addlabour-g.module';
import { AddequipmentGPageModule } from './pages/addequipment-g/addequipment-g.module';
import { MateriallibPageModule } from './pages/materiallib/materiallib.module';
import { Report1DetailsPageModule } from './pages/report1-details/report1-details.module';
import { Report1MaterialPageModule } from './pages/report1-material/report1-material.module';
import { Report1LabourPageModule } from './pages/report1-labour/report1-labour.module';
import { Report1EquipmentPageModule } from './pages/report1-equipment/report1-equipment.module';
import { Report1OtherPageModule } from './pages/report1-other/report1-other.module';
import { CalculatorPageModule } from './pages/calculator/calculator.module';
import { CostgraphPageModule } from './pages/costgraph/costgraph.module';
import { ManageboqPageModule } from './pages/manageboq/manageboq.module';
import { EditmaterialPageModule } from './pages/editmaterial/editmaterial.module';
import { TypespicPageModule } from './pages/typespic/typespic.module';
import { EditsuppliermatPageModule } from './pages/editsuppliermat/editsuppliermat.module';


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
    EditareasPageModule,
    EdititemsPageModule,
    AddboqitemG1PageModule,
    AddboqitemG2PageModule,
    AddboqitemG3PageModule,
    AddboqitemG4PageModule,
    AddboqitemG5PageModule,
    AddareaG1PageModule,
    AddareaG2PageModule,
    AddareaG3PageModule,
    AddareaG4PageModule,
    AddareaG5PageModule,
    AddprojtypePageModule,
    AddopeningPageModule,
    EditareacatPageModule,
    EditareasubcatPageModule,
    EditareasubsubcatPageModule,
    EditareaPageModule,
    EditvaritiondetailsPageModule,
    AddprojectionPageModule,
    EditprojectionPageModule,
    FinalqtytablePageModule,
    AddmaterialGPageModule,
    AddlabourGPageModule,
    AddequipmentGPageModule,
    MateriallibPageModule,
    Report1DetailsPageModule,
    Report1MaterialPageModule,
    Report1LabourPageModule,
    Report1EquipmentPageModule,
    Report1OtherPageModule,
    CalculatorPageModule,
    CostgraphPageModule,
    ManageboqPageModule,
    EditmaterialPageModule,
    TypespicPageModule,
    EditsuppliermatPageModule
    
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
