import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddlabourPage } from '../addlabour/addlabour.page';

@Component({
  selector: 'app-labour',
  templateUrl: './labour.page.html',
  styleUrls: ['./labour.page.scss'],
})
export class LabourPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  labourList=[]
  labourID = ""
  term1
  term2
  term3
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('labourcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('laboursubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/labourscat/`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("labourcat", this.CatID);
    this.storage.remove('laboursubcat')
    this.storage.remove('laboursubcatList')
    this.labourList = [];
     this.afs.collection<any>(`boq/boq/labourscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getlabours(){
     this.storage.set("laboursubcat", this.SubcatID);
     this.storage.set("laboursubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/labourscat/${this.CatID}/subcat/${this.SubcatID}/labours`).snapshotChanges().subscribe(value =>{
       this.labourList = [];
       value.forEach(doc =>{
         this.labourList.push({
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
       component: AddlabourPage,
       });
     
       await modal.present();
     
     
   }

}

