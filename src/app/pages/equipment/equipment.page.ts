import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddequipmentPage } from '../addequipment/addequipment.page';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss'],
})
export class EquipmentPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  equipmentList=[]
  equipmentID = ""
  term1
  term2
  term3
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('equipmentcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('equipmentsubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/equipmentscat/`).snapshotChanges().subscribe(value =>{
        this.catList = []
        value.forEach(doc =>{
          this.catList.push({
            name : doc.payload.doc.data().name,
            id : doc.payload.doc.id
          })
        })
       })

      }

  ngOnInit() {
  }


  getsubcat(){
    this.storage.set("equipmentcat", this.CatID);
    this.storage.remove('equipmentsubcat')
    this.storage.remove('equipmentsubcatList')
    this.equipmentList = [];
     this.afs.collection<any>(`boq/boq/equipmentscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getequipments(){
     this.storage.set("equipmentsubcat", this.SubcatID);
     this.storage.set("equipmentsubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/equipmentscat/${this.CatID}/subcat/${this.SubcatID}/equipments`).snapshotChanges().subscribe(value =>{
       this.equipmentList = [];
       value.forEach(doc =>{
         this.equipmentList.push({
         name : doc.payload.doc.data().name, 
         id : doc.payload.doc.id,
         no: doc.payload.doc.data().no,
         tele: doc.payload.doc.data().tele,
         fax: doc.payload.doc.data().fax,
         email: doc.payload.doc.data().email,
         website: doc.payload.doc.data().website,
         des: doc.payload.doc.data().des,
 
       })
       })
       
     })
 
   }
 
   edit(item){
     
   }
 
 
 
   async addnew(){
       const modal = await this.modalController.create({
       component: AddequipmentPage,
       });
     
       await modal.present();
     
     
   }

}

