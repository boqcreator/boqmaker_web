import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { FormGroup,FormControl, FormBuilder, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AddsupplierPage } from '../addsupplier/addsupplier.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  supplierList=[]
  supplierID = ""

  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
     private router : Router,
     private afs : AngularFirestore) {
    this.menu.enable(false)
    this.storage.get('suppliercat').then((value)=>{
      this.CatID = value
    })
    this.storage.get('suppliersubcat').then((value)=>{
      this.SubcatID = value
    })
    this.afs.collection<any>(`boq/boq/supplierscat/`).snapshotChanges().subscribe(value =>{
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
   this.storage.set("suppliercat", this.CatID);
   this.storage.remove('suppliersubcat')
   this.storage.remove('suppliersubcatList')
   this.supplierList = [];
    this.afs.collection<any>(`boq/boq/supplierscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
      this.subcatList = [];
      value.forEach(doc =>{
        this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
      })
      
    })
  }

  getsuppliers(){
    this.storage.set("suppliersubcat", this.SubcatID);
    this.storage.set("suppliersubcatList", this.subcatList);
    this.afs.collection<any>(`boq/boq/supplierscat/${this.CatID}/subcat/${this.SubcatID}/suppliers`).snapshotChanges().subscribe(value =>{
      this.supplierList = [];
      value.forEach(doc =>{
        this.supplierList.push({
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
      component: AddsupplierPage,
      });
    
      await modal.present();
    
    
  }

}
