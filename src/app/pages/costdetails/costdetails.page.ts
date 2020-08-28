import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { AddmaterialtocostPage } from '../addmaterialtocost/addmaterialtocost.page';
import { AddlabourtocostPage } from '../addlabourtocost/addlabourtocost.page';
import { AddequipmenttocostPage } from '../addequipmenttocost/addequipmenttocost.page';
import { AddsubcontractortocostPage } from '../addsubcontractortocost/addsubcontractortocost.page';
import { AddothertocostPage } from '../addothertocost/addothertocost.page';

@Component({
  selector: 'app-costdetails',
  templateUrl: './costdetails.page.html',
  styleUrls: ['./costdetails.page.scss'],
})
export class CostdetailsPage implements OnInit {
  segment2="m"
  myProjectList = [];
  myProjectID;

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
    unit : "",
    rate : 0,
    updatedon : null,
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
  

  constructor(private menu : MenuController,
    private router : Router,
    private afs : AngularFirestore,
    private modalController: ModalController,
    private loadingController: LoadingController,
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

 getitem(){
  this.storage.set(`${this.myProjectID}myItemSubsubcatID`, this.IsubsubcatID)
  this.ItemList =[]
  this.afs.collection<any>(`boq/boq/projects/${this.myProjectID}/actboqitems/`, ref => ref.where("subsubcatID", "==", this.IsubsubcatID )).snapshotChanges().subscribe(value =>{
    this.ItemList =[]
    if(value.length > 0){
      value.forEach(doc=>{
       
         let mtotal = 0;
         let ltotal = 0;
         let stotal = 0;
         let ototal = 0;
         let etotal = 0;

        if(doc.payload.doc.data().MatotalPrice){
          mtotal = doc.payload.doc.data().MatotalPrice
         }
         if(doc.payload.doc.data().LatotalPrice){
          ltotal = doc.payload.doc.data().LatotalPrice
         }
         if(doc.payload.doc.data().SatotalPrice){
         stotal = doc.payload.doc.data().SatotalPrice
        }
        if(doc.payload.doc.data().EatotalPrice){
         etotal = doc.payload.doc.data().EatotalPrice
        }
         if(doc.payload.doc.data().OatotalPrice){
        ototal = doc.payload.doc.data().OatotalPrice
        }

          this.ItemList.push(
            {
              name : doc.payload.doc.data().name,
              itemID : doc.payload.doc.data().itemID,
              catID : doc.payload.doc.data().CatID,
              subcatID : doc.payload.doc.data().SubcatID,
              subsubcatID : doc.payload.doc.data().SubsubcatID,
              qty : doc.payload.doc.data().qty,
              aqty : doc.payload.doc.data().aqty,
              unit : doc.payload.doc.data().unit,
              rate : doc.payload.doc.data().rate,
              arate : doc.payload.doc.data().arate,
              total : doc.payload.doc.data().total,
              material : doc.payload.doc.data().material,
              labour:doc.payload.doc.data().labour,
              equipment:doc.payload.doc.data().equipment,
              subcontractor:doc.payload.doc.data().subcontractor,
              other:doc.payload.doc.data().other,
              MtotalPrice : doc.payload.doc.data().MtotalPrice,
              MatotalPrice : mtotal,
              LtotalPrice : doc.payload.doc.data().LtotalPrice,
              LatotalPrice : ltotal,
              EtotalPrice : doc.payload.doc.data().EtotalPrice,
              EatotalPrice : etotal,
              OtotalPrice : doc.payload.doc.data().OtotalPrice,
              OatotalPrice : ototal,
              StotalPrice : doc.payload.doc.data().StotalPrice,
              SatotalPrice : stotal,
              Grandtotal: mtotal+ltotal+etotal+ototal+stotal,
              updatedon : doc.payload.doc.data().updatedon
            })
            var AA = this.ItemList.find(x => x.itemID == this.Item.itemID )
            if(AA){
              this.Item = AA
            }
        })

    }
   
  })

 }

 setProject(){
  this.storage.set("project" , this.myProjectID)
  this.afs.collection(`boq/boq/projects/${this.myProjectID}/actboqitems`).get().subscribe(value=>{
    if(value.docs.length > 0){
      if(this.IcatList.length == 0){
        this.getitemCat()
      }
    }else{
  this.getItemReportEst()
    }
  })
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

                  
                         

  async saveItem(){
    const loading = await this.loadingController.create({
      message: 'Updating',
      duration: 10000,
      spinner: 'bubbles'
    });
    await loading.present();

    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
      aqty : this.Item.aqty,
      arate : this.Item.rate,
      updatedon : new Date().toISOString()
    }).then(()=>{
      loading.dismiss();
    })

  }

