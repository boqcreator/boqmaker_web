import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edititems',
  templateUrl: './edititems.page.html',
  styleUrls: ['./edititems.page.scss'],
})
export class EdititemsPage implements OnInit {
  item;
  pid;
  segment = "d"
  itemsegment = "finish"

  arrayID = [];
  itemname ="" ;
  itemcode = "";
  unit = '';
  image= '';
  price = 0 ;
  material = [] ;      
  labour = [] ;
  equipment = [] ;
  other = [] ;
  subcontractor = [] ;
  materialtotal= "0" ;
  labourtotal = "0" ;
  equipmenttotal = "0" ;
  othertotal = "0" ;
  subcontractortotal = "0" ;
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

  Addedmaterial = [];
  Addedlabour = [];
  Addedequipment = [];
  Addedsubcontractor = [];
  Addedother = [];






ceiling=0;
floor=0;
walls=0;
cornice=0;
skirting=0;
shuttering=0;
block=0;
blockdpc=0;
concrete=0;
polythene=0;
bitumin=0;
itemsteel=0;
blockbitumin=0;
FILL_Percentage=0;
E_Percentage=0;
I_DIS=0;
I_FACTOR=100;
Exp_Percentage=0;
Concb_Percentage=0;
iqty=0;
itempercentage=0;
completion=0;
itemprecast=0;
existing="true";
existing1="false";
existing2="false";
tsp=0;
bpp=0;
spp1=0;
spp2=0;
spp3=0;
spp4=0;
tpp=0;
bbp=0;
sbp1=0;
sbp2=0;
sbp3=0;
sbp4=0;
tep=0;
tbp=0;
bep=0;
sep1=0;
sep2=0;
sep3=0;
sep4=0;
bsp=0;
ssp1=0;
ssp2=0;
ssp3=0;
ssp4=0;
ich1A = 0;
ich1B = 0;
ich1C = 0;
ich1D = 0;
ich1E = 0;
ich1F = 0;
ich1G = 0;
ich1H = 0;
ich1I = 0;
ich1J = 0;
ich1K = 0;
ich1L = 0;
ich1M = 0;
ich1N = 0;
ich1O = 0;
ich1P = 0;
ich1Q = 0;
ich1R = 0;
ich1S = 0;
ich1T = 0;
ich1U = '';
ich1V = '';
ich1W = '';
ich1X = '';
ich1Y = '';
ich1Z = '';
ich1AA = '';
ich1AB = '';
ich1AC = '';
ich1AD = '';
ich1AE = '';
ich1AF = '';
ich1AG = '';
ich1AH = '';
ich1AI = '';
ich1AJ = '';
ich1AK = '';
ich1AL = '';
ich1AM = '';
ich1AN = '';
ich1AO = '';
ich2A = 0;
ich2B = 0;
ich2C = 0;
ich2D = 0;
ich2E = 0;
ich2F = 0;
ich2G = 0;
ich2H = 0;
ich2I = 0;
ich2J = 0;
ich2K = 0;
ich2L = 0;
ich2M = 0;
ich2N = 0;
ich2O = 0;
ich2P = 0;
ich2Q = 0;
ich2R = 0;
ich2S = 0;
ich2T = 0;
ich2U = '';
ich2V = '';
ich2W = '';
ich2X = '';
ich2Y = '';
ich2Z = '';
ich2AA = '';
ich2AB = '';
ich2AC = '';
ich2AD = '';
ich2AE = '';
ich2AF = '';
ich2AG = '';
ich2AH = '';
ich2AI = '';
ich2AJ = '';
ich2AK = '';
ich2AL = '';
ich2AM = '';
ich2AN = '';
ich2AO = '';
ich3A = 0;
ich3B = 0;
ich3C = 0;
ich3D = 0;
ich3E = 0;
ich3F = 0;
ich3G = 0;
ich3H = 0;
ich3I = 0;
ich3J = 0;
ich3K = 0;
ich3L = 0;
ich3M = 0;
ich3N = 0;
ich3O = 0;
ich3P = 0;
ich3Q = 0;
ich3R = 0;
ich3S = 0;
ich3T = 0;
ich3U = '';
ich3V = '';
ich3W = '';
ich3X = '';
ich3Y = '';
ich3Z = '';
ich3AA = '';
ich3AB = '';
ich3AC = '';
ich3AD = '';
ich3AE = '';
ich3AF = '';
ich3AG = '';
ich3AH = '';
ich3AI = '';
ich3AJ = '';
ich3AK = '';
ich3AL = '';
ich3AM = '';
ich3AN = '';
ich3AO = '';

