import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addsubcontractortocost',
  templateUrl: './addsubcontractortocost.page.html',
  styleUrls: ['./addsubcontractortocost.page.scss'],
})
export class AddsubcontractortocostPage implements OnInit {
  myProjectID;
  itemID;

  ScatList=[];
  SsubcatList= [];
  subcontractorList = [];

  SCatID;
  SSubcatID;
  subcontractorID;

  subcontractor= [];
  subcontractortotal = "0";
  Addedsubcontractor = [];

  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    private menu : MenuController,
    public alertController: AlertController) {
      this.menu.enable(false)
      this.getsubcontractorCat()
     }

  ngOnInit() {
  }


 getsubcontractorCat(){
  this.storage.get('subcontractorcat').then((value)=>{
    if(value !== null){
      this.SCatID = value
      this.getSsubcat()
    }
  })
  this.storage.get('subcontractorsubcat').then((value)=>{
   if(value !== null){
    this.SSubcatID = value
    this.getsubcontractors()
   } 
  })
  this.afs.collection<any>(`boq/boq/subcontractorscat/`).snapshotChanges().subscribe(value =>{
   value.forEach(doc =>{
     this.ScatList.push({
       name : doc.payload.doc.data().name,
       id : doc.payload.doc.id
     })
   })
  })
 }

 getSsubcat(){
  this.storage.set("subcontractorcat", this.SCatID);
  this.subcontractorList = [];
   this.afs.collection<any>(`boq/boq/subcontractorscat/${this.SCatID}/subcat`).snapshotChanges().subscribe(value =>{
     this.SsubcatList = [];
     value.forEach(doc =>{
       this.SsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
     })
     
   })
 }

 getsubcontractors(){
   this.storage.set("subcontractorsubcat", this.SSubcatID);
   this.storage.set("subcontractorsubcatList", this.SsubcatList);
   this.afs.collection<any>(`boq/boq/subcontractorscat/${this.SCatID}/subcat/${this.SSubcatID}/subcontractors`).snapshotChanges().subscribe(value =>{
     this.subcontractorList = [];
     value.forEach(doc =>{
       this.subcontractorList.push({
       name : doc.payload.doc.data().name, 
       id : doc.payload.doc.id,
       catid: doc.payload.doc.data().catid,
       createdon: doc.payload.doc.data().createdon,
       des: doc.payload.doc.data().des,
       price: doc.payload.doc.data().price,
       subcatid : doc.payload.doc.data().subcatid,
       unit : doc.payload.doc.data().unit,
     })
     })
     
   })

 }

 pushtosubcontractor(){
  this.subcontractor.forEach(ele =>{
   var index = this.Addedsubcontractor.findIndex(x => x.id == ele.id)
   ele.Per = 100
   ele.qty = 1
   ele.note = ""
   if(index === -1){
     this.Addedsubcontractor.push(ele)
   }
  }) 
}

Sdelitem(item){
  var index = this.Addedsubcontractor.findIndex(x => x.id == item.id)
  this.Addedsubcontractor.splice(index,1)
  this.calculate()
}

SelectallSubcontractor(){
  if(this.subcontractorList.length > 0){
    this.subcontractor = this.subcontractorList
    this.subcontractorList.forEach(ele =>{
      var index = this.Addedsubcontractor.findIndex(x => x.id == ele.id)
      if(index === -1){
        ele.Per = 100
        ele.qty = 1
        ele.WPer = 0
        this.Addedsubcontractor.push(ele)
      }
     })
  }
}

RemoveallSubcontractor(){
  if(this.subcontractorList.length > 0){
    this.subcontractor = [];
    this.subcontractorList.forEach(ele =>{
      var index = this.Addedsubcontractor.findIndex(x => x.id == ele.id)
      if(index !== -1){
        this.Addedsubcontractor.splice(index,1)
      }
     })
  }
  this.calculate()
}

calculate(){
  this.subcontractortotal = "0";
  if(this.Addedsubcontractor.length > 0){
   this.Addedsubcontractor.forEach(element => {
     if(element.qty){
      this.subcontractortotal = (parseFloat(this.subcontractortotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
     }
   });
  }
}

async addsubcontractor(){

  const loading = await this.loadingController.create({
    message: 'Adding...',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.Addedsubcontractor.forEach((element, index, array) =>{
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).get().subscribe(value =>{
     var checker = value.data().subcontractor.find(x => x.id == element.id)
     if(!checker){
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).update({
        subcontractor : firebase.firestore.FieldValue.arrayUnion({
          name: element.name,
          id : element.id,
          qty : 0,
          unit : element.unit,
          rate : element.price,
          etotal : 0,
          aqty : element.qty,
          atotal : (element.qty*element.price),
        }),
        SatotalPrice : value.data().SatotalPrice+(element.qty*element.price),
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
