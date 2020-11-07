import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { AddmaterialtocostPage } from '../addmaterialtocost/addmaterialtocost.page';
import { AddlabourtocostPage } from '../addlabourtocost/addlabourtocost.page';
import { AddequipmenttocostPage } from '../addequipmenttocost/addequipmenttocost.page';
import { AddsubcontractortocostPage } from '../addsubcontractortocost/addsubcontractortocost.page';
import { AddothertocostPage } from '../addothertocost/addothertocost.page';
import * as firebase from "firebase"
import { CostgraphPage } from '../costgraph/costgraph.page';

@Component({
  selector: 'app-costdetails',
  templateUrl: './costdetails.page.html',
  styleUrls: ['./costdetails.page.scss'],
})
export class CostdetailsPage implements OnInit {
  segment2="m"
  myProjectList = [];
  myProjectID;
  segment = "boq";
  

  IcatList = [];
  IcatID = [];
  IsubcatList = [];
  IsubcatID = [];
  IsubsubcatList = [];
  IsubsubcatID = [];
  ItemList = [];
  ItemID = [];
  totalPrice = 0;
  Item= {
    name : "",
    itemID : "",
    catID : "",
    subcatID : "",
    subsubcatID : "",
    qty : 0,
    aqty : 0,
    aper : 0,
    unit : "",
    rate : 0,
    updatedon : null,
    mupdatedon : null,
    eupdatedon : null,
    lupdatedon : null,
    oupdatedon : null,
    supdatedon : null,
    arate : 0,
    total : 0,
    material : [],
    labour:[],
    equipment:[],
    subcontractor:[],
    other:[],
    MtotalPrice : 0,
    MatotalPrice : 0,
    LtotalPrice : 0,
    LatotalPrice : 0,
    EtotalPrice : 0,
    EatotalPrice : 0,
    OtotalPrice : 0,
    OatotalPrice : 0,
    StotalPrice : 0,
    SatotalPrice : 0,
    Grandtotal : 0,
  }
  ItemsList=[]

  MtotalPrice = 0;
  MatotalPrice = 0;
  

  EcatList = [];
  EcatID = [];
  EsubcatList = [];
  EsubcatID = [];
  EsubsubcatList = [];
  EsubsubcatID = [];
  EItemList = [];
  EItem={id:"",
  arate:0,
  aamount:0,
  aqty:0,
  Exceltotal:0,
  amaterial:0,
  alabour:0,
  aequipment:0,
  asubcontractor:0,
  aother:0,
  code  : 0,
  cat  : 0,
  subcat  : 0,
  subsubcat  : 0,
  des : 0,
  qty : 0,
  unit : 0,
  rate : 0,
  amount : 0,
  material : 0,
  labour : 0,
  equipment : 0,
  subcontractor : 0,
  other : 0}
  segmentexcel ="m";
  constructor(private menu : MenuController,
    private router : Router,
    private afs : AngularFirestore,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private storage : Storage) { 
    this.menu.enable(false)
    this.getProjects();
  }

  ngOnInit() {
  }

  getProjects(){
    this.afs.collection(`boq/boq/projects`).get().subscribe(value =>{  
      value.docs.forEach(element => {
        this.myProjectList.push({
          pid : element.ref.id,
          id : element.data().id,
          name : element.data().name,
        })
      });
      this.storage.get("project").then(proj=>{
        if(proj != null){
         this.myProjectID = proj
         this.getitemCat()
         this.excelgetcat()
        }
      })
    })
    
 }

 getitemCat(){
  this.IcatList =[]
          this.afs.collection<any>(`boq/boq/projects/${this.myProjectID}/boqitemsCat`).get().subscribe(value =>{
            if(value.docs.length > 0){
              value.forEach(doc=>{
                const index = this.IcatList.findIndex(x => x.id == doc.ref.id)
                if(index === -1){
                  this.IcatList.push(
                    {name : doc.data().name ,
                     id : doc.ref.id})
                }
                })
                this.storage.get(`${this.myProjectID}myItemCatID`).then(value =>{
                  if(value !== null){
                    this.IcatID = value
                  }
                })
            }
           
          })
      
 }

 getitemsubcat(){
  this.IsubcatList =[]
  this.storage.set(`${this.myProjectID}myItemCatID`, this.IcatID)

    this.afs.collection<any>(`boq/boq/projects/${this.myProjectID}/boqitemsSubcat`, ref => ref.where("catID", "==", this.IcatID)).get().subscribe(value =>{
      if(value.docs.length > 0){
        value.forEach(doc=>{
          const index = this.IsubcatList.findIndex(x => x.id == doc.ref.id)
          if(index === -1){
            this.IsubcatList.push(
              {name : doc.data().name ,
               id : doc.ref.id})
          }
          })
          this.storage.get(`${this.myProjectID}myItemSubcatID`).then(value =>{
            if(value !== null){
              this.IsubcatID = value
            }
          })

      }
  })
 }

 getitemsubsubcat(){
  this.IsubsubcatList =[]
  this.storage.set(`${this.myProjectID}myItemSubcatID`, this.IsubcatID)
      this.afs.collection<any>(`boq/boq/projects/${this.myProjectID}/boqitemsSubsubcat`,ref => ref.where("subcatID","==", this.IsubcatID )).get().subscribe(value =>{
        if(value.docs.length > 0){
          value.forEach(doc=>{
            const index = this.IsubsubcatList.findIndex(x => x.id == doc.ref.id)
            if(index === -1){
              this.IsubsubcatList.push(
                {name : doc.data().name ,
                 id : doc.ref.id})
            }
            })
            this.storage.get(`${this.myProjectID}myItemSubsubcatID`).then(value =>{
              if(value !== null){
                this.IsubsubcatID = value
              }
            })
        }
      
  })
 }