  constructor(private menu : MenuController,
       private route : ActivatedRoute,
       private afs : AngularFirestore, 
       private storage  : Storage,
       public alertController: AlertController,
       public loadingController: LoadingController,
       private modalController: ModalController
       ) {
    menu.enable(false)
    this.getmaterialCat()
    this.getlabourCat()
    this.getequipmentCat()
    this.getotherCat()
    this.getsubcontractorCat()
   }
   close(){
    this.modalController.dismiss()
   }

  ngOnInit() {
    this.itemname = this.item.item.itemdetails.name;
    this.item.item.itemdetails.itemcode  ? this.itemcode = this.item.item.itemdetails.itemcode : "";
    this.unit = this.item.item.itemdetails.unit;
    this.price = this.item.item.itemdetails.price;
    this.item.item.itemdetails.image ? this.image = this.item.item.itemdetails.image : "" ;
    this.item.item.itemdetails.materials ? this.Addedmaterial = this.item.item.itemdetails.materials : "";
    this.item.item.itemdetails.labours ? this.Addedlabour = this.item.item.itemdetails.labours : "";
    this.item.item.itemdetails.equipment ? this.Addedequipment = this.item.item.itemdetails.equipment : "";
    this.item.item.itemdetails.other ? this.Addedother = this.item.item.itemdetails.other: "";
    this.item.item.itemdetails.subcontractor ? this.Addedsubcontractor = this.item.item.itemdetails.subcontractor : "";
    this.item.item.itemdetails.materialtotal ? this.materialtotal = this.item.item.itemdetails.materialtotal : "";
    this.item.item.itemdetails.labourtotal ? this.labourtotal = this.item.item.itemdetails.labourtotal : "";
    this.item.item.itemdetails.equipmenttotal ? this.equipmenttotal = this.item.item.itemdetails.equipmenttotal : "";
    this.item.item.itemdetails.othertotal ? this.othertotal = this.item.item.itemdetails.othertotal : "";
    this.item.item.itemdetails.subcontractortotal ? this.subcontractortotal = this.item.item.itemdetails.subcontractortotal : "";
    

this.ceiling= this.item.item.ceiling;
this.floor= this.item.item.floor;
this.walls= this.item.item.walls;
this.cornice= this.item.item.cornice;
this.skirting= this.item.item.skirting;
this.shuttering= this.item.item.shuttering;
this.block= this.item.item.block;
this.blockdpc= this.item.item.blockdpc;
this.concrete= this.item.item.concrete;
this.polythene= this.item.item.polythene;
this.bitumin= this.item.item.bitumin;
this.itemsteel= this.item.item.itemsteel;
this.blockbitumin= this.item.item.blockbitumin;
this.FILL_Percentage= this.item.item.FILL_Percentage;
this.E_Percentage= this.item.item.E_Percentage;
this.I_DIS= this.item.item.I_DIS;
this.I_FACTOR= this.item.item.I_FACTOR;
this.Exp_Percentage= this.item.item.Exp_Percentage;
this.Concb_Percentage= this.item.item.Concb_Percentage;
this.iqty= this.item.item.iqty;
this.itempercentage= this.item.item.itempercentage;
this.completion= this.item.item.completion;
this.itemprecast= this.item.item.itemprecast;
this.existing=this.item.item.existing;
this.existing1= this.item.item.existing1;
this.existing2=this.item.item.existing2;
this.tsp= this.item.item.tsp;
this.bpp= this.item.item.bpp;
this.spp1= this.item.item.spp1;
this.spp2= this.item.item.spp2;
this.spp3= this.item.item.spp3
this.spp4= this.item.item.spp4
this.tpp= this.item.item.tpp
this.bbp= this.item.item.bbp
this.sbp1= this.item.item.sbp1
this.sbp2= this.item.item.sbp2
this.sbp3= this.item.item.sbp3
this.sbp4= this.item.item.sbp4
this.tep= this.item.item.tep
this.tbp= this.item.item.tbp
this.bep= this.item.item.bep
this.sep1= this.item.item.sep1
this.sep2= this.item.item.sep2
this.sep3= this.item.item.sep3
this.sep4= this.item.item.sep4
this.bsp= this.item.item.bsp
this.ssp1= this.item.item.ssp1
this.ssp2= this.item.item.ssp2
this.ssp3= this.item.item.ssp3
this.ssp4= this.item.item.ssp4
this.ich1A =  this.item.item.ich1A 
this.ich1B =  this.item.item.ich1B 
this.ich1C =  this.item.item.ich1C 
this.ich1D =  this.item.item.ich1D 
this.ich1E =  this.item.item.ich1E 
this.ich1F =  this.item.item.ich1F 
this.ich1G =  this.item.item.ich1G 
this.ich1H =  this.item.item.ich1H 
this.ich1I =  this.item.item.ich1I 
this.ich1J =  this.item.item.ich1J 
this.ich1K =  this.item.item.ich1K 
this.ich1L =  this.item.item.ich1L 
this.ich1M =  this.item.item.ich1M 
this.ich1N =  this.item.item.ich1N 
this.ich1O =  this.item.item.ich1O 
this.ich1P =  this.item.item.ich1P 
this.ich1Q =  this.item.item.ich1Q 
this.ich1R =  this.item.item.ich1R 
this.ich1S =  this.item.item.ich1S 
this.ich1T =  this.item.item.ich1T 
this.ich1U = this.item.item.ich1U 
this.ich1V = this.item.item.ich1V 
this.ich1W = this.item.item.ich1W 
this.ich1X = this.item.item.ich1X 
this.ich1Y = this.item.item.ich1Y 
this.ich1Z = this.item.item.ich1Z 
this.ich1AA = this.item.item.ich1AA 
this.ich1AB = this.item.item.ich1AB 
this.ich1AC = this.item.item.ich1AC 
this.ich1AD = this.item.item.ich1AD 
this.ich1AE = this.item.item.ich1AE 
this.ich1AF = this.item.item.ich1AF 
this.ich1AG = this.item.item.ich1AG 
this.ich1AH = this.item.item.ich1AH 
this.ich1AI = this.item.item.ich1AI 
this.ich1AJ = this.item.item.ich1AJ 
this.ich1AK = this.item.item.ich1AK 
this.ich1AL = this.item.item.ich1AL 
this.ich1AM = this.item.item.ich1AM 
this.ich1AN = this.item.item.ich1AN 
this.ich1AO = this.item.item.ich1AO 
this.ich2A =  this.item.item.ich2A 
this.ich2B =  this.item.item.ich2B 
this.ich2C =  this.item.item.ich2C 
this.ich2D =  this.item.item.ich2D 
this.ich2E =  this.item.item.ich2E 
this.ich2F =  this.item.item.ich2F 
this.ich2G =  this.item.item.ich2G 
this.ich2H =  this.item.item.ich2H 
this.ich2I =  this.item.item.ich2I 
this.ich2J =  this.item.item.ich2J 
this.ich2K =  this.item.item.ich2K 
this.ich2L =  this.item.item.ich2L 
this.ich2M =  this.item.item.ich2M 
this.ich2N =  this.item.item.ich2N 
this.ich2O =  this.item.item.ich2O 
this.ich2P =  this.item.item.ich2P 
this.ich2Q =  this.item.item.ich2Q 
this.ich2R =  this.item.item.ich2R 
this.ich2S =  this.item.item.ich2S 
this.ich2T =  this.item.item.ich2T 
this.ich2U = this.item.item.ich2U 
this.ich2V = this.item.item.ich2V 
this.ich2W = this.item.item.ich2W 
this.ich2X = this.item.item.ich2X 
this.ich2Y = this.item.item.ich2Y 
this.ich2Z = this.item.item.ich2Z 
this.ich2AA = this.item.item.ich2AA 
this.ich2AB = this.item.item.ich2AB 
this.ich2AC = this.item.item.ich2AC 
this.ich2AD = this.item.item.ich2AD 
this.ich2AE = this.item.item.ich2AE 
this.ich2AF = this.item.item.ich2AF 
this.ich2AG = this.item.item.ich2AG 
this.ich2AH = this.item.item.ich2AH 
this.ich2AI = this.item.item.ich2AI 
this.ich2AJ = this.item.item.ich2AJ 
this.ich2AK = this.item.item.ich2AK 
this.ich2AL = this.item.item.ich2AL 
this.ich2AM = this.item.item.ich2AM 
this.ich2AN = this.item.item.ich2AN 
this.ich2AO = this.item.item.ich2AO 
this.ich3A =  this.item.item.ich3A 
this.ich3B =  this.item.item.ich3B 
this.ich3C =  this.item.item.ich3C 
this.ich3D =  this.item.item.ich3D 
this.ich3E =  this.item.item.ich3E 
this.ich3F =  this.item.item.ich3F 
this.ich3G =  this.item.item.ich3G 
this.ich3H =  this.item.item.ich3H 
this.ich3I =  this.item.item.ich3I 
this.ich3J =  this.item.item.ich3J 
this.ich3K =  this.item.item.ich3K 
this.ich3L =  this.item.item.ich3L 
this.ich3M =  this.item.item.ich3M 
this.ich3N =  this.item.item.ich3N 
this.ich3O =  this.item.item.ich3O 
this.ich3P =  this.item.item.ich3P 
this.ich3Q =  this.item.item.ich3Q 
this.ich3R =  this.item.item.ich3R 
this.ich3S =  this.item.item.ich3S 
this.ich3T =  this.item.item.ich3T 
this.ich3U = this.item.item.ich3U 
this.ich3V = this.item.item.ich3V 
this.ich3W = this.item.item.ich3W 
this.ich3X = this.item.item.ich3X 
this.ich3Y = this.item.item.ich3Y 
this.ich3Z = this.item.item.ich3Z 
this.ich3AA = this.item.item.ich3AA 
this.ich3AB = this.item.item.ich3AB 
this.ich3AC = this.item.item.ich3AC 
this.ich3AD = this.item.item.ich3AD 
this.ich3AE = this.item.item.ich3AE 
this.ich3AF = this.item.item.ich3AF 
this.ich3AG = this.item.item.ich3AG 
this.ich3AH = this.item.item.ich3AH 
this.ich3AI = this.item.item.ich3AI 
this.ich3AJ = this.item.item.ich3AJ 
this.ich3AK = this.item.item.ich3AK 
this.ich3AL = this.item.item.ich3AL 
this.ich3AM = this.item.item.ich3AM 
this.ich3AN = this.item.item.ich3AN 
this.ich3AO = this.item.item.ich3AO 
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
        ele.Per = 100
        ele.qty = 1
        ele.WPer = 0
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
          ele.Per = 100
          ele.qty = 1
          ele.WPer = 0
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
    this.calculate()
  }
  
   
   setmaterial(){
     this.material = this.materialList.find(x => x.id == this.materialID)
   }
  
  
  
