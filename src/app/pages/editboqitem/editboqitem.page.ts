import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-editboqitem',
  templateUrl: './editboqitem.page.html',
  styleUrls: ['./editboqitem.page.scss'],
})
export class EditboqitemPage implements OnInit {
  arrayID = [];
  itemname ="" ;
  unit = '';
  image= '';
  price = 0 ;
  material = [] ;      
  labour = [] ;
  equipment = [] ;
  other = [] ;
  subcontractor = [] ;
  materialtotal= 0 ;
  labourtotal = 0 ;
  equipmenttotal = 0 ;
  othertotal = 0 ;
  subcontractortotal = 0 ;
  units = ['m','m2','m3','mm','kg','no','pr','doz','roll','load','sheet','tin','litre','gallon','item','pair','set','l.s','ton','kilo','pr']
  segment2 = "m"


  McatList=[];
  MsubcatList= [];
  materialList = [];

  MCatID;
  MSubcatID;
  materialID;


  LcatList=[];
  LsubcatList= [];
  labourList = [];

  LCatID;
  LSubcatID;
  labourID;


  EcatList=[];
  EsubcatList= [];
  equipmentList = [];

  ECatID;
  ESubcatID;
  equipmentID;


  OcatList=[];
  OsubcatList= [];
  otherList = [];

  OCatID;
  OSubcatID;
  otherID;

  ScatList=[];
  SsubcatList= [];
  subcontractorList = [];

  SCatID;
  SSubcatID;
  subcontractorID;

  pic;

  constructor(private menu : MenuController,
       private route : ActivatedRoute,
       private afs : AngularFirestore, 
       private storage  : Storage,
       public alertController: AlertController,
       public loadingController: LoadingController,
       ) {
    menu.enable(false)
    this.getmaterialCat()
    this.getlabourCat()
    this.getequipmentCat()
    this.getotherCat()
    this.getsubcontractorCat()
   }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id')
    this.arrayID = id.split("&")
    this.afs.doc<any>(`boq/boq/boqitemscat/${this.arrayID[0]}/subcat/${this.arrayID[1]}/subsubcat/${this.arrayID[2]}/boqitems/${this.arrayID[3]}`).get().subscribe(value =>{

       this.itemname = value.data().name;
       this.unit = value.data().unit;
       this.price = value.data().price;
       this.image = value.data().image,
       this.material = value.data().materials;
       this.labour = value.data().labours;
       this.equipment = value.data().equipment;
       this.other = value.data().other;
       this.subcontractor = value.data().subcontractor;
       this.materialtotal = value.data().materialtotal
       this.labourtotal = value.data().labourtotal;
       this.equipmenttotal = value.data().equipmenttotal;
       this.othertotal = value.data().othertotal;
       this.subcontractortotal = value.data().subcontractortotal;
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
     this.materialtotal = 0;
     this.labourtotal = 0;
     this.equipmenttotal = 0;
     this.othertotal = 0;
     this.subcontractortotal = 0;
     if(this.material.length > 0){
      this.material.forEach(element => {
        if(element.qty){
         this.price += ( parseFloat(element.price)  * parseFloat(element.qty))
         this.materialtotal +=( parseFloat(element.price)  * parseFloat(element.qty))
        }
      });
     }
      if(this.labour.length > 0){
        this.labour.forEach(element => {
          if(element.qty){
           this.price += ( parseFloat(element.price)  * parseFloat(element.qty))
           this.labourtotal += ( parseFloat(element.price)  * parseFloat(element.qty))
          }
        });
      }
  
      if(this.equipment.length > 0){
        this.equipment.forEach(element => {
          if(element.qty){
           this.price += ( parseFloat(element.price)  * parseFloat(element.qty))
           this.equipmenttotal += ( parseFloat(element.price)  * parseFloat(element.qty))
          }
        });
      }
      
      if(this.other.length > 0){
        this.other.forEach(element => {
          if(element.qty){
           this.price += ( parseFloat(element.price)  * parseFloat(element.qty))
           this.othertotal += ( parseFloat(element.price)  * parseFloat(element.qty))
          }
        });
      }
  
      if(this.subcontractor.length > 0){
        this.subcontractor.forEach(element => {
          if(element.qty){
           this.price += ( parseFloat(element.price)  * parseFloat(element.qty))
           this.subcontractortotal += ( parseFloat(element.price)  * parseFloat(element.qty))
          }
        });
      }
   }
  
  
  
  
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
  
   //SUBCONTRACTOR
  
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
  
   setequipment(){
    this.equipment= this.equipmentList.find(x => x.id == this.equipmentID)
  }
   
   setlabour(){
     this.labour = this.labourList.find(x => x.id == this.labourID)
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
  
  
    onFileSelected1(event){
      this.pic = event.target.files[0];
    }

}