 async getitem(){
   this.ItemsList= []
  const loading = await this.loadingController.create({
    message: 'Loading data...',
    duration: 12000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.storage.set(`${this.myProjectID}myItemSubsubcatID`, this.IsubsubcatID)
  this.ItemList =[]
  this.afs.collection(`boq/boq/projects/${this.myProjectID}/boqitems/`, ref => ref.where("item.itemdetails.SubsubcatID", "==",this.IsubsubcatID)).get().subscribe(value =>{
    if(value.docs.length > 0){
      var itemsProcessed = 0;

      var bar = new Promise((resolve, reject) => {
        value.docs.forEach((doc , index, array) =>{
          this.afs.doc<any>(`boq/boq/projects/${this.myProjectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
            const qty = this.calculateFinalQuantity(
              area.data().Unit_length,area.data().Unit_width,area.data().Unit_height,
              area.data().fill,area.data().No_of_units,doc.data().item.FILL_Percentage,
              area.data().exc,doc.data().item.E_Percentage,area.data().R,area.data().RO,area.data().Floor_width_1,area.data().Floor_length_1,area.data().Floor_width_2,
              area.data().Floor_length_2,area.data().Floor_width_3,area.data().Floor_length_3,
              area.data().Floor_width_4,area.data().Floor_length_4,0,area.data().areaF,doc.data().item.floor,
              area.data().L1,area.data().L2,area.data().L3,area.data().L4,area.data().L5,area.data().L6,area.data().L7,area.data().L8,area.data().areaB,
              doc.data().item.blockdpc,0,area.data().areaC,doc.data().item.ceiling,
              area.data().Wall_per_lengthA,area.data().Wall_per_lengthB,area.data().Wall_per_lengthC,
              area.data().Wall_per_lengthD,area.data().Wall_per_lengthE,area.data().Wall_per_lengthF,
              area.data().Wall_per_lengthG,area.data().Wall_per_lengthH,0,area.data().areaW,0,
              doc.data().item.walls,area.data().PCLA,area.data().PCLB,area.data().PCLC,area.data().PCLD,
              area.data().PCLE,area.data().PCLF,area.data().PCLG,area.data().PCLH,0,area.data().areaCOR,
              doc.data().item.cornice,area.data().skirting_per_lengthA,area.data().skirting_per_lengthB,
              area.data().skirting_per_lengthC,area.data().skirting_per_lengthD,area.data().skirting_per_lengthE,
              area.data().skirting_per_lengthF,area.data().skirting_per_lengthG,area.data().skirting_per_lengthH,
              0,area.data().areaS,
              0,doc.data().item.skirting,area.data().areaB,doc.data().item.block,area.data().bit,
              doc.data().item.blockbitumin,
              area.data().conc,doc.data().item.concrete,area.data().EXTRACONCBO,area.data().EXTRACONCB,
              doc.data().item.Concb_Percentage,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,
              doc.data().item.ssp4,doc.data().item.ssp2,
              area.data().shutt,area.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering,doc.data().item.tbp,
              doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,
              doc.data().item.bitumin,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,
              doc.data().item.sep4,doc.data().item.sep2,area.data().EXTRAEXP,doc.data().item.sep1,
              doc.data().item.Exp_Percentage,doc.data().item.itemprecast,area.data().precast,
              doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,
              doc.data().item.spp1,area.data().polyth,
              doc.data().item.spp2,doc.data().item.polythene,area.data().Y8,area.data().Y10,area.data().Y12,
              area.data().Y16,area.data().Y20,area.data().Y25,area.data().Y32,area.data().steel,
              doc.data().item.itemsteel,doc.data().item.iqty,doc.data().item.I_FACTOR
              )
              const mainindex = this.ItemsList.findIndex(x => x.itemID == doc.data().itemID)
              if(mainindex === -1){
               var material = []
               var labour = []
               var equipment = []
               var subcontractor = []
               var other = []
               var MtotalPrice = 0;
               var MatotalPrice = 0;
               var EtotalPrice = 0;
               var EatotalPrice = 0;
               var LtotalPrice = 0;
               var LatotalPrice = 0;
               var OtotalPrice = 0;
               var OatotalPrice = 0;
               var StotalPrice = 0;
               var SatotalPrice = 0;
                doc.data().item.itemdetails.materials.forEach(ele =>{
                  MtotalPrice += (ele.qty*ele.price)
                    material.push({
                      name: ele.name,
                      id : ele.id,
                      qty : ele.qty,
                      unit : ele.unit,
                      rate : ele.price,
                      etotal : (ele.qty*ele.price),
                      aqty : 0,
                      atotal : 0,
       
                  })
                 })

                 if( doc.data().item.itemdetails.equipment){
                  doc.data().item.itemdetails.equipment.forEach(ele =>{
                    EtotalPrice += (ele.qty*ele.price)
                    
                      equipment.push({
                        name: ele.name,
                        id : ele.id,
                        qty : ele.qty,
                        unit : ele.unit,
                        rate : ele.price,
                        etotal : (ele.qty*ele.price),
                        aqty : 0,
                        atotal : 0,
                    
                    })
                   })
                 }

                 if( doc.data().item.itemdetails.labours){
                  doc.data().item.itemdetails.labours.forEach(ele =>{
                    LtotalPrice += (ele.qty*ele.price)
                    
                      labour.push({
                        name: ele.name,
                        id : ele.id,
                        qty : ele.qty,
                        unit : ele.unit,
                        rate : ele.price,
                        etotal : (ele.qty*ele.price),
                        aqty : 0,
                        atotal : 0,

                    })
                   })
                 }

                 if( doc.data().item.itemdetails.other){
                  doc.data().item.itemdetails.other.forEach(ele =>{
                    OtotalPrice += (ele.qty*ele.price)
                 
                      other.push({
                        name: ele.name,
                        id : ele.id,
                        qty : ele.qty,
                        unit : ele.unit,
                        rate : ele.price,
                        etotal : (ele.qty*ele.price),
                        aqty : 0,
                        atotal : 0,
                   
                    })
                   })
                 }

                 if( doc.data().item.itemdetails.subcontractor){
                  doc.data().item.itemdetails.subcontractor.forEach(ele =>{
                    StotalPrice += (ele.qty*ele.price)
                  
                      subcontractor.push({
                        name: ele.name,
                        id : ele.id,
                        qty : ele.qty,
                        unit : ele.unit,
                        rate : ele.price,
                        etotal : (ele.qty*ele.price),
                        aqty : 0,
                        atotal : 0,
                    
                    })
                   })
                 }

                this.ItemsList.push({
                  name : doc.data().item.itemdetails.name,
                  itemID : doc.data().itemID,
                  catID : doc.data().item.itemdetails.CatID,
                  subcatID : doc.data().item.itemdetails.SubcatID,
                  subsubcatID : doc.data().item.itemdetails.SubsubcatID,
                  qty :qty,
                  unit : doc.data().item.itemdetails.unit,
                  rate : doc.data().item.itemdetails.price.toFixed(3),
                  total : qty*doc.data().item.itemdetails.price,
                  material : material,
                  labour:labour,
                  equipment:equipment,
                  subcontractor:subcontractor,
                  other:other,
                  MtotalPrice : MtotalPrice,
                  MatotalPrice : MatotalPrice,
                  LtotalPrice : LtotalPrice,
                  LatotalPrice : LatotalPrice,
                  EtotalPrice : EtotalPrice,
                  EatotalPrice : EatotalPrice,
                  OtotalPrice : OtotalPrice,
                  OatotalPrice : OatotalPrice,
                  StotalPrice : StotalPrice,
                  SatotalPrice : SatotalPrice,
                })
              }else{
                this.ItemsList[mainindex].total += qty*doc.data().item.itemdetails.price;
                this.ItemsList[mainindex].qty +=qty;
                doc.data().item.itemdetails.materials.forEach(mdat =>{
                  const index =  this.ItemsList[mainindex].material.findIndex(x => x.id == mdat.id)
                  if(index === -1){
                    this.ItemsList[mainindex].MtotalPrice += (mdat.qty*mdat.price)
                   
                      this.ItemsList[mainindex].material.push({
                      name: mdat.name,
                      id : mdat.id,
                      qty : mdat.qty,
                      unit : mdat.unit,
                      rate : mdat.price,
                      etotal : (mdat.qty*mdat.price),
                      aqty : 0,
                      atotal : 0,
               
                  })
                  }
                  // else{
                  //   this.ItemsList[mainindex].material[index].qty += mdat.qty;
                  //   this.ItemsList[mainindex].material[index].etotal += (mdat.qty*mdat.price)
                  //   this.ItemsList[mainindex].MtotalPrice += (mdat.qty*mdat.price)
                  // }

                 })

                  if(doc.data().item.itemdetails.labours){
                    doc.data().item.itemdetails.labours.forEach(mdat =>{
                      const index =  this.ItemsList[mainindex].labour.findIndex(x => x.id == mdat.id)
                      if(index === -1){
                        this.ItemsList[mainindex].LtotalPrice += (mdat.qty*mdat.price)
                      
                        this.ItemsList[mainindex].labour.push({
                          name: mdat.name,
                          id : mdat.id,
                          qty : mdat.qty,
                          unit : mdat.unit,
                          rate : mdat.price,
                          etotal : (mdat.qty*mdat.price),
                          aqty : 0,
                          atotal : 0,
                     
                        })
                      }
                      // else{
                      //   this.ItemsList[mainindex].labour[index].qty += mdat.qty;
                      //   this.ItemsList[mainindex].labour[index].etotal += (mdat.qty*mdat.price)
                      //   this.ItemsList[mainindex].LtotalPrice += (mdat.qty*mdat.price)
                      // }
  
                     })
                  }


                  if(doc.data().item.itemdetails.equipment){
                    doc.data().item.itemdetails.equipment.forEach(mdat =>{
                      const index =  this.ItemsList[mainindex].equipment.findIndex(x => x.id == mdat.id)
                      if(index === -1){
                        this.ItemsList[mainindex].EtotalPrice += (mdat.qty*mdat.price)
                      
                        this.ItemsList[mainindex].equipment.push({
                          name: mdat.name,
                          id : mdat.id,
                          qty : mdat.qty,
                          unit : mdat.unit,
                          rate : mdat.price,
                          etotal : (mdat.qty*mdat.price),
                          aqty : 0,
                          atotal : 0,
                    
                        })
                      }
                      // else{
                      //   this.ItemsList[mainindex].equipment[index].qty += mdat.qty;
                      //   this.ItemsList[mainindex].equipment[index].etotal += (mdat.qty*mdat.price)
                      //   this.ItemsList[mainindex].EtotalPrice += (mdat.qty*mdat.price)
                      // }
  
                     })
                  }


                  if(doc.data().item.itemdetails.other){
                    doc.data().item.itemdetails.other.forEach(mdat =>{
                      const index =  this.ItemsList[mainindex].other.findIndex(x => x.id == mdat.id)
                      if(index === -1){
                        this.ItemsList[mainindex].OtotalPrice += (mdat.qty*mdat.price)
                        
                        this.ItemsList[mainindex].other.push({
                          name: mdat.name,
                          id : mdat.id,
                          qty : mdat.qty,
                          unit : mdat.unit,
                          rate : mdat.price,
                          etotal : (mdat.qty*mdat.price),
                          aqty : 0,
                         atotal : 0,

                        })
                      }
                      // else{
                      //   this.ItemsList[mainindex].other[index].qty += mdat.qty;
                      //   this.ItemsList[mainindex].other[index].etotal += (mdat.qty*mdat.price)
                      //   this.ItemsList[mainindex].OtotalPrice += (mdat.qty*mdat.price)
                      //   }
  
                     })
                  }



                  if(doc.data().item.itemdetails.subcontractor){
                    doc.data().item.itemdetails.subcontractor.forEach(mdat =>{
                      const index =  this.ItemsList[mainindex].subcontractor.findIndex(x => x.id == mdat.id)
                      if(index === -1){
                        this.ItemsList[mainindex].StotalPrice += (mdat.qty*mdat.price)
                      
                        this.ItemsList[mainindex].subcontractor.push({
                          name: mdat.name,
                          id : mdat.id,
                          qty : mdat.qty,
                          unit : mdat.unit,
                          rate : mdat.price,
                          etotal : (mdat.qty*mdat.price),
                          aqty : 0,
                          atotal : 0,

                        })
                      }
                      // else{
                      //   this.ItemsList[mainindex].subcontractor[index].qty += mdat.qty;
                      //   this.ItemsList[mainindex].subcontractor[index].etotal += (mdat.qty*mdat.price)
                      //   this.ItemsList[mainindex].StotalPrice += (mdat.qty*mdat.price)
                      // }
  
                     })
                  }
              }

              if (index === array.length -1) resolve();
          })

        })
    });
    
    bar.then(async () => {
   await  loading.dismiss()
    });
    
}
})

 }

 async getact(){
  const loading = await this.loadingController.create({
    message: 'Loading data...',
    duration: 12000,
    spinner: 'bubbles'
  });
  await loading.present();
if(this.Item.material){
  this.Item.material.forEach(element => {
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/materials/${element.id}`).get().subscribe(actmat=>{
      element.aqty = actmat.data().aqty;
      element.atotal = actmat.data().atotal;
    })
  });
}
if(this.Item.equipment){
  this.Item.equipment.forEach(element => {
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/equipment/${element.id}`).get().subscribe(actmat=>{
      element.aqty = actmat.data().aqty;
      element.atotal = actmat.data().atotal;
    })
  });
}
if(this.Item.labour){
  this.Item.labour.forEach(element => {
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/labours/${element.id}`).get().subscribe(actmat=>{
      element.aqty = actmat.data().aqty;
      element.atotal = actmat.data().atotal;
    })
  });
}
if(this.Item.other){
  this.Item.other.forEach(element => {
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/other/${element.id}`).get().subscribe(actmat=>{
      element.aqty = actmat.data().aqty;
      element.atotal = actmat.data().atotal;
    })
  });
}

if(this.Item.subcontractor){
  this.Item.subcontractor.forEach(element => {
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/subcontractor/${element.id}`).get().subscribe(actmat=>{
      element.aqty = actmat.data().aqty;
      element.atotal = actmat.data().atotal;
    })
  });
}

this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).get().subscribe(value =>{
  if(value.exists){
    if(value.data().aqty){
      this.Item.aqty = value.data().aqty
    }
    if(value.data().arate){
      this.Item.arate = value.data().arate
    }
    if(value.data().aper){
      this.Item.aper = value.data().aper
    }
    
    if(value.data().mupdatedon){
      this.Item.mupdatedon = value.data().mupdatedon
    }
    if(value.data().lupdatedon){
      this.Item.lupdatedon = value.data().lupdatedon
    }
    if(value.data().eupdatedon){
      this.Item.eupdatedon = value.data().eupdatedon
    }
    if(value.data().oupdatedon){
      this.Item.oupdatedon = value.data().oupdatedon
    }
    if(value.data().supdatedon){
      this.Item.supdatedon = value.data().supdatedon
    }


    if(value.data().extramaterial){
      value.data().extramaterial.forEach(element => {
        this.Item.material.push({
          name: element.name,
          id : element.id,
          qty : element.qty,
          unit : element.unit,
          rate : element.rate,
          etotal : element.etotal,
          aqty : element.aqty,
          atotal : element.atotal,
      })
      });
    }

    if(value.data().extralabour){
      value.data().extralabour.forEach(element => {
        this.Item.labour.push({
          name: element.name,
          id : element.id,
          qty : element.qty,
          unit : element.unit,
          rate : element.rate,
          etotal : element.etotal,
          aqty : element.aqty,
          atotal : element.atotal,
      })
      });
    }

    if(value.data().extraequipment){
      value.data().extraequipment.forEach(element => {
        this.Item.equipment.push({
          name: element.name,
          id : element.id,
          qty : element.qty,
          unit : element.unit,
          rate : element.rate,
          etotal : element.etotal,
          aqty : element.aqty,
          atotal : element.atotal,
      })
      });
    }

    if(value.data().extraother){
      value.data().extraother.forEach(element => {
        this.Item.other.push({
          name: element.name,
          id : element.id,
          qty : element.qty,
          unit : element.unit,
          rate : element.rate,
          etotal : element.etotal,
          aqty : element.aqty,
          atotal : element.atotal,
      })
      });
    }

    if(value.data().extrasubcontractor){
      value.data().extrasubcontractor.forEach(element => {
        this.Item.subcontractor.push({
          name: element.name,
          id : element.id,
          qty : element.qty,
          unit : element.unit,
          rate : element.rate,
          etotal : element.etotal,
          aqty : element.aqty,
          atotal : element.atotal,
      })
      });
    }
  }
})

loading.dismiss();
 }

 setProject(){
  this.storage.set("project" , this.myProjectID)

  // CREATING ACT B.O.Q ITEMS
  // this.afs.collection(`boq/boq/projects/${this.myProjectID}/actboqitems`).get().subscribe(value=>{
  //   if(value.docs.length > 0){
  //     if(this.IcatList.length == 0){
  //       this.getitemCat()
  //     }
  //   }else{
  // this.getItemReportEst()
  //   }
  // })
 }


 async getItemReportEst(){
     const loading = await this.loadingController.create({
       message: 'Loading data...',
       duration: 12000,
       spinner: 'bubbles'
     });
     await loading.present();
            this.afs.collection(`boq/boq/projects/${this.myProjectID}/boqitems/`).get().subscribe(value =>{
              if(value.docs.length > 0){
                var itemsProcessed = 0;

                var bar = new Promise((resolve, reject) => {
                  value.docs.forEach((doc , index, array) =>{
                    this.afs.doc<any>(`boq/boq/projects/${this.myProjectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
                      const qty = this.calculateFinalQuantity(
                        area.data().Unit_length,area.data().Unit_width,area.data().Unit_height,
                        area.data().fill,area.data().No_of_units,doc.data().item.FILL_Percentage,
                        area.data().exc,doc.data().item.E_Percentage,area.data().R,area.data().RO,area.data().Floor_width_1,area.data().Floor_length_1,area.data().Floor_width_2,
                        area.data().Floor_length_2,area.data().Floor_width_3,area.data().Floor_length_3,
                        area.data().Floor_width_4,area.data().Floor_length_4,0,area.data().areaF,doc.data().item.floor,
                        area.data().L1,area.data().L2,area.data().L3,area.data().L4,area.data().L5,area.data().L6,area.data().L7,area.data().L8,area.data().areaB,
                        doc.data().item.blockdpc,0,area.data().areaC,doc.data().item.ceiling,
                        area.data().Wall_per_lengthA,area.data().Wall_per_lengthB,area.data().Wall_per_lengthC,
                        area.data().Wall_per_lengthD,area.data().Wall_per_lengthE,area.data().Wall_per_lengthF,
                        area.data().Wall_per_lengthG,area.data().Wall_per_lengthH,0,area.data().areaW,0,
                        doc.data().item.walls,area.data().PCLA,area.data().PCLB,area.data().PCLC,area.data().PCLD,
                        area.data().PCLE,area.data().PCLF,area.data().PCLG,area.data().PCLH,0,area.data().areaCOR,
                        doc.data().item.cornice,area.data().skirting_per_lengthA,area.data().skirting_per_lengthB,
                        area.data().skirting_per_lengthC,area.data().skirting_per_lengthD,area.data().skirting_per_lengthE,
                        area.data().skirting_per_lengthF,area.data().skirting_per_lengthG,area.data().skirting_per_lengthH,
                        0,area.data().areaS,
                        0,doc.data().item.skirting,area.data().areaB,doc.data().item.block,area.data().bit,
                        doc.data().item.blockbitumin,
                        area.data().conc,doc.data().item.concrete,area.data().EXTRACONCBO,area.data().EXTRACONCB,
                        doc.data().item.Concb_Percentage,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,
                        doc.data().item.ssp4,doc.data().item.ssp2,
                        area.data().shutt,area.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering,doc.data().item.tbp,
                        doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,
                        doc.data().item.bitumin,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,
                        doc.data().item.sep4,doc.data().item.sep2,area.data().EXTRAEXP,doc.data().item.sep1,
                        doc.data().item.Exp_Percentage,doc.data().item.itemprecast,area.data().precast,
                        doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,
                        doc.data().item.spp1,area.data().polyth,
                        doc.data().item.spp2,doc.data().item.polythene,area.data().Y8,area.data().Y10,area.data().Y12,
                        area.data().Y16,area.data().Y20,area.data().Y25,area.data().Y32,area.data().steel,
                        doc.data().item.itemsteel,doc.data().item.iqty,doc.data().item.I_FACTOR
                        )
                        const mainindex = this.ItemsList.findIndex(x => x.itemID == doc.data().itemID)
                        if(mainindex === -1){
                         var material = []
                         var labour = []
                         var equipment = []
                         var subcontractor = []
                         var other = []
                         var MtotalPrice = 0;
                         var MatotalPrice = 0;
                         var EtotalPrice = 0;
                         var EatotalPrice = 0;
                         var LtotalPrice = 0;
                         var LatotalPrice = 0;
                         var OtotalPrice = 0;
                         var OatotalPrice = 0;
                         var StotalPrice = 0;
                         var SatotalPrice = 0;
                          doc.data().item.itemdetails.materials.forEach(ele =>{
                            MtotalPrice += (ele.qty*ele.price)
                            MatotalPrice += (0*ele.price)
                              material.push({
                                name: ele.name,
                                id : ele.id,
                                qty : ele.qty,
                                unit : ele.unit,
                                rate : ele.price,
                                etotal : (ele.qty*ele.price),
                                aqty : 0,
                                atotal : 0
                              })
                           })
        
                           if( doc.data().item.itemdetails.equipment){
                            doc.data().item.itemdetails.equipment.forEach(ele =>{
                              EtotalPrice += (ele.qty*ele.price)
                              EatotalPrice += (0*ele.price)
                              equipment.push({
                                  name: ele.name,
                                  id : ele.id,
                                  qty : ele.qty,
                                  unit : ele.unit,
                                  rate : ele.price,
                                  etotal : (ele.qty*ele.price),
                                  aqty : 0,
                                  atotal : 0
                                })
                             })
                           }
        
                           if( doc.data().item.itemdetails.labours){
                            doc.data().item.itemdetails.labours.forEach(ele =>{
                              LtotalPrice += (ele.qty*ele.price)
                              LatotalPrice += (0*ele.price)
                              labour.push({
                                  name: ele.name,
                                  id : ele.id,
                                  qty : ele.qty,
                                  unit : ele.unit,
                                  rate : ele.price,
                                  etotal : (ele.qty*ele.price),
                                  aqty : 0,
                                  atotal : 0
                                })
                             })
                           }
        
                           if( doc.data().item.itemdetails.other){
                            doc.data().item.itemdetails.other.forEach(ele =>{
                              OtotalPrice += (ele.qty*ele.price)
                              OatotalPrice += (0*ele.price)
                                other.push({
                                  name: ele.name,
                                  id : ele.id,
                                  qty : ele.qty,
                                  unit : ele.unit,
                                  rate : ele.price,
                                  etotal : (ele.qty*ele.price),
                                  aqty : 0,
                                  atotal : 0
                                })
                             })
                           }
        
                           if( doc.data().item.itemdetails.subcontractor){
                            doc.data().item.itemdetails.subcontractor.forEach(ele =>{
                              StotalPrice += (ele.qty*ele.price)
                              SatotalPrice += (0*ele.price)
                                subcontractor.push({
                                  name: ele.name,
                                  id : ele.id,
                                  qty : ele.qty,
                                  unit : ele.unit,
                                  rate : ele.price,
                                  etotal : (ele.qty*ele.price),
                                  aqty : 0,
                                  atotal : 0
                                })
                             })
                           }
        
        
                          this.ItemsList.push({
                            name : doc.data().item.itemdetails.name,
                            itemID : doc.data().itemID,
                            catID : doc.data().item.itemdetails.CatID,
                            subcatID : doc.data().item.itemdetails.SubcatID,
                            subsubcatID : doc.data().item.itemdetails.SubsubcatID,
                            qty :qty,
                            unit : doc.data().item.itemdetails.unit,
                            rate : doc.data().item.itemdetails.price.toFixed(3),
                            total : qty*doc.data().item.itemdetails.price,
                            material : material,
                            labour:labour,
                            equipment:equipment,
                            subcontractor:subcontractor,
                            other:other,
                            MtotalPrice : MtotalPrice,
                            MatotalPrice : MatotalPrice,
                            LtotalPrice : LtotalPrice,
                            LatotalPrice : LatotalPrice,
                            EtotalPrice : EtotalPrice,
                            EatotalPrice : EatotalPrice,
                            OtotalPrice : OtotalPrice,
                            OatotalPrice : OatotalPrice,
                            StotalPrice : StotalPrice,
                            SatotalPrice : SatotalPrice,
                            
                          })
                        }else{
                          this.ItemsList[mainindex].total += qty*doc.data().item.itemdetails.price;
                          this.ItemsList[mainindex].qty +=qty;
                          doc.data().item.itemdetails.materials.forEach(mdat =>{
                            const index =  this.ItemsList[mainindex].material.findIndex(x => x.id == mdat.id)
                            if(index === -1){
                              this.ItemsList[mainindex].MtotalPrice += (mdat.qty*mdat.price)
                              this.ItemsList[mainindex].MatotalPrice += (mdat.aqty*mdat.price)
                              this.ItemsList[mainindex].material.push({
                                name: mdat.name,
                                id : mdat.id,
                                qty : mdat.qty,
                                unit : mdat.unit,
                                rate : mdat.price,
                                etotal : (mdat.qty*mdat.price),
                                aqty : 0,
                                atotal : (mdat.aqty*mdat.price)
                              })
                            }else{
                              this.ItemsList[mainindex].material[index].qty += mdat.qty;
                              this.ItemsList[mainindex].material[index].etotal += (mdat.qty*mdat.price)
                              this.ItemsList[mainindex].MtotalPrice += (mdat.qty*mdat.price)
            
                              this.ItemsList[mainindex].material[index].aqty += mdat.aqty;
                              this.ItemsList[mainindex].material[index].atotal += (mdat.aqty*mdat.price)
                              this.ItemsList[mainindex].MatotalPrice += (mdat.aqty*mdat.price)
                            }
        
                           })
        
                            if(doc.data().item.itemdetails.labours){
                              doc.data().item.itemdetails.labours.forEach(mdat =>{
                                const index =  this.ItemsList[mainindex].labour.findIndex(x => x.id == mdat.id)
                                if(index === -1){
                                  this.ItemsList[mainindex].LtotalPrice += (mdat.qty*mdat.price)
                                  this.ItemsList[mainindex].LatotalPrice += (mdat.aqty*mdat.price)
                                  this.ItemsList[mainindex].labour.push({
                                    name: mdat.name,
                                    id : mdat.id,
                                    qty : mdat.qty,
                                    unit : mdat.unit,
                                    rate : mdat.price,
                                    etotal : (mdat.qty*mdat.price),
                                    aqty : 0,
                                    atotal : (mdat.aqty*mdat.price)
                                  })
                                }else{
                                  this.ItemsList[mainindex].labour[index].qty += mdat.qty;
                                  this.ItemsList[mainindex].labour[index].etotal += (mdat.qty*mdat.price)
                                  this.ItemsList[mainindex].LtotalPrice += (mdat.qty*mdat.price)
                
                                  this.ItemsList[mainindex].labour[index].aqty += mdat.aqty;
                                  this.ItemsList[mainindex].labour[index].atotal += (mdat.aqty*mdat.price)
                                  this.ItemsList[mainindex].LatotalPrice += (mdat.aqty*mdat.price)
                                }
            
                               })
                            }
        
        
                            if(doc.data().item.itemdetails.equipment){
                              doc.data().item.itemdetails.equipment.forEach(mdat =>{
                                const index =  this.ItemsList[mainindex].equipment.findIndex(x => x.id == mdat.id)
                                if(index === -1){
                                  this.ItemsList[mainindex].EtotalPrice += (mdat.qty*mdat.price)
                                  this.ItemsList[mainindex].EatotalPrice += (mdat.aqty*mdat.price)
                                  this.ItemsList[mainindex].equipment.push({
                                    name: mdat.name,
                                    id : mdat.id,
                                    qty : mdat.qty,
                                    unit : mdat.unit,
                                    rate : mdat.price,
                                    etotal : (mdat.qty*mdat.price),
                                    aqty : 0,
                                    atotal : (mdat.aqty*mdat.price)
                                  })
                                }else{
                                  this.ItemsList[mainindex].equipment[index].qty += mdat.qty;
                                  this.ItemsList[mainindex].equipment[index].etotal += (mdat.qty*mdat.price)
                                  this.ItemsList[mainindex].EtotalPrice += (mdat.qty*mdat.price)
                
                                  this.ItemsList[mainindex].equipment[index].aqty += mdat.aqty;
                                  this.ItemsList[mainindex].equipment[index].atotal += (mdat.aqty*mdat.price)
                                  this.ItemsList[mainindex].EatotalPrice += (mdat.aqty*mdat.price)
                                }
            
                               })
                            }
        
        
                            if(doc.data().item.itemdetails.other){
                              doc.data().item.itemdetails.other.forEach(mdat =>{
                                const index =  this.ItemsList[mainindex].other.findIndex(x => x.id == mdat.id)
                                if(index === -1){
                                  this.ItemsList[mainindex].OtotalPrice += (mdat.qty*mdat.price)
                                  this.ItemsList[mainindex].OatotalPrice += (mdat.aqty*mdat.price)
                                  this.ItemsList[mainindex].other.push({
                                    name: mdat.name,
                                    id : mdat.id,
                                    qty : mdat.qty,
                                    unit : mdat.unit,
                                    rate : mdat.price,
                                    etotal : (mdat.qty*mdat.price),
                                    aqty : 0,
                                    atotal : (mdat.aqty*mdat.price)
                                  })
                                }else{
                                  this.ItemsList[mainindex].other[index].qty += mdat.qty;
                                  this.ItemsList[mainindex].other[index].etotal += (mdat.qty*mdat.price)
                                  this.ItemsList[mainindex].OtotalPrice += (mdat.qty*mdat.price)
                
                                  this.ItemsList[mainindex].other[index].aqty += mdat.aqty;
                                  this.ItemsList[mainindex].other[index].atotal += (mdat.aqty*mdat.price)
                                  this.ItemsList[mainindex].OatotalPrice += (mdat.aqty*mdat.price)
                                }
            
                               })
                            }
        
        
        
                            if(doc.data().item.itemdetails.subcontractor){
                              doc.data().item.itemdetails.subcontractor.forEach(mdat =>{
                                const index =  this.ItemsList[mainindex].subcontractor.findIndex(x => x.id == mdat.id)
                                if(index === -1){
                                  this.ItemsList[mainindex].StotalPrice += (mdat.qty*mdat.price)
                                  this.ItemsList[mainindex].SatotalPrice += (mdat.aqty*mdat.price)
                                  this.ItemsList[mainindex].subcontractor.push({
                                    name: mdat.name,
                                    id : mdat.id,
                                    qty : mdat.qty,
                                    unit : mdat.unit,
                                    rate : mdat.price,
                                    etotal : (mdat.qty*mdat.price),
                                    aqty : 0,
                                    atotal : (mdat.aqty*mdat.price)
                                  })
                                }else{
                                  this.ItemsList[mainindex].subcontractor[index].qty += mdat.qty;
                                  this.ItemsList[mainindex].subcontractor[index].etotal += (mdat.qty*mdat.price)
                                  this.ItemsList[mainindex].StotalPrice += (mdat.qty*mdat.price)
                
                                  this.ItemsList[mainindex].subcontractor[index].aqty += mdat.aqty;
                                  this.ItemsList[mainindex].subcontractor[index].atotal += (mdat.aqty*mdat.price)
                                  this.ItemsList[mainindex].SatotalPrice += (mdat.aqty*mdat.price)
                                }
            
                               })
                            }
                        }
        
                        if (index === array.length -1) resolve();
                    })

                  })
              });
              
              bar.then(async () => {
             await  loading.onDidDismiss().then(()=>{
                  this.transferdata()
                })
              });
              
          }
          })
        
                         }

 async getDetails(){
  const loading = await this.loadingController.create({
    message: 'Calculating data...',
    duration: 12000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.collection(`boq/boq/projects/${this.myProjectID}/boqitems/`, ref => ref.where("itemID", "==", this.Item)).get()

 }
                         

  async saveItem(){
    const loading = await this.loadingController.create({
      message: 'Updating',
      duration: 10000,
      spinner: 'bubbles'
    });
    await loading.present();

    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
      aqty : this.Item.aqty,
      arate : this.Item.arate,
      aper : this.Item.aper,
      updatedon : new Date().toISOString()
    }).then(()=>{
      loading.dismiss();
      alert("Saved successfully!")
    })

  }

   async UpdateMaterial(){
       const loading = await this.loadingController.create({
         message: 'Updating',
         duration: 10000,
         spinner: 'bubbles'
       });
       await loading.present();
       this.Item.material.forEach(element => {
        this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/materials/${element.id}`).update({
          aqty : element.aqty,
          atotal : element.atotal,
          updatedon : new Date().toISOString()
        }).then(()=>{
          this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
            mupdatedon : new Date().toISOString()
          }).then(()=>{
            this.Item.mupdatedon = new Date().toISOString()
            loading.dismiss().then(()=>{
              alert("Updated Successfully!")
            })
          })
        })
       })
   }

   async UpdateLabour(){
    const loading = await this.loadingController.create({
      message: 'Updating',
      duration: 10000,
      spinner: 'bubbles'
    });
    await loading.present();

    this.Item.labour.forEach(element => {
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/labours/${element.id}`).update({
        aqty : element.aqty,
        atotal : element.atotal,
        updatedon : new Date().toISOString()
      }).then(()=>{
        this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
          lupdatedon : new Date().toISOString()
        }).then(()=>{
          this.Item.lupdatedon = new Date().toISOString()
          loading.dismiss().then(()=>{
            alert("Updated Successfully!")
          })
        })
      })
     })
}

async UpdateEquipment(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.Item.equipment.forEach(element => {
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/equipment/${element.id}`).update({
      aqty : element.aqty,
      atotal : element.atotal,
      updatedon : new Date().toISOString()
    }).then(()=>{
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
        eupdatedon : new Date().toISOString()
      }).then(()=>{
        this.Item.eupdatedon = new Date().toISOString()
        loading.dismiss().then(()=>{
          alert("Updated Successfully!")
        })
      })
    })
   })
}

async UpdateOther(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.Item.other.forEach(element => {
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/other/${element.id}`).update({
      aqty : element.aqty,
      atotal : element.atotal,
      updatedon : new Date().toISOString()
    }).then(()=>{
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
        oupdatedon : new Date().toISOString()
      }).then(()=>{
        this.Item.oupdatedon = new Date().toISOString()
        loading.dismiss().then(()=>{
          alert("Updated Successfully!")
        })
      })
    })
   })
}

async UpdateSubcontractor(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.Item.subcontractor.forEach(element => {
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}/subcontractor/${element.id}`).update({
      aqty : element.aqty,
      atotal : element.atotal,
      updatedon : new Date().toISOString()
    }).then(()=>{
      this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
        supdatedon : new Date().toISOString()
      }).then(()=>{
        this.Item.supdatedon = new Date().toISOString()
        loading.dismiss().then(()=>{
          alert("Updated Successfully!")
        })
      })
    })
   })
}

async addnewmaterial(){
  const modal = await this.modalController.create({
  component: AddmaterialtocostPage,
  componentProps: {
     myProjectID: this.myProjectID,
     itemID : this.Item.itemID
    }
  });

  await modal.present();

  await modal.onDidDismiss().then(()=>{
    
  })

}


async addnewlabour(){
  const modal = await this.modalController.create({
  component: AddlabourtocostPage,
  componentProps: {
     myProjectID: this.myProjectID,
     itemID : this.Item.itemID
    }
  });

  await modal.present();
  await modal.onDidDismiss().then(()=>{    
  })
}

async addnewequipment(){
  const modal = await this.modalController.create({
  component: AddequipmenttocostPage,
  componentProps: {
     myProjectID: this.myProjectID,
     itemID : this.Item.itemID
    }
  });

  await modal.present();
  await modal.onDidDismiss().then(()=>{    
  })
}

async addnewsubcontractor(){
  const modal = await this.modalController.create({
  component: AddsubcontractortocostPage,
  componentProps: {
     myProjectID: this.myProjectID,
     itemID : this.Item.itemID
    }
  });

  await modal.present();
  await modal.onDidDismiss().then(()=>{    
  })
}

async addnewother(){
  const modal = await this.modalController.create({
  component: AddothertocostPage,
  componentProps: {
     myProjectID: this.myProjectID,
     itemID : this.Item.itemID
    }
  });

  await modal.present();
  await modal.onDidDismiss().then(()=>{    
  })
}

