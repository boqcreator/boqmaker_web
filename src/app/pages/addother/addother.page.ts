import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-addother',
  templateUrl: './addother.page.html',
  styleUrls: ['./addother.page.scss'],
})
export class AddotherPage implements OnInit {
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

  units = ['DAY','Hour','Month','Week','Year','no','l.s']
  unit ="";
  price= 0.000;

  LEXISTING = true;


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
      this.storage.get('othercat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('othersubcat').then((value)=>{
        this.SubcatID = value
      })
      this.storage.get('othersubcatList').then((value)=>{
        this.subcatList = value
      })
    this.afs.collection<any>(`boq/boq/otherscat`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("othercat", this.CatID);
      this.afs.collection<any>(`boq/boq/otherscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
        this.subcatList = [];
        value.forEach(doc =>{
          this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
        })
        
      })
  }
  saveTostorage(){
    this.storage.set("othersubcat", this.SubcatID);
    this.storage.set("othersubcatList", this.subcatList);

  }

  addcat(){
    if(this.catName.trim() && this.catDes.trim()){
      this.loader()
            this.afs.collection(`boq/boq/otherscat`).add({
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
            this.afs.collection(`boq/boq/otherscat/${this.CatID}/subcat`).add({
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

  addother(){
           this.loader()
            this.afs.collection(`boq/boq/otherscat/${this.CatID}/subcat/${this.SubcatID}/others`).add({
              name: this.sname,
              des: this.sdes,
              createdon : new Date().toISOString(),
              catid : this.CatID,
              subcatid : this.SubcatID,
              unit : this.unit,
              price : this.price,
              EXISTING : this.LEXISTING,
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
  this.storage.get('Osuppliercat').then((value)=>{
    if(value !== null){
      this.SCatID = value
      this.getSsubcat()
    }
  })
  this.storage.get('Osuppliersubcat').then((value)=>{
   if(value !== null){
    this.SSubcatID = value
    this.getsuppliers()
   } 
  })
  this.afs.collection<any>(`boq/boq/othersupplierscat/`).snapshotChanges().subscribe(value =>{
   value.forEach(doc =>{
     this.ScatList.push({
       name : doc.payload.doc.data().name,
       id : doc.payload.doc.id
     })
   })
  })
 }

 getSsubcat(){
  this.storage.set("Osuppliercat", this.SCatID);
  this.supplierList = [];
   this.afs.collection<any>(`boq/boq/othersupplierscat/${this.SCatID}/subcat`).snapshotChanges().subscribe(value =>{
     this.SsubcatList = [];
     value.forEach(doc =>{
       this.SsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
     })
     
   })
 }

 getsuppliers(){
   this.storage.set("Osuppliersubcat", this.SSubcatID);
   this.storage.set("OsuppliersubcatOist", this.SsubcatList);
   this.afs.collection<any>(`boq/boq/othersupplierscat/${this.SCatID}/subcat/${this.SSubcatID}/suppliers`).snapshotChanges().subscribe(value =>{
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