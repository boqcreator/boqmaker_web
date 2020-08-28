import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { BoqitemlibPage } from '../boqitemlib/boqitemlib.page';
@Component({
  selector: 'app-addboqitem',
  templateUrl: './addboqitem.page.html',
  styleUrls: ['./addboqitem.page.scss'],
})
export class AddboqitemPage implements OnInit {
  segment = "cat"
  segment2 = "m"
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
  itemcode = "";
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
  materialtotal = "0";

  LcatList=[];
  LsubcatList= [];
  labourList = [];

  LCatID;
  LSubcatID;
  labourID;

  labour= [];
  labourtotal = "0";


  EcatList=[];
  EsubcatList= [];
  equipmentList = [];

  ECatID;
  ESubcatID;
  equipmentID;

  equipment= [];
  equipmenttotal= "0";


  OcatList=[];
  OsubcatList= [];
  otherList = [];

  OCatID;
  OSubcatID;
  otherID;

  other= [];
  othertotal = "0";

  ScatList=[];
  SsubcatList= [];
  subcontractorList = [];

  SCatID;
  SSubcatID;
  subcontractorID;

  subcontractor= [];
  subcontractortotal = "0";

  pic;

  Addedmaterial = [];
  Addedlabour = [];
  Addedequipment = [];
  Addedsubcontractor = [];
  Addedother = [];




boq1A = 0;
boq1B = 0;
boq1C = 0;
boq1D = 0;
boq1E = 0;
boq1F = 0;
boq1G = 0;
boq1H = 0;
boq1I = 0;
boq1J = 0;
boq1K = 0;
boq1L = 0;
boq1M = 0;
boq1N = 0;
boq1O = 0;
boq1P = 0;
boq1Q = 0;
boq1R = 0;
boq1S = 0;
boq1T = 0;
boq1U = '';
boq1V = '';
boq1W = '';
boq1X = '';
boq1Y = '';
boq1Z = '';
boq1AA = '';
boq1AB = '';
boq1AC = '';
boq1AD = '';
boq1AE = '';
boq1AF = '';
boq1AG = '';
boq1AH = '';
boq1AI = '';
boq1AJ = '';
boq1AK = '';
boq1AL = '';
boq1AM = '';
boq1AN = '';
boq1AO = '';

boq2A = 0;
boq2B = 0;
boq2C = 0;
boq2D = 0;
boq2E = 0;
boq2F = 0;
boq2G = 0;
boq2H = 0;
boq2I = 0;
boq2J = 0;
boq2K = 0;
boq2L = 0;
boq2M = 0;
boq2N = 0;
boq2O = 0;
boq2P = 0;
boq2Q = 0;
boq2R = 0;
boq2S = 0;
boq2T = 0;
boq2U = '';
boq2V = '';
boq2W = '';
boq2X = '';
boq2Y = '';
boq2Z = '';
boq2AA = '';
boq2AB = '';
boq2AC = '';
boq2AD = '';
boq2AE = '';
boq2AF = '';
boq2AG = '';
boq2AH = '';
boq2AI = '';
boq2AJ = '';
boq2AK = '';
boq2AL = '';
boq2AM = '';
boq2AN = '';
boq2AO = '';

boq3A = 0;
boq3B = 0;
boq3C = 0;
boq3D = 0;
boq3E = 0;
boq3F = 0;
boq3G = 0;
boq3H = 0;
boq3I = 0;
boq3J = 0;
boq3K = 0;
boq3L = 0;
boq3M = 0;
boq3N = 0;
boq3O = 0;
boq3P = 0;
boq3Q = 0;
boq3R = 0;
boq3S = 0;
boq3T = 0;
boq3U = '';
boq3V = '';
boq3W = '';
boq3X = '';
boq3Y = '';
boq3Z = '';
boq3AA = '';
boq3AB = '';
boq3AC = '';
boq3AD = '';
boq3AE = '';
boq3AF = '';
boq3AG = '';
boq3AH = '';
boq3AI = '';
boq3AJ = '';
boq3AK = '';
boq3AL = '';
boq3AM = '';
boq3AN = '';
boq3AO = '';

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
      this.getlabourCat()
      this.getequipmentCat()
      this.getotherCat()
      this.getsubcontractorCat()
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
            name : this.itemname,
            code : this.itemcode,
            unit : this.unit,
            price : this.price,
            materials : this.Addedmaterial,      
            labours : this.Addedlabour,
            equipment : this.Addedequipment,
            other : this.Addedother,
            subcontractor : this.Addedsubcontractor,
            materialtotal : this.materialtotal,
            labourtotal :   this.labourtotal,
            equipmenttotal : this.equipmenttotal,
            othertotal :     this.othertotal,
            subcontractortotal : this.subcontractortotal,
            boq1A : this.boq1A,
            boq1B : this.boq1B,
            boq1C : this.boq1C,
            boq1D : this.boq1D,
            boq1E : this.boq1E,
            boq1F : this.boq1F,
            boq1G : this.boq1G,
            boq1H : this.boq1H,
            boq1I : this.boq1I,
            boq1J : this.boq1J,
            boq1K : this.boq1K,
            boq1L : this.boq1L,
            boq1M : this.boq1M,
            boq1N : this.boq1N,
            boq1O : this.boq1O,
            boq1P : this.boq1P,
            boq1Q : this.boq1Q,
            boq1R : this.boq1R,
            boq1S : this.boq1S,
            boq1T : this.boq1T,
            boq1U : this.boq1U,
            boq1V : this.boq1V,
            boq1W : this.boq1W,
            boq1X : this.boq1X,
            boq1Y : this.boq1Y,
            boq1Z : this.boq1Z,
            boq1AA : this.boq1AA,
            boq1AB : this.boq1AB,
            boq1AC : this.boq1AC,
            boq1AD : this.boq1AD,
            boq1AE : this.boq1AE,
            boq1AF : this.boq1AF,
            boq1AG : this.boq1AG,
            boq1AH : this.boq1AH,
            boq1AI : this.boq1AI,
            boq1AJ : this.boq1AJ,
            boq1AK : this.boq1AK,
            boq1AL : this.boq1AL,
            boq1AM : this.boq1AM,
            boq1AN : this.boq1AN,
            boq1AO : this.boq1AO,

