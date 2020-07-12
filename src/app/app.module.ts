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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
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
    
  ],
  providers: [
    StatusBar,
    UserService,
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
