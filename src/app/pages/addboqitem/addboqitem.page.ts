import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-addboqitem',
  templateUrl: './addboqitem.page.html',
  styleUrls: ['./addboqitem.page.scss'],
})
export class AddboqitemPage implements OnInit {
  segment = "cat"
  catName = '';
  catDes = "null";
  subcatName = '';
  subcatDes = "null";
  SubsubcatName = '';
  SubsubcatDes = "null"


  catList=[];
  CatID = "";
  CatN = "";

  subcatList=[];
  SubcatID = "";
  SubcatN = "";

  subsubcatList=[];
  SubsubcatID = "";
  SubsubcatN = "";  
   
  itemname = "";
  units = ['m','m2','m3','mm','kg','no','pr','doz','roll','load','sheet','tin','litre','gallon','item','pair','set','l.s','ton','kilo','pr']
  unit="";
  price= 0.000;


  McatList=[];
  MsubcatList= [];
  materialList = [];

  MCatID;
  MSubcatID;
  materialID;

  material= [];

  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    private menu : MenuController,
    public alertController: AlertController) {
    this.menu.enable(false)

    this.storage.get('boqitemcat').then((value)=>{
      if(value !== null){
        this.CatID = value
        this.getSubcat()
      }

    })
    this.storage.get('boqitemsubcat').then((value)=>{
      if(value !== null){
        this.SubcatID = value
        this.getSubsubcat()
      }
    })
    this.storage.get('boqitemsubcatList').then((value)=>{
      this.subcatList = value
    })

    this.storage.get('boqitemsubsubcat').then((value)=>{
      this.SubsubcatID = value
    })
    this.storage.get('boqitemsubsubcatList').then((value)=>{
      this.subsubcatList = value
    })

  this.afs.collection<any>(`boq/boq/boqitemscat`).snapshotChanges().subscribe(value =>{
    this.catList = []
    value.forEach(doc =>{
      this.catList.push({
        name : doc.payload.doc.data().name,
        id : doc.payload.doc.id
      })
    })

        })
      this.getmaterialCat()
   }

  ngOnInit() {
  }


  getSubcat(){
    this.storage.set("boqitemcat", this.CatID);
      this.afs.collection<any>(`boq/boq/boqitemscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
        this.subcatList = [];
        value.forEach(doc =>{
          this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
        })
        
      })
  }

  getSubsubcat(){
    this.storage.set("boqitemsubcat", this.SubcatID);
    this.storage.set("boqitemsubcatList", this.subcatList);
    this.afs.collection<any>(`boq/boq/boqitemscat/${this.CatID}/subcat/${this.SubcatID}/subsubcat`).snapshotChanges().subscribe(value =>{
      this.subsubcatList = [];
      value.forEach(doc =>{
        this.subsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
      })
      
    })

  }


  saveTostorage(){
    this.storage.set("boqitemsubsubcat", this.SubsubcatID);
    this.storage.set("boqitemsubsubcatList", this.subsubcatList);

  }

  addcat(){
    if(this.catName.trim() && this.catDes.trim()){
      this.loader()
            this.afs.collection(`boq/boq/boqitemscat`).add({
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
            this.afs.collection(`boq/boq/boqitemscat/${this.CatID}/subcat`).add({
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

  addSubsubcat(){
      this.loader()
            this.afs.collection(`boq/boq/boqitemscat/${this.CatID}/subcat/${this.SubcatID}/subsubcat`).add({
              name : this.SubsubcatName,
              des : this.SubsubcatDes,
              createdon : new Date().toISOString()
                  }).then(()=>{
                    this.loadingController.dismiss();
                    this.presentAlert();
                    this.SubsubcatName = "";
                    this.SubsubcatDes = "";
                  }).catch((err)=>{
                    alert(err)
                  })
  }
  

  addboqitem(){
           this.loader()
           this.afs.collection(`boq/boq/boqitemscat/${this.CatID}/subcat/${this.SubcatID}/subsubcat/${this.SubsubcatID}/boqitems`).add({
            CatID : this.CatID,
            SubcatID : this.SubcatID,
            SubsubcatID : this.SubsubcatID,
            CatName : this.CatID,
            SubcatName : this.SubcatID,
            SubsubcaName : this.SubsubcatID,
            name : this.itemname,
            unit : this.unit,
            price : this.price,
            materials : this.material
       }).then(()=>{
                    this.loadingController.dismiss();
                     this.presentAlert();

                  }).catch((err)=>{
                    alert(err)
                  })
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
 
 setmaterial(){
   this.material = this.materialList.find(x => x.id == this.materialID)
 }



 calculate(){
   this.price = 0;
   this.material.forEach(element => {
     if(element.qty){
      this.price += ( parseFloat(element.price)  * parseFloat(element.qty))
     }else{
      this.price += ( parseFloat(element.price)  * 1)
     }
   
   });
   console.log(this.price)
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