            boq2A : this.boq2A,
            boq2B : this.boq2B,
            boq2C : this.boq2C,
            boq2D : this.boq2D,
            boq2E : this.boq2E,
            boq2F : this.boq2F,
            boq2G : this.boq2G,
            boq2H : this.boq2H,
            boq2I : this.boq2I,
            boq2J : this.boq2J,
            boq2K : this.boq2K,
            boq2L : this.boq2L,
            boq2M : this.boq2M,
            boq2N : this.boq2N,
            boq2O : this.boq2O,
            boq2P : this.boq2P,
            boq2Q : this.boq2Q,
            boq2R : this.boq2R,
            boq2S : this.boq2S,
            boq2T : this.boq2T,
            boq2U : this.boq2U,
            boq2V : this.boq2V,
            boq2W : this.boq2W,
            boq2X : this.boq2X,
            boq2Y : this.boq2Y,
            boq2Z : this.boq2Z,
            boq2AA : this.boq2AA,
            boq2AB : this.boq2AB,
            boq2AC : this.boq2AC,
            boq2AD : this.boq2AD,
            boq2AE : this.boq2AE,
            boq2AF : this.boq2AF,
            boq2AG : this.boq2AG,
            boq2AH : this.boq2AH,
            boq2AI : this.boq2AI,
            boq2AJ : this.boq2AJ,
            boq2AK : this.boq2AK,
            boq2AL : this.boq2AL,
            boq2AM : this.boq2AM,
            boq2AN : this.boq2AN,
            boq2AO : this.boq2AO,

            boq3A : this.boq3A,
            boq3B : this.boq3B,
            boq3C : this.boq3C,
            boq3D : this.boq3D,
            boq3E : this.boq3E,
            boq3F : this.boq3F,
            boq3G : this.boq3G,
            boq3H : this.boq3H,
            boq3I : this.boq3I,
            boq3J : this.boq3J,
            boq3K : this.boq3K,
            boq3L : this.boq3L,
            boq3M : this.boq3M,
            boq3N : this.boq3N,
            boq3O : this.boq3O,
            boq3P : this.boq3P,
            boq3Q : this.boq3Q,
            boq3R : this.boq3R,
            boq3S : this.boq3S,
            boq3T : this.boq3T,
            boq3U : this.boq3U,
            boq3V : this.boq3V,
            boq3W : this.boq3W,
            boq3X : this.boq3X,
            boq3Y : this.boq3Y,
            boq3Z : this.boq3Z,
            boq3AA : this.boq3AA,
            boq3AB : this.boq3AB,
            boq3AC : this.boq3AC,
            boq3AD : this.boq3AD,
            boq3AE : this.boq3AE,
            boq3AF : this.boq3AF,
            boq3AG : this.boq3AG,
            boq3AH : this.boq3AH,
            boq3AI : this.boq3AI,
            boq3AJ : this.boq3AJ,
            boq3AK : this.boq3AK,
            boq3AL : this.boq3AL,
            boq3AM : this.boq3AM,
            boq3AN : this.boq3AN,
            boq3AO : this.boq3AO,
       }).then((value)=>{
         if(this.pic){
          var imagepath
          imagepath =  `boqitems/${value.id}/${this.itemname}`;
      
           var storageRef =  firebase.storage().ref(imagepath);
      
               storageRef.put(this.pic).then(()=>{
                 firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
                     this.afs.doc(`boq/boq/boqitemscat/${this.CatID}/subcat/${this.SubcatID}/subsubcat/${this.SubsubcatID}/boqitems/${value.id}`).update({
                      image : url
                     });
                     });
      
               });
         }else{
          this.afs.doc(`boq/boq/boqitemscat/${this.CatID}/subcat/${this.SubcatID}/subsubcat/${this.SubsubcatID}/boqitems/${value.id}`).update({
            image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
           });
         }
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

  close(){
    this.modal.dismiss();
  }

  onFileSelected1(event){
    this.pic = event.target.files[0];
  }

  async itemlibrary(){
      const modal = await this.modal.create({
      component: BoqitemlibPage,
      });
    
      await modal.present();
      
      const data = await modal.onDidDismiss();
      if(data){
        this.itemname = data.data.name
        this.itemcode = data.data.code
        this.unit = data.data.unit
        this.price =data.data.price
      }
   
  }

}