    calculateActTotal(){
      console.log("Calculating Material")
           this.Item.MatotalPrice = 0;
           this.Item.material.forEach(ele =>{
             ele.atotal = ele.aqty*ele.rate
             this.Item.MatotalPrice+= ele.atotal
           })
      }

   LcalculateActTotal(){
    this.Item.LatotalPrice = 0;
    this.Item.labour.forEach(ele =>{
      ele.atotal = ele.aqty*ele.rate
      this.Item.LatotalPrice+= ele.atotal
    })
   }
   EcalculateActTotal(){
    this.Item.EatotalPrice = 0;
    this.Item.equipment.forEach(ele =>{
      ele.atotal = ele.aqty*ele.rate
      this.Item.EatotalPrice+= ele.atotal
    })
   }
   OcalculateActTotal(){
    this.Item.OatotalPrice = 0;
    this.Item.other.forEach(ele =>{
      ele.atotal = ele.aqty*ele.rate
      this.Item.OatotalPrice+= ele.atotal
    })
   }
   ScalculateActTotal(){
    this.Item.SatotalPrice = 0;
    this.Item.subcontractor.forEach(ele =>{
      ele.atotal = ele.aqty*ele.rate
      this.Item.SatotalPrice+= ele.atotal
    })
   }

   calculateGrandTotal(){
    this.Item.Grandtotal = 0;
    this.Item.Grandtotal = this.Item.MatotalPrice+this.Item.LatotalPrice+this.Item.EatotalPrice+this.Item.SatotalPrice+this.Item.OatotalPrice;
   }

