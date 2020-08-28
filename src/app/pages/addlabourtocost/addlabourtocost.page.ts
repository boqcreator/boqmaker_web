import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addlabourtocost',
  templateUrl: './addlabourtocost.page.html',
  styleUrls: ['./addlabourtocost.page.scss'],
})
export class AddlabourtocostPage implements OnInit {
  myProjectID;
  itemID;
  LcatList=[];
  LsubcatList= [];
  labourList = [];

  LCatID;
  LSubcatID;
  labourID;

  labour= [];
  labourtotal = "0";
  Addedlabour = [];

  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    private menu : MenuController,
    public alertController: AlertController) {
      this.menu.enable(false)
      this.getlabourCat()
     }

  ngOnInit() {
  }

    //**************************   LABOUR    **************************
  
 getlabourCat(){
  this.storage.get('labourcat').then((value)=>{
    if(value !== null){
      this.LCatID = value
      this.getLsubcat()
    }
  })
  this.storage.get('laboursubcat').then((value)=>{
   if(value !== null){
    this.LSubcatID = value
    this.getlabours()
   } 
  })
  this.afs.collection<any>(`boq/boq/labourscat/`).snapshotChanges().subscribe(value =>{
   value.forEach(doc =>{
     this.LcatList.push({
       name : doc.payload.doc.data().name,
       id : doc.payload.doc.id
     })
   })
  })
 }

 getLsubcat(){
  this.storage.set("labourcat", this.LCatID);
  this.labourList = [];
   this.afs.collection<any>(`boq/boq/labourscat/${this.LCatID}/subcat`).snapshotChanges().subscribe(value =>{
     this.LsubcatList = [];
     value.forEach(doc =>{
       this.LsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
     })
     
   })
 }

 getlabours(){
   this.storage.set("laboursubcat", this.LSubcatID);
   this.storage.set("laboursubcatList", this.LsubcatList);
   this.afs.collection<any>(`boq/boq/labourscat/${this.LCatID}/subcat/${this.LSubcatID}/labours`).snapshotChanges().subscribe(value =>{
     this.labourList = [];
     value.forEach(doc =>{
       this.labourList.push({
       name : doc.payload.doc.data().name, 
       id : doc.payload.doc.id,
       catid: doc.payload.doc.data().catid,
       createdon: doc.payload.doc.data().createdon,
       des: doc.payload.doc.data().des,
       price: doc.payload.doc.data().price,
       subcatid : doc.payload.doc.data().subcatid,
       supplier : doc.payload.doc.data().supplier,
       unit : doc.payload.doc.data().unit,
     })
     })
     
   })

 }

 pushtolabour(){
  this.labour.forEach(ele =>{
   var index = this.Addedlabour.findIndex(x => x.id == ele.id)
   ele.Per = 100
   ele.qty = 1
   ele.note = ""
   if(index === -1){
     this.Addedlabour.push(ele)
   }
  }) 
}
Ldelitem(item){
  var index = this.Addedlabour.findIndex(x => x.id == item.id)
  this.Addedlabour.splice(index,1)
  this.calculate()
}

SelectallLabour(){
  if(this.labourList.length > 0){
    this.labour = this.labourList
    this.labourList.forEach(ele =>{
      var index = this.Addedlabour.findIndex(x => x.id == ele.id)
      if(index === -1){
        ele.Per = 100
        ele.qty = 1
        ele.WPer = 0
        this.Addedlabour.push(ele)
      }
     })
  }
}

RemoveallLabour(){
  if(this.labourList.length > 0){
    this.labour = [];
    this.labourList.forEach(ele =>{
      var index = this.Addedlabour.findIndex(x => x.id == ele.id)
      if(index !== -1){
        this.Addedlabour.splice(index,1)
      }
     })
  }
  this.calculate()
}

calculate(){
  this.labourtotal = "0";
  if(this.Addedlabour.length > 0){
   this.Addedlabour.forEach(element => {
     if(element.qty){
      this.labourtotal = (parseFloat(this.labourtotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
     }
   });
  }
}

async addlabour(){

  const loading = await this.loadingController.create({
    message: 'Adding...',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.Addedlabour.forEach((element, index, array) =>{
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).get().subscribe(value =>{
     var checker = value.data().labour.find(x => x.id == element.id)
     if(!checker){
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).update({
        labour : firebase.firestore.FieldValue.arrayUnion({
          name: element.name,
          id : element.id,
          qty : 0,
          unit : element.unit,
          rate : element.price,
          etotal : 0,
          aqty : element.qty,
          atotal : (element.qty*element.price),
        }),
        LatotalPrice : value.data().LatotalPrice+(element.qty*element.price),
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
