import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';


@Component({
  selector: 'app-addothertocost',
  templateUrl: './addothertocost.page.html',
  styleUrls: ['./addothertocost.page.scss'],
})
export class AddothertocostPage implements OnInit {
  myProjectID;
  itemID;

  OcatList=[];
  OsubcatList= [];
  otherList = [];

  OCatID;
  OSubcatID;
  otherID;

  other= [];
  othertotal = "0";
  Addedother = [];

  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    private menu : MenuController,
    public alertController: AlertController) {
      this.menu.enable(false)
      this.getotherCat()
     }

  ngOnInit() {
  }

  //**************************   OTHER    **************************


 getotherCat(){
  this.storage.get('othercat').then((value)=>{
    if(value !== null){
      this.OCatID = value
      this.getOsubcat()
    }
  })
  this.storage.get('othersubcat').then((value)=>{
   if(value !== null){
    this.OSubcatID = value
    this.getothers()
   } 
  })
  this.afs.collection<any>(`boq/boq/otherscat/`).snapshotChanges().subscribe(value =>{
   value.forEach(doc =>{
     this.OcatList.push({
       name : doc.payload.doc.data().name,
       id : doc.payload.doc.id
     })
   })
  })
 }

 getOsubcat(){
  this.storage.set("othercat", this.OCatID);
  this.otherList = [];
   this.afs.collection<any>(`boq/boq/otherscat/${this.OCatID}/subcat`).snapshotChanges().subscribe(value =>{
     this.OsubcatList = [];
     value.forEach(doc =>{
       this.OsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
     })
     
   })
 }

 getothers(){
   this.storage.set("othersubcat", this.OSubcatID);
   this.storage.set("othersubcatList", this.OsubcatList);
   this.afs.collection<any>(`boq/boq/otherscat/${this.OCatID}/subcat/${this.OSubcatID}/others`).snapshotChanges().subscribe(value =>{
     this.otherList = [];
     value.forEach(doc =>{
       this.otherList.push({
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

 pushtoother(){
  this.other.forEach(ele =>{
   var index = this.Addedother.findIndex(x => x.id == ele.id)
   ele.Per = 100
   ele.qty = 1
   ele.note = ""
   if(index === -1){
     this.Addedother.push(ele)
   }
  }) 
}

Odelitem(item){
  var index = this.Addedother.findIndex(x => x.id == item.id)
  this.Addedother.splice(index,1)
  this.calculate()
}

SelectallOther(){
  if(this.otherList.length > 0){
    this.other = this.otherList
    this.otherList.forEach(ele =>{
      var index = this.Addedother.findIndex(x => x.id == ele.id)
      if(index === -1){
        ele.Per = 100
        ele.qty = 1
        ele.WPer = 0
        this.Addedother.push(ele)
      }
     })
  }
}

RemoveallOther(){
  if(this.otherList.length > 0){
    this.other = [];
    this.otherList.forEach(ele =>{
      var index = this.Addedother.findIndex(x => x.id == ele.id)
      if(index !== -1){
        this.Addedother.splice(index,1)
      }
     })
  }
  this.calculate()
}
calculate(){
  this.othertotal = "0";
  if(this.Addedother.length > 0){
   this.Addedother.forEach(element => {
     if(element.qty){
      this.othertotal = (parseFloat(this.othertotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
     }
   });
  }
}

async addother(){

  const loading = await this.loadingController.create({
    message: 'Adding...',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.Addedother.forEach((element, index, array) =>{
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).get().subscribe(value =>{
     var checker = value.data().extraother.find(x => x.id == element.id)
     if(!checker){
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).update({
        extraother : firebase.firestore.FieldValue.arrayUnion({
          name: element.name,
          id : element.id,
          qty : 0,
          unit : element.unit,
          rate : element.price,
          etotal : 0,
          aqty : element.qty,
          atotal : (element.qty*element.price),
        }),
        OatotalPrice : value.data().OatotalPrice+(element.qty*element.price),
        updatedon : new Date().toISOString()
      })
     }else{
       alert(`${element.name} already exist!`)
     }
    })
    if (index === array.length -1){
      loading.dismiss();
      this.modal.dismiss()
      alert("Added Successfully!")
    };
  })

}

}
