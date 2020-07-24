import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddmaterialPage } from '../addmaterial/addmaterial.page';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  materialList=[]
  materialID = ""
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('materialcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('materialsubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/materialscat/`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("materialcat", this.CatID);
    this.storage.remove('materialsubcat')
    this.storage.remove('materialsubcatList')
    this.materialList = [];
     this.afs.collection<any>(`boq/boq/materialscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getmaterials(){
     this.storage.set("materialsubcat", this.SubcatID);
     this.storage.set("materialsubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/materialscat/${this.CatID}/subcat/${this.SubcatID}/materials`).snapshotChanges().subscribe(value =>{
       this.materialList = [];
       value.forEach(doc =>{
         this.materialList.push({
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
       component: AddmaterialPage,
       });
     
       await modal.present();
     
     
   }

}