   calculateActQty(){
     this.Item.arate = this.Item.Grandtotal/this.Item.aqty
     this.Item.aper = (this.Item.aqty/this.Item.qty)*100
   }

   calculateActPer(){
    this.Item.aqty = (this.Item.aper/100)*this.Item.qty
    this.Item.arate = this.Item.Grandtotal/this.Item.aqty
  }



transferdata(){
  console.log(this.ItemsList)
  this.ItemsList.forEach(element =>{
    console.log("Worked")
    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${element.itemID}`).set({
      name : element.name,
      itemID : element.itemID,
      catID : element.catID,
      subcatID : element.subcatID,
      subsubcatID : element.subsubcatID,
      qty : element.qty,
      unit : element.unit,
      rate : element.rate,
      total : element.total,
      material : element.material,
      labour:element.labour,
      equipment:element.equipment,
      subcontractor:element.subcontractor,
      other:element.other,
      MtotalPrice : element.MtotalPrice,
      MatotalPrice : element.MatotalPrice,
      LtotalPrice : element.LtotalPrice,
      LatotalPrice : element.LatotalPrice,
      EtotalPrice : element.EtotalPrice,
      EatotalPrice : element.EatotalPrice,
      OtotalPrice : element.OtotalPrice,
      OatotalPrice : element.OatotalPrice,
      StotalPrice : element.StotalPrice,
      SatotalPrice : element.SatotalPrice,
    })
  })

}



calculateFinalQuantity(L,W,H,EXTRA_FILL,N,FILL_PERCENTAGE,
  EXTRA_EXC,E_PERCENTAGE,R,RO,pww1,psw1,pww2,psw2,pwl1,psl1,
  pwl2,psl2,Sum_of_Areafloor_p,EXTRA_FLOOR_AREA,F_Percentage,
  L1,L2,L3,L4,L5,L6,L7,L8,EXTRA_BLOCK_DPC,DPC_PERCENTAGE,SumofAreaCEILING_P,EXTRAceilingAREA,CPercentage,
  PWLA,PWLB,PWLC,PWLD,PWLE,PWLF,PWLG,PWLH,SumofAreawallp,EXTRAWALLAREA,SUMOFOPENAREA,
  Wpercentage,PCLA,PCLB,PCLC,PCLD,PCLE,PCLF,PCLG,PCLH,SumofLengthcornicep,EXTRACORNICELENGTH,
  CORpercentage,PSLA,PSLB,PSLC,PSLD,PSLE,PSLF,PSLG,PSLH,SumofLengthskirtingp,EXTRASKIRTINGLENGTH,
  sumofOpenwidthtotal,Spercentage,EXTRABLOCKAREA,BPERCENTAGE,EXTRABIT,BBITPERCENTAGE,
  EXTRACONC,CONCPERCENTAGE,EXTRACONCbO,EXTRACONCb,CONCbPERCENTAGE,BSP,TSP,SSP3,SSP4,SSP2,
  EXTRASHUTT,w,SSP1,FORMPERCENTAGE,TBP,BBP,SBP4,SBP3,SBP2,SBP1,
  BITPERCENTAGE,BEP,TEP,SEP3,SEP4,SEP2,EXTRAEXP,SEP1,EXPPERCENTAGE,
  precastPercentage,EXTRAPRECAST,TpP,BpP,SpP4,SpP3,SpP1,EXTRAPOLYTH,
  SpP2,polyPERCENTAGE,Y8R,Y10R,Y12R,Y16R,Y20R,Y25R,Y32R,EXTRASTEEL,
  steelpercentage,QTY,ifactor
  ){

        //****************EQUATION START********************

return (((L*W*H)+ EXTRA_FILL)*N*FILL_PERCENTAGE/100) +
(((L*W*H)+ EXTRA_EXC)*N*E_PERCENTAGE/100) +
(((W*L+(R*R*RO*(22/7)/100)+(pww1*psw1)+(pww2*psw2)+(pwl1*psl1)+(pwl2*psl2))-(Sum_of_Areafloor_p/100)+EXTRA_FLOOR_AREA)*F_Percentage*N/100)+
(((L1+L2+L3+L4+L5+L6+L7+L8+EXTRA_BLOCK_DPC)*N*DPC_PERCENTAGE)/100)+
((((W*L+(R*R*RO*(22/7))/100+pww1*psw1+pww2*psw2+pwl1*psl1+pwl2*psl2)-(SumofAreaCEILING_P/100)+EXTRAceilingAREA)*CPercentage)*N/100)+
((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD+L5*PWLE+L6*PWLF+L7*PWLG+L8*PWLH)*H/100)+(SumofAreawallp/100)+EXTRAWALLAREA-SUMOFOPENAREA)*Wpercentage*N/100)+
((((L1*PCLA+L2*PCLB+L3*PCLC+L4*PCLD+L5*PCLE+L6*PCLF+L7*PCLG+L8*PCLH)/100)+(SumofLengthcornicep/100)+EXTRACORNICELENGTH)*CORpercentage*N/100)+
((((L1*PSLA+L2*PSLB+L3*PSLC+L4*PSLD+L5*PSLE+L6*PSLF+L7*PSLG+L8*PSLH)/100)+(SumofLengthskirtingp/100)+EXTRASKIRTINGLENGTH-sumofOpenwidthtotal)*Spercentage*N/100)+
((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD+L5*PWLE+L6*PWLF+L7*PWLG+L8*PWLH)*H/100)+EXTRABLOCKAREA-SUMOFOPENAREA)*N*BPERCENTAGE/100)+
(((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD)+ EXTRABIT-SUMOFOPENAREA)*N*BBITPERCENTAGE/(0.5)))/100)+
(((L*W*H)+EXTRACONC)*N*CONCPERCENTAGE/100)+
(((L+2*EXTRACONCbO)*(W+2*EXTRACONCbO)+EXTRACONCb)*N*CONCbPERCENTAGE/100)+
((W*L*(BSP/100)+W*L*(TSP/100)+H*L*(SSP3/100)+H*L*(SSP4/100)+H*W*(SSP2/100)+ w*H*(SSP1/100)+ EXTRASHUTT)*N*FORMPERCENTAGE/100)+
((W*L*(TBP/100)+W*L*(BBP/100)+H*L*(SBP4/100)+H*L*(SBP3/100)+H*W*(SBP2/100)+ w*H*(SBP1/100)+ EXTRABIT)*N*BITPERCENTAGE/100)+
((W*L*(BEP/100)+W*L*(TEP/100)+H*L*(SEP3/100)+H*L*(SEP4/100)+H*W*(SEP2/100)+ w*H*(SEP1/100)+ EXTRAEXP)*N*EXPPERCENTAGE/100)+
(((W*L)+ EXTRAPRECAST)*precastPercentage*N/100)+
((W*L*(TpP/100)+W*L*(BpP/100)+H*L*(SpP4/100)+H*L*(SpP3/100)+H*W*(SpP1/100)+ w*H*(SpP2/100)+ EXTRAPOLYTH)*N*polyPERCENTAGE/100 )+
((Y8R/2520)+(Y10R/1596)+(Y12R/1104)+(Y16R/624)+(Y20R/396)+(Y25R/252)+(Y32R/156)+(EXTRASTEEL))*(steelpercentage/100)+
(QTY*N*ifactor/100)

        ////****************EQUATION END********************
}

gotocons(){
  this.router.navigate(['constractor'])
 }

 gotoproj(){
   this.router.navigate(['projects'])
 }
 gotohome(){
   this.router.navigate(['home'])
 }

 gotoArea(){
   this.router.navigate(['area'])
 }
 gotosupplier(){
   this.router.navigate(['supplier'])
 }
 gotomaterial(){
   this.router.navigate(['material'])
 }
 gotoitem(){
   this.router.navigate(['boqitem'])
 }
 gotoReport(){
   this.router.navigate(['report-final-priced-bill'])
 }

 async reset(){
     const alert = await this.alertController.create({
       header: 'Confirm!',
       message: ' <strong>Are you sure you want to reset all cost details data?</strong>!!!',
       buttons: [
         {
           text: 'No',
           role: 'cancel',
           cssClass: 'secondary',
           handler: () => {
             console.log('Confirm Cancel: blah');
           }
         }, {
           text: 'Yes',
           handler: async () => {
               const loading = await this.loadingController.create({
                 message: 'Deleting current data...',
                 duration: 20000,
                 spinner: 'bubbles'
               });
               await loading.present();

           this.afs.collection(`boq/boq/projects/${this.myProjectID}/actboqitems`).get().subscribe(value=>{
             value.docs.forEach(doc =>{
              this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${doc.ref.id}`).delete().then(()=>{
                this.afs.collection(`boq/boq/projects/${this.myProjectID}/actboqitems`).get().subscribe(val =>{
                  if(val.docs.length <= 0){
                    loading.dismiss();
                  this.getItemReportEst()
                  }
                })
              })
             })
           })
           }
         }
       ]
     });
   
     await alert.present();

 }

 excelgetcat(){
   this.EcatList =[]
   this.EcatID = [];
   this.EsubcatList =[];
   this.EsubcatID = [];
   this.EsubsubcatList = [];
   this.EsubsubcatID = [];
   this.EItemList = [];
   this.EItem={
   id:"",
   arate:0,
   aamount:0,
   aqty:0,
   Exceltotal:0,
   amaterial:0,
   alabour:0,
   aequipment:0,
   asubcontractor:0,
   aother:0,
   code  : 0,
   cat  : 0,
   subcat  : 0,
   subsubcat  : 0,
   des : 0,
   qty : 0,
   unit : 0,
   rate : 0,
   amount : 0,
   material : 0,
   labour : 0,
   equipment : 0,
   subcontractor : 0,
   other : 0}
   this.afs.collection(`boq/boq/projects/${this.myProjectID}/excelboqitemscat`).get().subscribe(value =>{
  value.docs.forEach(element =>{
    this.EcatList.push({
           name : element.data().name,
           id : element.ref.id
    })
  })

   })
 }

 excelgetsubcat(){
  this.EsubcatList =[];
  this.EsubcatID = [];
  this.EsubsubcatList = [];
  this.EsubsubcatID = [];
  this.EItemList = [];
  this.EItem={
    id:"",
    arate:0,
    aamount:0,
    aqty:0,
    Exceltotal:0,
    amaterial:0,
    alabour:0,
    aequipment:0,
    asubcontractor:0,
    aother:0,
    code  : 0,
    cat  : 0,
    subcat  : 0,
    subsubcat  : 0,
    des : 0,
    qty : 0,
    unit : 0,
    rate : 0,
    amount : 0,
    material : 0,
    labour : 0,
    equipment : 0,
    subcontractor : 0,
    other : 0}
  this.afs.collection(`boq/boq/projects/${this.myProjectID}/excelboqitemssubcat`,ref => ref.where("cat","==",this.EcatID)).get().subscribe(value =>{
    value.docs.forEach(element =>{
      this.EsubcatList.push({
             name : element.data().name,
             id : element.ref.id
      })
    })
  
     })
 }
 excelgetsubsubcat(){
  this.EsubsubcatList = [];
  this.EsubsubcatID = [];
  this.EItemList = [];
  this.EItem={
    id:"",
    arate:0,
    aamount:0,
    aqty:0,
    Exceltotal:0,
    amaterial:0,
    alabour:0,
    aequipment:0,
    asubcontractor:0,
    aother:0,
    code  : 0,
    cat  : 0,
    subcat  : 0,
    subsubcat  : 0,
    des : 0,
    qty : 0,
    unit : 0,
    rate : 0,
    amount : 0,
    material : 0,
    labour : 0,
    equipment : 0,
    subcontractor : 0,
    other : 0}
  this.afs.collection(`boq/boq/projects/${this.myProjectID}/excelboqitemssubsubcat`,ref => ref.where("subcat","==",this.EsubcatID)).get().subscribe(value =>{
    value.docs.forEach(element =>{
      this.EsubsubcatList.push({
             name : element.data().name,
             id : element.ref.id
      })
    })
  
     })
 }

 excelgetitem(){
this.EItemList = [];
this.EItemList = [];
this.EItem={
  id:"",
  arate:0,
  aamount:0,
  aqty:0,
  Exceltotal:0,
  amaterial:0,
  alabour:0,
  aequipment:0,
  asubcontractor:0,
  aother:0,
  code  : 0,
  cat  : 0,
  subcat  : 0,
  subsubcat  : 0,
  des : 0,
  qty : 0,
  unit : 0,
  rate : 0,
  amount : 0,
  material : 0,
  labour : 0,
  equipment : 0,
  subcontractor : 0,
  other : 0}
this.afs.collection(`boq/boq/projects/${this.myProjectID}/excelboqitems`,ref => ref.where("subsubcat","==",this.EsubsubcatID)).get().subscribe(value =>{
  value.docs.forEach(element =>{
    this.EItemList.push({
      code  : element.data().code ,
      cat  : element.data().cat ,
      subcat  : element.data().subcat ,
      subsubcat  : element.data().subsubcat ,
      des : element.data().des,
      qty : element.data().qty,
      unit : element.data().unit,
      rate : element.data().rate,
      amount : element.data().amount,
      material : element.data().material,
      labour : element.data().labour,
      equipment : element.data().equipment,
      subcontractor : element.data().subcontractor,
      other : element.data().other,
      id : element.ref.id,
      aqty : element.data().aqty,
      arate : element.data().arate,
      aamount : element.data().aamount,
      amaterial : element.data().amaterial,
      alabour : element.data().alabour,
      aequipment : element.data().aequipment,
      asubcontractor : element.data().asubcontractor,
      aother : element.data().aother,
    })
  })

   })
 }

 ExcelcalculateActQty(){
  this.EItem.arate = this.EItem.aamount/this.EItem.aqty
}
ExcelcalculateTotal(){
  this.EItem.aamount = 0;
  this.EItem.aamount = this.EItem.amaterial+this.EItem.alabour+this.EItem.aequipment+this.EItem.asubcontractor+this.EItem.aother;
  this.ExcelcalculateActQty();
}