   async UpdateMaterial(){
       const loading = await this.loadingController.create({
         message: 'Updating',
         duration: 10000,
         spinner: 'bubbles'
       });
       await loading.present();

       this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
         material : this.Item.material,
         MatotalPrice : this.Item.MatotalPrice,
         updatedon : new Date().toISOString()
       }).then(()=>{
         loading.dismiss();
       })
   }

   async UpdateLabour(){
    const loading = await this.loadingController.create({
      message: 'Updating',
      duration: 10000,
      spinner: 'bubbles'
    });
    await loading.present();

    this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
      labour : this.Item.labour,
      LatotalPrice : this.Item.LatotalPrice,
      updatedon : new Date().toISOString()
    }).then(()=>{
      loading.dismiss();
    })
}

async UpdateEquipment(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
    equipment : this.Item.equipment,
    EatotalPrice : this.Item.EatotalPrice,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
  })
}

async UpdateOther(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
    other : this.Item.other,
    OatotalPrice : this.Item.OatotalPrice,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
  })
}

async UpdateSubcontractor(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.myProjectID}/actboqitems/${this.Item.itemID}`).update({
    subcontractor : this.Item.subcontractor,
    SatotalPrice : this.Item.SatotalPrice,
    updatedon : new Date().toISOString()
  }).then(()=>{
    loading.dismiss();
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

return (( ((L*W*H)+(EXTRA_FILL))*N*FILL_PERCENTAGE/100 +
((L*W*H)+(EXTRA_EXC))*N*E_PERCENTAGE/100+
((((W*L+(R*R*RO*(22/7)/100)+(pww1*psw1)+(pww2*psw2)+(pwl1*psl1)+(pwl2*psl2))-(Sum_of_Areafloor_p/100)+EXTRA_FLOOR_AREA)*F_Percentage)*N)/100 +
(((L1+L2+L3+L4+L5+L6+L7+L8)+EXTRA_BLOCK_DPC)*N*DPC_PERCENTAGE)/100 +
(((W*L+(R*R*RO*(22/7))/100+pww1*psw1+pww2*psw2+pwl1*psl1+pwl2*psl2)-(SumofAreaCEILING_P/100)+EXTRAceilingAREA)*CPercentage)*N/100 +
((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD+L5*PWLE+L6*PWLF+L7*PWLG+L8*PWLH)*H)/100
)+((SumofAreawallp/100))+EXTRAWALLAREA-SUMOFOPENAREA)*Wpercentage*N/100 +
((((L1*PCLA+L2*PCLB+L3*PCLC+L4*PCLD+L5*PCLE+L6*PCLF+L7*PCLG+L8*PCLH)/100)+(SumofLengthcornicep/100)+EXTRACORNICELENGTH)*CORpercentage*N)/100 +
((((L1*PSLA+L2*PSLB+L3*PSLC+L4*PSLD+L5*PSLE+L6*PSLF+L7*PSLG+L8*PSLH)/100)+((SumofLengthskirtingp/100))+EXTRASKIRTINGLENGTH-sumofOpenwidthtotal)*Spercentage*N)/100 +
(((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD+L5*PWLE+L6*PWLF+L7*PWLG+L8*PWLH)*H)/100)+EXTRABLOCKAREA-SUMOFOPENAREA)*N*BPERCENTAGE/1)/100 +
(((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD+L5*PWLE+L6*PWLF+L7*PWLG+L8*PWLH)*H)/100)+
EXTRABIT-SUMOFOPENAREA)*N*BBITPERCENTAGE/(0.5))/100 +
((L*W*H+EXTRACONC)*N*CONCPERCENTAGE)/100+
(((L+2*EXTRACONCbO)*(W+2*EXTRACONCbO)+EXTRACONCb)*N*CONCbPERCENTAGE)/100+
((W*L*(BSP/100)+W*L*(TSP/100)+H*L*(SSP3/100)+H*L*(SSP4/100)+H*W*(SSP2/100)+(EXTRASHUTT)+
w*H*(SSP1/100))*N*FORMPERCENTAGE)/100 +
((W*L*(TBP/100)+W*L*(BBP/100)+H*L*(SBP4/100)+H*L*(SBP3/100)+H*W*(SBP2/100)+(EXTRABIT)+w*H*(SBP1/100))*N*BITPERCENTAGE)/100 +
((W*L*(BEP/100)+W*L*(TEP/100)+H*L*(SEP3/100)+H*L*(SEP4/100)+H*W*(SEP2/100)+(EXTRAEXP)+w*H*(SEP1/100))*N*EXPPERCENTAGE)/100 +
((W*L*precastPercentage+(EXTRAPRECAST))*N)/100
+((W*L*(TpP/100)+W*L*(BpP/100)+H*L*(SpP4/100)+H*L*(SpP3/100)+H*W*(SpP1/100)+(EXTRAPOLYTH)+w*H*(SpP2/100))*N*polyPERCENTAGE)/100 +
((Y8R/2520)+(Y10R/1596)+(Y12R/1104)+(Y16R/624)+(Y20R/396)+(Y25R/252)+(Y32R/156)+(EXTRASTEEL))*(steelpercentage/100) +
QTY*N)*ifactor)/100

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


}
