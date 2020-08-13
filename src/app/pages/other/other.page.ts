import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddotherPage } from '../addother/addother.page';

@Component({
  selector: 'app-other',
  templateUrl: './other.page.html',
  styleUrls: ['./other.page.scss'],
})
export class OtherPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  otherList=[]
  otherID = ""
  term1
  term2
  term3
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('othercat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('othersubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/otherscat/`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("othercat", this.CatID);
    this.storage.remove('othersubcat')
    this.storage.remove('othersubcatList')
    this.otherList = [];
     this.afs.collection<any>(`boq/boq/otherscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getothers(){
     this.storage.set("othersubcat", this.SubcatID);
     this.storage.set("othersubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/otherscat/${this.CatID}/subcat/${this.SubcatID}/others`).snapshotChanges().subscribe(value =>{
       this.otherList = [];
       value.forEach(doc =>{
         this.otherList.push({
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
       component: AddotherPage,
       });
     
       await modal.present();
     
     
   }

}

