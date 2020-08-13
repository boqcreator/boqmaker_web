import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddsubcontractorPage } from '../addsubcontractor/addsubcontractor.page';

@Component({
  selector: 'app-subcontractor',
  templateUrl: './subcontractor.page.html',
  styleUrls: ['./subcontractor.page.scss'],
})
export class SubcontractorPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  subcontractorList=[]
  subcontractorID = ""
  term1
  term2
  term3
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('subcontractorcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('subcontractorsubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/subcontractorscat/`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("subcontractorcat", this.CatID);
    this.storage.remove('subcontractorsubcat')
    this.storage.remove('subcontractorsubcatList')
    this.subcontractorList = [];
     this.afs.collection<any>(`boq/boq/subcontractorscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getsubcontractors(){
     this.storage.set("subcontractorsubcat", this.SubcatID);
     this.storage.set("subcontractorsubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/subcontractorscat/${this.CatID}/subcat/${this.SubcatID}/subcontractors`).snapshotChanges().subscribe(value =>{
       this.subcontractorList = [];
       value.forEach(doc =>{
         this.subcontractorList.push({
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
       component: AddsubcontractorPage,
       });
     
       await modal.present();
     
     
   }

}
