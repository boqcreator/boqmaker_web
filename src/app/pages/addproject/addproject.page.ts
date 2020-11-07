import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, AlertController, NavController, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from 'src/app/firebase.service';
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import *  as firebase from 'firebase'
import { } from 'googlemaps';
declare var google: any;

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.page.html',
  styleUrls: ['./addproject.page.scss'],
})
export class AddprojectPage implements OnInit {
  contList = [];
  cat=[];
  term;
  id
  name
  no = ""
  client = ""
  con = ""
  access
  start = ""
  end = ""
  cont = ""
  catogery;
  des = ""
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  selectedCont = [];
  Estimatedprice =0
  plotarea =0
  buildup =0
  caddress =""
  cemail= "";
  cphoneno = ""

  F1 = "";
  F2 = "";
  F3 = "";
  F4 = "";
  F5 = "";
  F6 = "";
  F7 = "";
  F8 = "";
  F9 = "";
  F10 = "";
  typeList;
  selectedType;
  code = "";
  country = "Bahrain";
  currency = "BHD";
  @ViewChild('search')
  public searchElementRef: ElementRef;

  private geoCoder;
  constructor(private afs : AngularFirestore,
    private http: HttpClient,
    public loadingController: LoadingController,
    private modal : ModalController,
    private navCtrl : NavController,
    private fs : FirebaseService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private menu : MenuController,
    public alertController: AlertController) {
      this.menu.enable(false)
     this.id =  this.afs.createId()

     this.typeList = this.afs.collection(`boq/boq/projecttypes`).valueChanges()

    this.fs.read_contractors().subscribe(value =>{
      value.forEach(doc =>{
        this.contList.push({id: doc.payload.doc.ref.id , name : doc.payload.doc.data().name , email: doc.payload.doc.data().email})
      })
    })
   }

  ngOnInit() {

      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
      
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          
        });
        autocomplete.setComponentRestrictions({
          'country' : [`bh`]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
      
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 17;
            this.getAddress(this.latitude, this.longitude);
          });
        });
      });
     
      
  }

     // Get Current Location Coordinates
     private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        });
      }
    }

      
    getAddress(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
   
      });
    }

    markerDragEnd(event: MouseEvent) {
      console.log(event);
      this.latitude = event.coords.lat;
      this.longitude = event.coords.lng;
      this.getAddress(this.latitude, this.longitude);
    }
    


  getCat(item){
    this.cat = [];
   this.fs.read_contractorsCat(item.id).subscribe(value =>{
     this.cat = value
    })
  }

  async addProj(){
    if(this.id && this.name && this.access ){

        const loading = await this.loadingController.create({
          message: 'Adding...',
          duration: 20000
        });
        await loading.present();

        this.fs.create_project({
          id : this.id,
          name : this.name,
          code : this.code,
          type : this.selectedType.name,
          no : this.no,
          con : this.con,
          access : this.access,
          start : this.start,
          end : this.end,
          des : this.des,
          country : this.country,
          currency : this.currency,
          location: new firebase.firestore.GeoPoint(this.latitude , this.longitude),
          contname : this.catogery.data().name,
          contEmail : this.catogery.data().email,
          contaddress : this.catogery.data().address,
          conttel : this.catogery.data().tel,
          contmob : this.catogery.data().mob,
          clientname : this.client,
          clientaddress : this.caddress,
          clientemail : this.cemail,
          clientohoneno : this.cphoneno,
          F1 :  this.F1 ,
          F2 :  this.F2 ,
          F3 :  this.F3 ,
          F4 :  this.F4 ,
          F5 :  this.F5 ,
          F6 :  this.F6 ,
          F7 :  this.F7 ,
          F8 :  this.F8 ,
          F9 :  this.F9 ,
          F10 :  this.F10 ,

        }) .then(()=>{
          loading.dismiss();
          this.navCtrl.back();
        })

        const alert = await this.alertController.create({
          header: 'Added!',
          message: 'Successfully Added',
          buttons: [
            {
              text: 'Okay',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Okay: blah');
              }
            }
          ]
        });
    
        await alert.present();


      }else{
        alert("Please fill all the fields")
      }
  }

  
}
