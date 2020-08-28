import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { element } from 'protractor';

@Component({
  selector: 'app-addmaterialtocost',
  templateUrl: './addmaterialtocost.page.html',
  styleUrls: ['./addmaterialtocost.page.scss'],
})
export class AddmaterialtocostPage implements OnInit {
  McatList=[];
  MsubcatList= [];
  materialList = [];

  MCatID;
  MSubcatID;
  materialID;

  material= [];
  materialtotal = "0";
  Addedmaterial = [];

  myProjectID;
  itemID;

  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    private menu : MenuController,
    public alertController: AlertController) {
      this.menu.enable(false)
      this.getmaterialCat()
     }

  ngOnInit() {
  }


 getmaterialCat(){
  this.storage.get('materialcat').then((value)=>{
    if(value !== null){
      this.MCatID = value
      this.getMsubcat()
    }
  })
  this.storage.get('materialsubcat').then((value)=>{
   if(value !== null){
    this.MSubcatID = value
    this.getmaterials()
   } 
  })
  this.afs.collection<any>(`boq/boq/materialscat/`).snapshotChanges().subscribe(value =>{
   value.forEach(doc =>{
     this.McatList.push({
       name : doc.payload.doc.data().name,
       id : doc.payload.doc.id
     })
   })
  })
 }

 getMsubcat(){
  this.storage.set("materialcat", this.MCatID);
  this.materialList = [];
   this.afs.collection<any>(`boq/boq/materialscat/${this.MCatID}/subcat`).snapshotChanges().subscribe(value =>{
     this.MsubcatList = [];
     value.forEach(doc =>{
       this.MsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
     })
     
   })
 }

 getmaterials(){
   this.storage.set("materialsubcat", this.MSubcatID);
   this.storage.set("materialsubcatList", this.MsubcatList);
   this.afs.collection<any>(`boq/boq/materialscat/${this.MCatID}/subcat/${this.MSubcatID}/materials`).snapshotChanges().subscribe(value =>{
     this.materialList = [];
     value.forEach(doc =>{
       this.materialList.push({
       name : doc.payload.doc.data().name, 
       id : doc.payload.doc.id,
       catid: doc.payload.doc.data().catid,
       createdon: doc.payload.doc.data().createdon,
       des: doc.payload.doc.data().des,
       price: doc.payload.doc.data().price,
       price1: doc.payload.doc.data().price1,
       price2 : doc.payload.doc.data().price2,
       subcatid : doc.payload.doc.data().subcatid,
       supplier : doc.payload.doc.data().supplier,
       unit : doc.payload.doc.data().unit,
       unit1 : doc.payload.doc.data().unit1,
       unit2 : doc.payload.doc.data().unit2

     })
     })
     
   })

 }

 pushtomaterial(){
  this.material.forEach(ele =>{
   var index = this.Addedmaterial.findIndex(x => x.id == ele.id)
   if(index === -1){
     ele.qty = 1
     this.Addedmaterial.push(ele)
   }
  })

}
Mdelitem(item){
  var index = this.Addedmaterial.findIndex(x => x.id == item.id)
  this.Addedmaterial.splice(index,1)
  this.calculate()
}

SelectallMaterial(){
  if(this.materialList.length > 0){
    this.material = this.materialList
    this.materialList.forEach(ele =>{
      var index = this.Addedmaterial.findIndex(x => x.id == ele.id)
      if(index === -1){
        ele.qty = 1
        this.Addedmaterial.push(ele)
      }
     })
  }
}

RemoveallMaterial(){
  if(this.materialList.length > 0){
    this.material = [];
    this.materialList.forEach(ele =>{
      var index = this.Addedmaterial.findIndex(x => x.id == ele.id)
      if(index !== -1){
        this.Addedmaterial.splice(index,1)
      }
     })
  }
}

 
 setmaterial(){
   this.material = this.materialList.find(x => x.id == this.materialID)
 }


 calculate(){
  this.materialtotal = "0";
  if(this.Addedmaterial.length > 0){
   this.Addedmaterial.forEach(element => {
     if(element.qty){
      this.materialtotal = (parseFloat(this.materialtotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
     }
   });
  }
}

async addmaterial(){

  const loading = await this.loadingController.create({
    message: 'Adding...',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.Addedmaterial.forEach((element, index, array) =>{
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).get().subscribe(value =>{
     var checker = value.data().material.find(x => x.id == element.id)
     if(!checker){
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).update({
        material : firebase.firestore.FieldValue.arrayUnion({
          name: element.name,
          id : element.id,
          qty : 0,
          unit : element.unit,
          rate : element.price,
          etotal : 0,
          aqty : element.qty,
          atotal : (element.qty*element.price),
        }),
        MatotalPrice : value.data().MatotalPrice+(element.qty*element.price),
        updatedon : new Date().toISOString()
      })
     }else{
       alert(`${element.name} already exist!`)
     }
    })
    if (index === array.length -1){
      loading.dismiss();
      this.modal.dismiss()
    };
  })

}



}
