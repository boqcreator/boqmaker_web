import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.page.html',
  styleUrls: ['./addmaterial.page.scss'],
})
export class AddmaterialPage implements OnInit {
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

  units = ['m','m2','m3','mm','kg','no','pr','doz','roll','load','sheet','tin','litre','gallon','item','pair','set','l.s','ton','kilo','pr']
  unit ="";
  price= 0.000;

  unit1 = "";
  price1= 0.000;

  unit2 = "";
  price2= 0.000;


  ScatList=[];
  SsubcatList= [];
  supplierList = [];

  SCatID;
  SSubcatID;
  supplierID;

  supplier = ""
  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    public alertController: AlertController) { 
      this.storage.get('materialcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('materialsubcat').then((value)=>{
        this.SubcatID = value
      })
      this.storage.get('materialsubcatList').then((value)=>{
        this.subcatList = value
      })
    this.afs.collection<any>(`boq/boq/materialscat`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("materialcat", this.CatID);
      this.afs.collection<any>(`boq/boq/materialscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
        this.subcatList = [];
        value.forEach(doc =>{
          this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
        })
        
      })
  }
  saveTostorage(){
    this.storage.set("materialsubcat", this.SubcatID);
    this.storage.set("materialsubcatList", this.subcatList);

  }

  addcat(){
    if(this.catName.trim() && this.catDes.trim()){
      this.loader()
            this.afs.collection(`boq/boq/materialscat`).add({
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
            this.afs.collection(`boq/boq/materialscat/${this.CatID}/subcat`).add({
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

  addmaterial(){
           this.loader()
            this.afs.collection(`boq/boq/materialscat/${this.CatID}/subcat/${this.SubcatID}/materials`).add({
              name: this.sname,
              des: this.sdes,
              createdon : new Date().toISOString(),
              catid : this.CatID,
              subcatid : this.SubcatID,
              unit : this.unit,
              price : this.price,
              unit1: this.unit1,
              price1 : this.price1,
              unit2 : this.unit2,
              price2 : this.price2,
              supplier : this.supplier
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
  this.storage.get('suppliercat').then((value)=>{
    if(value !== null){
      this.SCatID = value
      this.getSsubcat()
    }
  })
  this.storage.get('suppliersubcat').then((value)=>{
   if(value !== null){
    this.SSubcatID = value
    this.getsuppliers()
   } 
  })
  this.afs.collection<any>(`boq/boq/supplierscat/`).snapshotChanges().subscribe(value =>{
   value.forEach(doc =>{
     this.ScatList.push({
       name : doc.payload.doc.data().name,
       id : doc.payload.doc.id
     })
   })
  })
 }

 getSsubcat(){
  this.storage.set("suppliercat", this.SCatID);
  this.supplierList = [];
   this.afs.collection<any>(`boq/boq/supplierscat/${this.SCatID}/subcat`).snapshotChanges().subscribe(value =>{
     this.SsubcatList = [];
     value.forEach(doc =>{
       this.SsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
     })
     
   })
 }

 getsuppliers(){
   this.storage.set("suppliersubcat", this.SSubcatID);
   this.storage.set("suppliersubcatList", this.SsubcatList);
   this.afs.collection<any>(`boq/boq/supplierscat/${this.SCatID}/subcat/${this.SSubcatID}/suppliers`).snapshotChanges().subscribe(value =>{
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
}