   calculate(){
     this.price = 0;
     this.materialtotal = "0";
     this.labourtotal = "0";
     this.equipmenttotal = "0";
     this.othertotal = "0";
     this.subcontractortotal = "0";
     if(this.Addedmaterial.length > 0){
      this.Addedmaterial.forEach(element => {
        if(element.qty){
         this.price += (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))
         this.materialtotal = (parseFloat(this.materialtotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
        }
      });
     }
      if(this.Addedlabour.length > 0){
        this.Addedlabour.forEach(element => {
          if(element.qty){
           this.price += (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))
           this.labourtotal = (parseFloat(this.labourtotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
          }
        });
      }
  
      if(this.Addedequipment.length > 0){
        this.Addedequipment.forEach(element => {
          if(element.qty){
           this.price += (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))
           this.equipmenttotal = (parseFloat(this.equipmenttotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)            
          }
        });
      }
      
      if(this.Addedother.length > 0){
        this.Addedother.forEach(element => {
          if(element.qty){
           this.price += (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))
           this.othertotal = (parseFloat(this.othertotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
          }
        });
      }
  
      if(this.Addedsubcontractor.length > 0){
        this.Addedsubcontractor.forEach(element => {
          if(element.qty){
           this.price += (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))
           this.subcontractortotal = (parseFloat(this.subcontractortotal) + (( parseFloat(element.price)  * parseFloat(element.qty))*(element.Per/100))).toFixed(3)
          }
        });
      }
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
     ele.Per = 100
     ele.qty = 1
     ele.note = ""
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
          ele.Per = 100
          ele.qty = 1
          ele.WPer = 0
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
  
  
  //**************************   SUBCONTRACTOR    **************************
  
  
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

  edititem(){
    this.loader()
    this.afs.doc<any>(`boq/boq/projects/${this.pid}/boqitems/${this.item.id}/`).update({
      "item.itemdetails.name" : this.itemname,
      "item.itemdetails.code" : this.itemcode,
      "item.itemdetails.unit" : this.unit,
      "item.itemdetails.price" : this.price,
      "item.itemdetails.materials" : this.Addedmaterial,      
      "item.itemdetails.labours" : this.Addedlabour,
      "item.itemdetails.equipment" : this.Addedequipment,
      "item.itemdetails.other" : this.Addedother,
      "item.itemdetails.subcontractor" : this.Addedsubcontractor,
      "item.itemdetails.materialtotal" : this.materialtotal,
      "item.itemdetails.labourtotal" :   this.labourtotal,
      "item.itemdetails.equipmenttotal" : this.equipmenttotal,
      "item.itemdetails.othertotal" :     this.othertotal,
      "item.itemdetails.subcontractortotal" : this.subcontractortotal,
    }).then(()=>{
      if(this.pic){
        var imagepath
        imagepath =  `${this.pid}/boqitems/${this.item.id}/${this.itemname}`;
    
         var storageRef =  firebase.storage().ref(imagepath);
    
             storageRef.put(this.pic).then(()=>{
               firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
                this.afs.doc<any>(`boq/boq/projects/${this.pid}/boqitems/${this.item.id}/`).update({
                  "item.itemdetails.image" : url
                   });
                   });
    
             });
       }
    }).then(()=>{
      this.loadingController.dismiss();
       this.presentAlert();

    }).catch((err)=>{
      alert(err)
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
        message: 'Updating...',
        duration: 2000
      });
      await loading.present();
    }
  
  
    async presentAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Update',
        message: 'Successfully Updated!',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  
  
    onFileSelected1(event){
      this.pic = event.target.files[0];
    }


    async updataedetails(){
        const loading = await this.loadingController.create({
          message: 'Updating details...',
          duration: 20000,
          spinner: 'bubbles'
        });
        await loading.present();

      this.afs.doc<any>(`boq/boq/projects/${this.pid}/boqitems/${this.item.id}`).update({
      "item.ceiling" : this.ceiling,
      "item.floor": this.floor,
      "item.walls": this.walls,
      "item.cornice": this.cornice,
      "item.skirting": this.skirting,
      "item.shuttering": this.shuttering,
      "item.block": this.block,
      "item.blockdpc": this.blockdpc,
      "item.concrete": this.concrete,
      "item.polythene": this.polythene,
      "item.bitumin": this.bitumin,
      "item.itemsteel": this.itemsteel,
      "item.blockbitumin": this.blockbitumin,
      "item.iqty": this.iqty,
      "item.itempercentage": this.itempercentage,
      "item.completion": this.completion,
      "item.itemprecast": this.itemprecast,
      "item.existing": this.existing,
      "item.existing1": this.existing1,
      "item.existing2": this.existing2,
      "item.tsp": this.tsp,
      "item.bpp": this.bpp,
      "item.spp1": this.spp1,
      "item.spp2": this.spp2,
      "item.spp3": this.spp3,
      "item.spp4": this.spp4,
      "item.tpp": this.tpp,
      "item.bbp": this.bbp,
      "item.sbp1": this.sbp1,
      "item.sbp2": this.sbp2,
      "item.sbp3": this.sbp3,
      "item.sbp4": this.sbp4,
      "item.tep": this.tep,
      "item.tbp": this.tbp,
      "item.bep": this.bep,
      "item.sep1": this.sep1,
      "item.sep2": this.sep2,
      "item.sep3": this.sep3,
      "item.sep4": this.sep4,
      "item.bsp": this.bsp,
      "item.ssp1": this.ssp1,
      "item.ssp2": this.ssp2,
      "item.ssp3": this.ssp3,
      "item.ssp4": this.ssp4,
      "item.FILL_Percentage": this.FILL_Percentage,
      "item.E_Percentage": this.E_Percentage,
      "item.I_DIS": this.I_DIS,
      "item.I_FACTOR": this.I_FACTOR,
      "item.Exp_Percentage": this.Exp_Percentage,
      "item.Concb_Percentage": this.Concb_Percentage,
      "item.ich1A": this.ich1A,
      "item.ich1B": this.ich1B,
      "item.ich1C": this.ich1C,
      "item.ich1D": this.ich1D,
      "item.ich1E": this.ich1E,
      "item.ich1F": this.ich1F,
      "item.ich1G": this.ich1G,
      "item.ich1H": this.ich1H,
      "item.ich1I": this.ich1I,
      "item.ich1J": this.ich1J,
      "item.ich1K": this.ich1K,
      "item.ich1L": this.ich1L,
      "item.ich1M": this.ich1M,
      "item.ich1N": this.ich1N,
      "item.ich1O": this.ich1O,
      "item.ich1P": this.ich1P,
      "item.ich1Q": this.ich1Q,
      "item.ich1R": this.ich1R,
      "item.ich1S": this.ich1S,
      "item.ich1T": this.ich1T,
      "item.ich1U": this.ich1U,
      "item.ich1V": this.ich1V,
      "item.ich1W": this.ich1W,
      "item.ich1X": this.ich1X,
      "item.ich1Y": this.ich1Y,
      "item.ich1Z": this.ich1Z,
      "item.ich1AA": this.ich1AA,
      "item.ich1AB": this.ich1AB,
      "item.ich1AC": this.ich1AC,
      "item.ich1AD": this.ich1AD,
      "item.ich1AE": this.ich1AE,
      "item.ich1AF": this.ich1AF,
      "item.ich1AG": this.ich1AG,
      "item.ich1AH": this.ich1AH,
      "item.ich1AI": this.ich1AI,
      "item.ich1AJ": this.ich1AJ,
      "item.ich1AK": this.ich1AK,
      "item.ich1AL": this.ich1AL,
      "item.ich1AM": this.ich1AM,
      "item.ich1AN": this.ich1AN,
      "item.ich1AO": this.ich1AO,
      "item.ich2A": this.ich2A,
      "item.ich2B": this.ich2B,
      "item.ich2C": this.ich2C,
      "item.ich2D": this.ich2D,
      "item.ich2E": this.ich2E,
      "item.ich2F": this.ich2F,
      "item.ich2G": this.ich2G,
      "item.ich2H": this.ich2H,
      "item.ich2I": this.ich2I,
      "item.ich2J": this.ich2J,
      "item.ich2K": this.ich2K,
      "item.ich2L": this.ich2L,
      "item.ich2M": this.ich2M,
      "item.ich2N": this.ich2N,
      "item.ich2O": this.ich2O,
      "item.ich2P": this.ich2P,
      "item.ich2Q": this.ich2Q,
      "item.ich2R": this.ich2R,
      "item.ich2S": this.ich2S,
      "item.ich2T": this.ich2T,
      "item.ich2U": this.ich2U,
      "item.ich2V": this.ich2V,
      "item.ich2W": this.ich2W,
      "item.ich2X": this.ich2X,
      "item.ich2Y": this.ich2Y,
      "item.ich2Z": this.ich2Z,
      "item.ich2AA": this.ich2AA,
      "item.ich2AB": this.ich2AB,
      "item.ich2AC": this.ich2AC,
      "item.ich2AD": this.ich2AD,
      "item.ich2AE": this.ich2AE,
      "item.ich2AF": this.ich2AF,
      "item.ich2AG": this.ich2AG,
      "item.ich2AH": this.ich2AH,
      "item.ich2AI": this.ich2AI,
      "item.ich2AJ": this.ich2AJ,
      "item.ich2AK": this.ich2AK,
      "item.ich2AL": this.ich2AL,
      "item.ich2AM": this.ich2AM,
      "item.ich2AN": this.ich2AN,
      "item.ich2AO": this.ich2AO,
      "item.ich3A": this.ich3A,
      "item.ich3B": this.ich3B,
      "item.ich3C": this.ich3C,
      "item.ich3D": this.ich3D,
      "item.ich3E": this.ich3E,
      "item.ich3F": this.ich3F,
      "item.ich3G": this.ich3G,
      "item.ich3H": this.ich3H,
      "item.ich3I": this.ich3I,
      "item.ich3J": this.ich3J,
      "item.ich3K": this.ich3K,
      "item.ich3L": this.ich3L,
      "item.ich3M": this.ich3M,
      "item.ich3N": this.ich3N,
      "item.ich3O": this.ich3O,
      "item.ich3P": this.ich3P,
      "item.ich3Q": this.ich3Q,
      "item.ich3R": this.ich3R,
      "item.ich3S": this.ich3S,
      "item.ich3T": this.ich3T,
      "item.ich3U": this.ich3U,
      "item.ich3V": this.ich3V,
      "item.ich3W": this.ich3W,
      "item.ich3X": this.ich3X,
      "item.ich3Y": this.ich3Y,
      "item.ich3Z": this.ich3Z,
      "item.ich3AA": this.ich3AA,
      "item.ich3AB": this.ich3AB,
      "item.ich3AC": this.ich3AC,
      "item.ich3AD": this.ich3AD,
      "item.ich3AE": this.ich3AE,
      "item.ich3AF": this.ich3AF,
      "item.ich3AG": this.ich3AG,
      "item.ich3AH": this.ich3AH,
      "item.ich3AI": this.ich3AI,
      "item.ich3AJ": this.ich3AJ,
      "item.ich3AK": this.ich3AK,
      "item.ich3AL": this.ich3AL,
      "item.ich3AM": this.ich3AM,
      "item.ich3AN": this.ich3AN,
      "item.ich3AO": this.ich3AO,
     }).then(()=>{
       loading.dismiss().then(()=>{
         alert("Successfully updated!")
       })
     })

    }

}
