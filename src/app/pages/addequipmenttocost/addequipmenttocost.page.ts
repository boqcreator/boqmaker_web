import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addequipmenttocost',
  templateUrl: './addequipmenttocost.page.html',
  styleUrls: ['./addequipmenttocost.page.scss'],
})
export class AddequipmenttocostPage implements OnInit {
  Addedequipment = [];
  myProjectID;
  itemID;

  EcatList=[];
  EsubcatList= [];
  equipmentList = [];

  ECatID;
  ESubcatID;
  equipmentID;

  equipment= [];
  equipmenttotal= "0";


  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    private menu : MenuController,
    public alertController: AlertController) {
      this.menu.enable(false)
      this.getequipmentCat()
     }

  ngOnInit() {
  }

  //**************************   EQUIPMENT    **************************



 getequipmentCat(){
  this.storage.get('equipmentcat').then((value)=>{
    if(value !== null){
      this.ECatID = value
      this.getEsubcat()
    }
  })
  this.storage.get('equipmentsubcat').then((value)=>{
   if(value !== null){
    this.ESubcatID = value
    this.getequipments()
   } 
  })
  this.afs.collection<any>(`boq/boq/equipmentscat/`).snapshotChanges().subscribe(value =>{
   value.forEach(doc =>{
     this.EcatList.push({
       name : doc.payload.doc.data().name,
       id : doc.payload.doc.id
     })
   })
  })
 }

 getEsubcat(){
  this.storage.set("equipmentcat", this.ECatID);
  this.equipmentList = [];
   this.afs.collection<any>(`boq/boq/equipmentscat/${this.ECatID}/subcat`).snapshotChanges().subscribe(value =>{
     this.EsubcatList = [];
     value.forEach(doc =>{
       this.EsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
     })
     
   })
 }

 getequipments(){
   this.storage.set("equipmentsubcat", this.ESubcatID);
   this.storage.set("equipmentsubcatList", this.EsubcatList);
   this.afs.collection<any>(`boq/boq/equipmentscat/${this.ECatID}/subcat/${this.ESubcatID}/equipments`).snapshotChanges().subscribe(value =>{
     this.equipmentList = [];
     value.forEach(doc =>{
       this.equipmentList.push({
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

 pushtoequipment(){
  this.equipment.forEach(ele =>{
   var index = this.Addedequipment.findIndex(x => x.id == ele.id)
   ele.qty = 1
   ele.Per = 100
   if(index === -1){
     this.Addedequipment.push(ele)
   }
  }) 
}

Edelitem(item){
  var index = this.Addedequipment.findIndex(x => x.id == item.id)
  this.Addedequipment.splice(index,1)
  this.calculate()
}

SelectallEquipment(){
  if(this.equipmentList.length > 0){
    this.equipment = this.equipmentList
    this.equipmentList.forEach(ele =>{
      var index = this.Addedequipment.findIndex(x => x.id == ele.id)
      if(index === -1){
        ele.qty = 1
        ele.Per = 100
        this.Addedequipment.push(ele)
      }
     })
  }
}

RemoveallEquipment(){
  if(this.equipmentList.length > 0){
    this.equipment = [];
    this.equipmentList.forEach(ele =>{
      var index = this.Addedequipment.findIndex(x => x.id == ele.id)
      if(index !== -1){
        this.Addedequipment.splice(index,1)
      }
     })
  }
  this.calculate()
}

calculate(){
  this.equipmenttotal = "0";
  if(this.Addedequipment.length > 0){
   this.Addedequipment.forEach(element => {
     if(element.qty){
      this.equipmenttotal = (parseFloat(this.equipmenttotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
     }
   });
  }
}


async addequipment(){

  const loading = await this.loadingController.create({
    message: 'Adding...',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.Addedequipment.forEach((element, index, array) =>{
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).get().subscribe(value =>{
     var checker = value.data().extraequipment.find(x => x.id == element.id)
     if(!checker){
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.itemID}`).update({
        extraequipment : firebase.firestore.FieldValue.arrayUnion({
          name: element.name,
          id : element.id,
          qty : 0,
          unit : element.unit,
          rate : element.price,
          etotal : 0,
          aqty : element.qty,
          atotal : (element.qty*element.price),
        }),
        EatotalPrice : value.data().EatotalPrice+(element.qty*element.price),
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