async saveExcelItem(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/excelboqitems/${this.EItem.id}`).update({
    aqty : this.EItem.aqty,
    arate : this.EItem.arate,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
    alert("Updated!")
  })
}

async UpdateExcelMaterial(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/excelboqitems/${this.EItem.id}`).update({
    amaterial : this.EItem.amaterial,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
    alert("Updated!")
  })
}

async UpdateExcellabour(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/excelboqitems/${this.EItem.id}`).update({
    alabour : this.EItem.alabour,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
    alert("Updated!")
  })
}

async UpdateExcelequipment(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/excelboqitems/${this.EItem.id}`).update({
    aequipment : this.EItem.aequipment,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
    alert("Updated!")
  })
}

async UpdateExcelsubcontractor(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/excelboqitems/${this.EItem.id}`).update({
    asubcontractor : this.EItem.asubcontractor,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
    alert("Updated!")
  })
}

async UpdateExcelother(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/excelboqitems/${this.EItem.id}`).update({
    aother : this.EItem.aother,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
    alert("Updated!")
  })
}

checkinput(){
  if(this.Item.aper > 100){
    this.Item.aper = 100
    console.log("> 100")
  }
 else if(this.Item.aper < 0){
    this.Item.aper = 0
  }
}

async getgraph(){
    const modal = await this.modalController.create({
    component: CostgraphPage,
    cssClass: 'halfscreen',
    componentProps: { 
      eqty : this.Item.qty,
      aqty: this.Item.aqty,
      erate: this.Item.rate,
      arate: this.Item.arate,
      etotal: this.Item.total, 
      atotal: this.Item.Grandtotal,
      emtotal : this.Item.MtotalPrice*this.Item.qty,
      amtotal : this.Item.MatotalPrice,
      eltotal : this.Item.LtotalPrice*this.Item.qty,
      altotal : this.Item.LatotalPrice,
      eetotal : this.Item.EtotalPrice*this.Item.qty,
      aetotal : this.Item.EatotalPrice,
      eototal : this.Item.OtotalPrice*this.Item.qty,
      aototal : this.Item.OatotalPrice,
      estotal : this.Item.StotalPrice*this.Item.qty,
      astotal : this.Item.SatotalPrice,
    }
    });
  
    await modal.present();

}

}
