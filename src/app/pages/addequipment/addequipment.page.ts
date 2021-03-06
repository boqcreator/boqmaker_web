import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EquipmentlibPage } from '../equipmentlib/equipmentlib.page';

@Component({
  selector: 'app-addequipment',
  templateUrl: './addequipment.page.html',
  styleUrls: ['./addequipment.page.scss'],
})
export class AddequipmentPage implements OnInit {
  segment = "cat"
  catName = '';
  catDes = "null"
  subcatName = '';
  subcatDes = "null"

  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  sname= "";
  sdes = "";

  units;
  unit ="";
  price= 0.000;

  LEXISTING = true;


  ScatList=[];
  SsubcatList= [];
  supplierList = [];

  SCatID;
  SSubcatID;
  supplierID;
  supplierAdd=[];

  supplier = ""
 
  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    private modalController: ModalController,
    public alertController: AlertController) { 
      this.units =  this.afs.collection(`boq/boq/units`, ref => ref.orderBy("name" , "asc")).snapshotChanges()
      this.storage.get('equipmentcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('equipmentsubcat').then((value)=>{
        this.SubcatID = value
      })
      this.storage.get('equipmentsubcatList').then((value)=>{
        this.subcatList = value
      })
    this.afs.collection<any>(`boq/boq/equipmentscat`).snapshotChanges().subscribe(value =>{
      this.catList = []
      value.forEach(doc =>{
        this.catList.push({
          name : doc.payload.doc.data().name,
          id : doc.payload.doc.id
        })
      })
 
          })
          this.getSupplierCat();
  }

  ngOnInit() {
  }

  getSubcat(){
    this.storage.set("equipmentcat", this.CatID);
      this.afs.collection<any>(`boq/boq/equipmentscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
        this.subcatList = [];
        value.forEach(doc =>{
          this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
        })
        
      })
  }
  saveTostorage(){
    this.storage.set("equipmentsubcat", this.SubcatID);
    this.storage.set("equipmentsubcatList", this.subcatList);

  }

  addcat(){
    if(this.catName.trim() && this.catDes.trim()){
      this.loader()
            this.afs.collection(`boq/boq/equipmentscat`).add({
              name : this.catName,
              des : this.catDes,
              createdon : new Date().toISOString()
                  }).then(()=>{
                    this.loadingController.dismiss();
                    this.presentAlert();
                    this.catName = "";
                    this.catDes = "";
                  }).catch((err)=>{
                    alert(err)
                  })
          }else{
            alert("Please fill the fields")
          }

  }

  addsubcat(){
    if(this.subcatName.trim()){
      this.loader()
            this.afs.collection(`boq/boq/equipmentscat/${this.CatID}/subcat`).add({
              name : this.subcatName,
              des : this.subcatDes,
              createdon : new Date().toISOString()
                  }).then(()=>{
                    this.loadingController.dismiss();
                    this.presentAlert();
                    this.subcatName = "";
                    this.subcatDes = "";
                  }).catch((err)=>{
                    alert(err)
                  })
          }else{
            alert("Please fill the fields")
          }

  }

  addequipment(){
           this.loader()
            this.afs.collection(`boq/boq/equipmentscat/${this.CatID}/subcat/${this.SubcatID}/equipments`).add({
              name: this.sname,
              des: this.sdes,
              createdon : new Date().toISOString(),
              catid : this.CatID,
              subcatid : this.SubcatID,
              unit : this.unit,
              price : this.price,
              LEXISTING : this.LEXISTING,
              supplier : this.supplier,
              additionalsupplier : this.supplierAdd
                  }).then(()=>{
                    this.loadingController.dismiss();
                     this.presentAlert();
                     this.sname= "";
                     this.sdes = "";
                  }).catch((err)=>{
                    alert(err)
                  })
          }


 getSupplierCat(){
  this.storage.get('Esuppliercat').then((value)=>{
    if(value !== null){
      this.SCatID = value
      this.getSsubcat()
    }
  })
  this.storage.get('Esuppliersubcat').then((value)=>{
   if(value !== null){
    this.SSubcatID = value
    this.getsuppliers()
   } 
  })
  this.afs.collection<any>(`boq/boq/equipmentsupplierscat/`).snapshotChanges().subscribe(value =>{
   value.forEach(doc =>{
     this.ScatList.push({
       name : doc.payload.doc.data().name,
       id : doc.payload.doc.id
     })
   })
  })
 }

 getSsubcat(){
  this.storage.set("Esuppliercat", this.SCatID);
  this.supplierList = [];
   this.afs.collection<any>(`boq/boq/equipmentsupplierscat/${this.SCatID}/subcat`).snapshotChanges().subscribe(value =>{
     this.SsubcatList = [];
     value.forEach(doc =>{
       this.SsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
     })
     
   })
 }

 getsuppliers(){
   this.storage.set("Esuppliersubcat", this.SSubcatID);
   this.storage.set("EsuppliersubcatEist", this.SsubcatList);
   this.afs.collection<any>(`boq/boq/equipmentsupplierscat/${this.SCatID}/subcat/${this.SSubcatID}/suppliers`).snapshotChanges().subscribe(value =>{
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
       catid : doc.payload.doc.data().catid,
       subcatid : doc.payload.doc.data().subcatid
     })
     })
     
   })

 }
 
 setsupplier(){
   this.supplier = this.supplierList.find(x => x.id == this.supplierID)
 }


  async loader(){
    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 2000
    });
    await loading.present();
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Added',
      message: 'Successfully Added!',
      buttons: ['OK']
    });

    await alert.present();
  }

  close(){
    this.modal.dismiss();
  }
  async itemlibrary(){
    const modal = await this.modalController.create({
    component: EquipmentlibPage,
    });
  
    await modal.present();
    
    const data = await modal.onDidDismiss();
    if(data){
      this.sname = data.data.name
      this.sdes = data.data.des
      this.unit = data.data.unit
      this.price = data.data.price
    }
 
}
}