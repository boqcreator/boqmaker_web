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
  no
  client
  con
  access
  start
  end = ""
  cont = ""
  catogery;
  des = ""
  conemail = "";
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

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
    this.fs.read_projects().subscribe(snap => {
      this.id = snap.length+1 // will return the collection size
   });

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
    let index = this.contList.findIndex((e) => e.id === item.id);
    this.conemail = this.contList[index].email
    this.cat = [];
   this.fs.read_contractorsCat(item.id).subscribe(value =>{
     this.cat = value
    })
  }

  async addProj(){
    if(this.id && this.name && this.no && this.client &&  this.con && this.access && this.start  &&  this.des){

        const loading = await this.loadingController.create({
          message: 'Adding...',
          duration: 20000
        });
        await loading.present();

        this.fs.create_project({
          id : this.id,
          name : this.name,
          no : this.no,
          client : this.client,
          con : this.con,
          access : this.access,
          start : this.start,
          end : this.end,
          des : this.des,
          location: new firebase.firestore.GeoPoint(this.latitude , this.longitude),
          contEmail : this.conemail
        }).then((value)=>{
          if(this.cont && this.catogery){
            this.fs.update_project(value.id ,{contractor : this.cont , cat : this.catogery.data()})
          }
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
