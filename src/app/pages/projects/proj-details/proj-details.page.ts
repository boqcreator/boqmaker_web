import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase'

@Component({
  selector: 'app-proj-details',
  templateUrl: './proj-details.page.html',
  styleUrls: ['./proj-details.page.scss'],
})
export class ProjDetailsPage implements OnInit {
  segment = "project"
  proejctDetails;
  pid;
  name;
  id;
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

  PBdata = [];
  SelectedBuilding;

  bcolor = "#0000FF"
  bname;
  bdes

  fname;
  fcolor = "black";

  constructor(private menu : MenuController,private route: ActivatedRoute,
    private afs :AngularFirestore,
    public loadingController: LoadingController) {
    this.menu.enable(false)
   this.pid = this.route.snapshot.paramMap.get('id')
   this.afs.doc<any>(`boq/boq/projects/${this.pid}`).snapshotChanges().subscribe(value =>{
     console.log(value.payload.data())
     this.name = value.payload.data().name
     this.id  = value.payload.data().id
     this.no = value.payload.data().no
     this.client = value.payload.data().client
     this.con = value.payload.data().con
     this.start = value.payload.data().start
     this.end = value.payload.data().end

     this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings`).snapshotChanges().subscribe(pbdata =>{
       if(pbdata.length > 0){
        this.PBdata = []
        pbdata.forEach(doc=>{
          this.PBdata.push(
            {name : doc.payload.doc.data().name ,
               expanded: doc.payload.doc.data().expanded ,
                floors : doc.payload.doc.data().floors,
               color : doc.payload.doc.data().color,
              id : doc.payload.doc.id })
        })
       
       }
       
     })

   })

   }

// ADDING BUILDING
   async addBuilding(){
    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 20000
    });
    await loading.present();
     this.afs.collection(`boq/boq/projects/${this.pid}/buildings`).add({
       name : this.bname,
       color : this.bcolor,
       des : this.bdes,
       floors : []
     }).then(()=>{
       loading.dismiss();
       this.bdes = ""
       this.bname = ""
       this.bcolor = "blue"
       alert("Added Successfully!")
     })
   }

// ADDING FLOOR
   async addFloor(){
     console.log({name : this.fname , color : this.fcolor})
    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 20000
    });
    await loading.present();
     this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.SelectedBuilding.id}`).update({
       floors : firebase.firestore.FieldValue.arrayUnion({name : this.fname , color : this.fcolor})
     }).then(()=>{
       loading.dismiss().then(()=>{
        alert("Added Successfully!")
       })
       this.fname = ""
       this.fcolor = ""
       
     })
   }

  ngOnInit() {
  }


  toaddFloor(item){
    this.SelectedBuilding = item;
    this.segment="floor"

  }
}
