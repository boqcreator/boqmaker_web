import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-editboqitem',
  templateUrl: './editboqitem.page.html',
  styleUrls: ['./editboqitem.page.scss'],
})
export class EditboqitemPage implements OnInit {
  itemID;
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
    this.itemID = this.route.snapshot.paramMap.get('id')
    // this.arrayID = id.split("&")
    this.afs.doc<any>(`boq/boq/boqitems/${this.itemID}`).get().subscribe(value =>{

       this.itemname = value.data().name;
       value.data().code  ? this.itemcode = value.data().code : "";
       this.unit = value.data().unit;
       this.price = value.data().price;
       value.data().image ? this.image = value.data().image : "" ;
       value.data().materials ? this.Addedmaterial = value.data().materials : "";
       value.data().labours ? this.Addedlabour = value.data().labours : "";
       value.data().equipment ? this.Addedequipment = value.data().equipment : "";
       value.data().other ? this.Addedother = value.data().other: "";
       value.data().subcontractor ? this.Addedsubcontractor = value.data().subcontractor : "";
       value.data().materialtotal ? this.materialtotal = value.data().materialtotal : "";
       value.data().labourtotal ? this.labourtotal = value.data().labourtotal : "";
       value.data().equipmenttotal ? this.equipmenttotal = value.data().equipmenttotal : "";
       value.data().othertotal ? this.othertotal = value.data().othertotal : "";
       value.data().subcontractortotal ? this.subcontractortotal = value.data().subcontractortotal : "";
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
         additionalsupplier : doc.payload.doc.data().additionalsupplier,
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
         additionalsupplier : doc.payload.doc.data().additionalsupplier,
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
         additionalsupplier : doc.payload.doc.data().additionalsupplier,
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
         additionalsupplier : doc.payload.doc.data().additionalsupplier,
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
    this.afs.doc<any>(`boq/boq/boqitems/${this.itemID}`).update({
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
    }).then(()=>{
      if(this.pic){
        var imagepath
        imagepath =  `boqitems/${this.arrayID[3]}/${this.itemname}`;
    
         var storageRef =  firebase.storage().ref(imagepath);
    
             storageRef.put(this.pic).then(()=>{
               firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
                   this.afs.doc(`boq/boq/boqitems/${this.itemID}`).update({
                    image : url
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

}
