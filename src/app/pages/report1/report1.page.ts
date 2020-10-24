import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';
import { MenuController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
import { Html2canvasServiceService } from 'src/app/html2canvas-service.service';
import htmlToPdfmake from "html-to-pdfmake"
import * as XLSX from 'xlsx';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import { Report1DetailsPage } from '../report1-details/report1-details.page';
import { Report1MaterialPage } from '../report1-material/report1-material.page';
import { Report1LabourPage } from '../report1-labour/report1-labour.page';
import { Report1EquipmentPage } from '../report1-equipment/report1-equipment.page';
import { Report1OtherPage } from '../report1-other/report1-other.page';
import { BoqitemgraphPage } from '../boqitemgraph/boqitemgraph.page';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report1',
  templateUrl: './report1.page.html',
  styleUrls: ['./report1.page.scss'],
})
export class Report1Page implements OnInit {
  @ViewChild('keywordsInput') keywordsInput:ElementRef;
  projectID;
  ProjectName;
  ItemsList = [];
  BuildingList = [];
  BuildingID = [];
  FloorList = [];
  FloorID = [];
  CatList = [];
  CatID = [];
  SubcatList = [];
  SubcatID = [];
  SubsubcatList = [];
  SubsubcatID = [];
  AreaList = [];
  AreaID = [];
  IcatList = [];
  IcatID = [];
  IsubcatList = [];
  IsubcatID = [];
  IsubsubcatList = [];
  IsubsubcatID = [];
  ItemList = [];
  ItemID = [];
  totalPrice = 0 ;
  showhide ="table-cell"
  eye = "eye"
  constructor(private menu : MenuController,
    private route : ActivatedRoute,
    private router : Router,
    private html2canvas : Html2canvasServiceService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private afs : AngularFirestore) { 
    this.menu.enable(false)
    
  }
  SH(){
    if(this.eye == "eye" && this.showhide == "table-cell") {
      this.eye = "eye-off";
      this.showhide = "none"
    }else{
      this.eye = "eye";
      this.showhide = "table-cell"
    }


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

          return ((((L*W*H)+ EXTRA_FILL)*N*FILL_PERCENTAGE/100)+
          (((L*W*H)+ EXTRA_EXC)*N*E_PERCENTAGE/100)+
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
          (QTY*N*ifactor/100))

          ////****************EQUATION END********************
  }

  ngOnInit() {
    this.projectID = this.route.snapshot.paramMap.get('id')
    this.afs.doc(`boq/boq/projects/${this.projectID}`).get().subscribe(pvalue =>{
      this.ProjectName = pvalue.data().name
    })
    this.getBuildings();
    this.getitemcat();
    this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`).get().subscribe(value =>{
      if(value.docs.length > 0){
        value.docs.forEach(doc =>{
          this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }

                 this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
          })
        })
      }
    })

  }

  getBuildingReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
        this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element)).get().subscribe(value =>{
          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                  }
                  else{
                    this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                          atotal : (mdat.aqty*mdat.price)
                        })
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
                          }
      
                         })
                      }
                  }
              })
            })
          }
      
        })

        
      });
    }

  }

  getFloorReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
        this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele)).get().subscribe(value =>{
          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                  }
                  else{
                    this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                          atotal : (mdat.aqty*mdat.price)
                        })
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
                          }
      
                         })
                      }
                  }
              })
            })
          }
      
        })

       });    
      });
    }


  }


  getAreacatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
         this.CatID.forEach(cat =>{

          this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele).where("areacatID", "==", cat)).get().subscribe(value =>{
                      if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                  }
                  else{
                    this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                          atotal : (mdat.aqty*mdat.price)
                        })
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
                          }
      
                         })
                      }
                  }
              })
            })
          }
        
          })
         });
       });    
      });
    }


  }

  getAreasubcatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
         this.SubcatID.forEach(subcat =>{

          this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele).where("areasubcatID", "==", subcat)).get().subscribe(value =>{
                      if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                  }
                  else{
                    this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                          atotal : (mdat.aqty*mdat.price)
                        })
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
                          }
      
                         })
                      }
                  }
              })
            })
          }
        
          })
         });
       });    
      });
    }


  }

  getAreasubsubcatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
         this.SubsubcatID.forEach(subsubcat =>{

          this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele).where("areasubsubcatID", "==", subsubcat)).get().subscribe(value =>{
                      if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                  }
                  else{
                    this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                          atotal : (mdat.aqty*mdat.price)
                        })
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
                          }
      
                         })
                      }
                  }
              })
            })
          }
        
          })
         });
       });    
      });
    }


  }

  getAreaReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
         this.AreaID.forEach(area =>{

          this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele).where("areaID", "==", area)).get().subscribe(value =>{
                      if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
              })
            })
          }
        
          })
         });
       });    
      });
    }


  }


  getAreaIcatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
         this.AreaID.forEach(area =>{
            this.IcatID.forEach(icat =>{
              this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele).where("areaID", "==", area).where("item.itemdetails.CatID", "==", icat)).get().subscribe(value =>{
                if(value.docs.length > 0){
                  value.docs.forEach(doc =>{
                    this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
                    })
                  })
                }
            
              })
            });
         });
       });    
      });
    }


  }
  getAreaIsubcatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
         this.AreaID.forEach(area =>{
            this.IsubcatID.forEach(iscat =>{
              this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele).where("areaID", "==", area).where("item.itemdetails.SubcatID", "==", iscat)).get().subscribe(value =>{
                          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
              })
            })
          }
            
              })
            });
         });
       });    
      });
    }


  }
  getAreaIsubsubcatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
         this.AreaID.forEach(area =>{
            this.IsubsubcatID.forEach(isscat =>{
              this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele).where("areaID", "==", area).where("item.itemdetails.SubsubcatID", "==", isscat)).get().subscribe(value =>{
                          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
              })
            })
          }
            
              })
            });
         });
       });    
      });
    }


  }

  getItemReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.BuildingID.length > 0){
      this.BuildingID.forEach(element => {
       this.FloorID.forEach(ele =>{
         this.AreaID.forEach(area =>{
            this.ItemID.forEach(i =>{
              this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("buildID", "==" , element).where("floorID", "==", ele).where("areaID", "==", area).where("itemID", "==", i)).get().subscribe(value =>{
                          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
              })
            })
          }
            
              })
            });
         });
       });    
      });
    }


  }

  getIcatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.IcatID.length > 0){
      this.IcatID.forEach(element => {
        this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("item.itemdetails.CatID", "==", element)).get().subscribe(value =>{
          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
              })
            })
          }
      
        })

        
      });
    }

  }
  getIsubcatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.IsubcatID.length > 0){
      this.IsubcatID.forEach(element => {
        this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("item.itemdetails.SubcatID", "==", element)).get().subscribe(value =>{
          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
              })
            })
          }
      
        })

        
      });
    }

  }
  getIsubsubcatReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.IsubsubcatID.length > 0){
      this.IsubsubcatID.forEach(element => {
        this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("item.itemdetails.SubsubcatID", "==", element)).get().subscribe(value =>{
          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
              })
            })
          }
      
        })

        
      });
    }

  }

  getIsubsubcatItemReport(){
    this.ItemsList = [];
    this.totalPrice = 0;
    if(this.ItemID.length > 0){
      this.ItemID.forEach(element => {
        this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems/`, ref => ref.where("itemID", "==", element)).get().subscribe(value =>{
          if(value.docs.length > 0){
            value.docs.forEach(doc =>{
              this.afs.doc<any>(`boq/boq/projects/${this.projectID}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(area =>{
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
                      supplier : ele.supplier,
                      additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
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
                        supplier : ele.supplier,
                        additionalsupplier : ele.additionalsupplier,
                        aqty : 0,
                        atotal : 0
                      })
                   })
                 }
  
                     this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
              }
              else{
                this.totalPrice += parseFloat((qty*parseFloat(doc.data().item.itemdetails.price)).toFixed(3))
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
                      atotal : (mdat.aqty*mdat.price)
                    })
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
                      }
  
                     })
                  }
              }
              })
            })
          }
      
        })

        
      });
    }

  }
  

  SelectallAbuildings(){
    if(this.BuildingList.length > 0){
      this.BuildingID = [];
      this.BuildingList.forEach(element => {
        this.BuildingID.push(element.id)
      });
    }
  }

  SelectallAfloors(){
    if(this.FloorList.length > 0){
      this.FloorID = [];
      this.FloorList.forEach(element => {
        this.FloorID.push(element.id)
      });
    }
  }

  SelectallACat(){
    if(this.CatList.length > 0){
      this.CatID = [];
      this.CatList.forEach(element => {
        this.CatID.push(element.id)
      });
    }
  }

  SelectallASubcat(){
    if(this.SubcatList.length > 0){
      this.SubcatID = [];
      this.SubcatList.forEach(element => {
        this.SubcatID.push(element.id)
      });
    }
  }

  SelectallASubsubcat(){
    if(this.SubsubcatList.length > 0){
      this.SubsubcatID = [];
      this.SubsubcatList.forEach(element => {
        this.SubsubcatID.push(element.id)
      });
    }
  }

  SelectallAreas(){
    if(this.AreaList.length > 0){
      this.AreaID = [];
      this.AreaList.forEach(element => {
        this.AreaID.push(element.id)
      });
    }
  }

  SelectallIcat(){
    if(this.IcatList.length > 0){
      this.IcatID = [];
      this.IcatList.forEach(element => {
        this.IcatID.push(element.id)
      });
    }
  }

  SelectallIsubcat(){
    if(this.IsubcatList.length > 0){
      this.IsubcatID = [];
      this.IsubcatList.forEach(element => {
        this.IsubcatID.push(element.id)
      });
    }
  }

  SelectallIsubsubcat(){
    if(this.IsubsubcatList.length > 0){
      this.IsubsubcatID = [];
      this.IsubsubcatList.forEach(element => {
        this.IsubsubcatID.push(element.id)
      });
    }
  }

  SelectallItem(){
    if(this.ItemList.length > 0){
      this.ItemID = [];
      this.ItemList.forEach(element => {
        this.ItemID.push(element.id)
      });
    }
  }





  RemoveallAbuildings(){

      this.BuildingID = [];

  }

  RemoveallAfloors(){

      this.FloorID = [];

  }

  RemoveallACat(){

      this.CatID = [];

  }

  RemoveallASubcat(){
      this.SubcatID = [];

  }

  RemoveallASubsubcat(){

      this.SubsubcatID = [];

  }

  RemoveallAreas(){

      this.AreaID = [];

  }

  RemoveallIcat(){

      this.IcatID = [];

  }

  RemoveallIsubcat(){

      this.IsubcatID = [];

  }

  RemoveallIsubsubcat(){

      this.IsubsubcatID = [];

  }

  RemoveallItem(){

      this.ItemID = [];

  }


  getBuildings(){
    // this.myProject = this.myProjectList.find(x => x.pid == this.myProjectID)
    this.afs.collection(`boq/boq/projects/${this.projectID}/buildings`).get().subscribe(bdata =>{
      if(bdata.docs.length > 0){
        this.BuildingList = []
       bdata.forEach(doc=>{
          this.BuildingList.push(
              {name : doc.data().name ,
              id : doc.ref.id,
               })
       })
      }
    })
   }

   getFloors(){
   this.afs.collection<any>(`boq/boq/floors/`, ref => ref.orderBy("no", "asc")).get().subscribe(value =>{
     this.FloorList =[]
     if(value.docs.length > 0){
       value.forEach(doc=>{
       this.FloorList.push(
         {name : doc.data().name ,
          id : doc.ref.id})
         })
     }
    
   })
 
 }

 getcats(){
  this.CatList =[]
   this.BuildingID.forEach(blg =>{
    this.FloorID.forEach(fl =>{
      this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${blg}/floors/${fl}/cat`).get().subscribe(value =>{
        if(value.docs.length > 0){
          value.forEach(doc=>{
            const index = this.CatList.findIndex(x => x.id == doc.ref.id)
            if(index === -1){
              this.CatList.push(
                {name : doc.data().name ,
                 id : doc.ref.id})
            }
            })
        }
       
      })
    
    })

   })

 }

 getsubcats(){
  this.SubcatList =[]
  this.BuildingID.forEach(blg =>{
   this.FloorID.forEach(fl =>{
     this.CatID.forEach(cat =>{

      this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${blg}/floors/${fl}/cat/${cat}/subcat`).get().subscribe(value =>{
        if(value.docs.length > 0){
          value.forEach(doc=>{
            const index = this.SubcatList.findIndex(x => x.id == doc.ref.id)
            if(index === -1){
              this.SubcatList.push(
                {name : doc.data().name ,
                 id : doc.ref.id})
            }
            })
        }
       
      })

     });
   });
  });

 }

 getsubsubcats(){

  this.SubsubcatList =[]
  this.BuildingID.forEach(blg =>{
   this.FloorID.forEach(fl =>{
     this.CatID.forEach(cat =>{
      this.SubcatID.forEach(sub =>{
        this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${blg}/floors/${fl}/cat/${cat}/subcat/${sub}/subsubcat`).get().subscribe(value =>{
          if(value.docs.length > 0){
            value.forEach(doc=>{
              const index = this.SubsubcatList.findIndex(x => x.id == doc.ref.id)
              if(index === -1){
                this.SubsubcatList.push(
                  {name : doc.data().name ,
                   id : doc.ref.id})
              }
              })
          }
         
        })
      })
     });
   });
  });

 }

 getareas(){
  this.AreaList =[]
  this.BuildingID.forEach(blg =>{
   this.FloorID.forEach(fl =>{
     this.CatID.forEach(cat =>{
      this.SubcatID.forEach(sub =>{
        this.SubsubcatID.forEach(subsub =>{
          this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${blg}/floors/${fl}/cat/${cat}/subcat/${sub}/subsubcat/${subsub}/areas`).get().subscribe(value =>{
            if(value.docs.length > 0){
              value.forEach(doc=>{
                const index = this.AreaList.findIndex(x => x.id == doc.ref.id)
                if(index === -1){
                  this.AreaList.push(
                    {name : doc.data().name ,
                     id : doc.ref.id})
                }
                })
            }
           
          })
        })
      })
     });
   });
  });
 }

 getitemcat(){
  this.IcatList =[]
          this.afs.collection<any>(`boq/boq/boqitemscat/`).get().subscribe(value =>{
            if(value.docs.length > 0){
              value.forEach(doc=>{
                const index = this.IcatList.findIndex(x => x.id == doc.ref.id)
                if(index === -1){
                  this.IcatList.push(
                    {name : doc.data().name ,
                     id : doc.ref.id})
                }
                })
            }
           
          })
      
 }

 getitemsubcat(){
  this.IsubcatList =[]
  this.IcatID.forEach(ic =>{
    this.afs.collection<any>(`boq/boq/boqitemssubcat/`, ref =>ref.where("catID", "==", ic)).get().subscribe(value =>{
      if(value.docs.length > 0){
        value.forEach(doc=>{
          const index = this.IsubcatList.findIndex(x => x.id == doc.ref.id)
          if(index === -1){
            this.IsubcatList.push(
              {name : doc.data().name ,
               id : doc.ref.id})
          }
          })
      }
     
    })
  })
 }

 getitemsubsubcat(){
  this.IsubsubcatList =[]
  this.IcatID.forEach(ic =>{
    this.IsubcatID.forEach(isc =>{
      this.afs.collection<any>(`boq/boq/boqitemssubsubcat`, ref =>ref.where("subcatID", "==", isc)).get().subscribe(value =>{
        if(value.docs.length > 0){
          value.forEach(doc=>{
            const index = this.IsubsubcatList.findIndex(x => x.id == doc.ref.id)
            if(index === -1){
              this.IsubsubcatList.push(
                {name : doc.data().name ,
                 id : doc.ref.id})
            }
            })
        }
       
      })
    })
  })
 }

 getitem(){
  this.ItemList =[]
  this.IcatID.forEach(ic =>{
    this.IsubcatID.forEach(isc =>{
      this.IsubsubcatID.forEach(issc =>{
        this.afs.collection<any>(`boq/boq/boqitems`, ref =>ref.where("SubsubcatID", "==", issc)).get().subscribe(value =>{
          if(value.docs.length > 0){
            value.forEach(doc=>{
              const index = this.ItemList.findIndex(x => x.id == doc.ref.id)
              if(index === -1){
                this.ItemList.push(
                  {name : doc.data().name ,
                   id : doc.ref.id})
              }
              })
          }
         
        })
      })
    })
  })
 }


 Filter(){
   if(this.BuildingID.length > 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length <= 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0){
     this.getBuildingReport()
   }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length <= 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0){
     this.getFloorReport()
   }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length <= 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0){
     this.getAreacatReport()
   }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length <= 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0){
    this.getAreasubcatReport()
  }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length <= 0 && this.IcatID.length <= 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0){
    this.getAreasubsubcatReport()
  }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length > 0 && this.IcatID.length <= 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0){
    this.getAreaReport()
  }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length > 0 && this.IcatID.length > 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    this.getAreaIcatReport()
  }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length > 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    this.getAreaIsubcatReport()
  }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length > 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length > 0 && this.ItemID.length <= 0 ){
    this.getAreaIsubsubcatReport()
  }else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length > 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length > 0 && this.ItemID.length > 0 ){
    this.getItemReport()
  }else if(this.BuildingID.length <= 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    this.getIcatReport()
  }else if(this.BuildingID.length <= 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    this.getIsubcatReport()
  }else if(this.BuildingID.length <= 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length > 0 && this.ItemID.length <= 0 ){
    this.getIsubsubcatReport()
  }else if(this.BuildingID.length <= 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length > 0 && this.ItemID.length > 0 ){
    this.getIsubsubcatItemReport()
  }

  else if(this.BuildingID.length > 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    //Function to create
  } else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    //Function to create
  } else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    //Function to create
  } else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    //Function to create
  } else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length <= 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    //Function to create
  }
  else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    //Function to create
  }
  else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length > 0 && this.ItemID.length <= 0 ){
    //Function to create
  }
  else if(this.BuildingID.length > 0 && this.FloorID.length > 0 && this.CatID.length > 0 && this.SubcatID.length > 0 && this.SubsubcatID.length > 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length > 0 && this.ItemID.length > 0 ){
    //Function to create
  }

  else if(this.BuildingID.length > 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length <= 0 && this.ItemID.length <= 0 ){
    //Function to create
  }
  else if(this.BuildingID.length > 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length > 0 && this.ItemID.length <= 0 ){
    //Function to create
  }
  else if(this.BuildingID.length > 0 && this.FloorID.length <= 0 && this.CatID.length <= 0 && this.SubcatID.length <= 0 && this.SubsubcatID.length <= 0 && this.AreaID.length <= 0 && this.IcatID.length > 0 && this.IsubcatID.length > 0 && this.IsubsubcatID.length > 0 && this.ItemID.length > 0 ){
    //Function to create
  }
 }


  exporttoPDF(){
    const element = document.getElementById('html2canvas');
const targetElement = document.getElementById('keywordsInput').cloneNode(true);
element.appendChild(targetElement);
this.html2canvas.html2canvas(element.firstChild).then((canvas) => {
  console.log(canvas)
    var imgWidth = 208;   
      var pageHeight = 295;      
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF 
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();   
      pdf.addImage(canvas, 'PNG',0, 0, width, 0)  
      // var string = pdf.output('MYPdf.pdf'); // Generated PDF 
      pdf.save('BOQreport.pdf');
    element.firstChild.remove();
    targetElement.firstChild.remove();
}).catch((res) => {
    console.log(res);
});

  }

  topdf(){

    var data = document.getElementById('keywordsInput');
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.save('new-file.pdf'); // Generated PDF
});

  }

  exporttoExcel(){
var list = this.ItemsList
     list.forEach(value =>{
      delete value.itemID
    })   
       /* table id is passed over here */   
      //  let element = document.getElementById('excel-head'); 
       const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(list);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, "BOQ_report.xlsx");
			
  }

  sendEmail(e: Event){
    const element = document.getElementById('html2canvas');
const targetElement = document.getElementById('keywordsInput').cloneNode(true);
element.appendChild(targetElement);
this.html2canvas.html2canvas(element.firstChild).then((canvas) => {
  emailjs.send('boqmaker', 'template_KtrgNZZJ', {
    content:`<html> <body> <img src=${canvas}> </body> </html>`, alternative:true
  }, 'user_HHO1Bbl8ubkXCbyL8VvbH')
    element.firstChild.remove();
    targetElement.firstChild.remove();
}).catch((res) => {
    console.log(res);
});

 

    // emailjs.sendForm('boqmaker', 'template_KtrgNZZJ', e.target as HTMLFormElement, 'user_HHO1Bbl8ubkXCbyL8VvbH')
    //   .then((result: EmailJSResponseStatus) => {
    //     console.log(result.text);
    //   }, (error) => {
    //     console.log(error.text);
    //   });
  }

  



  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();
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

   async openMyModal(item) {
    const myModal = await this.modalController.create({
      component: Report1DetailsPage,
      componentProps: { item: item },
      cssClass: 'fullscreen'
    });
    return await myModal.present();
  }
  async materialModal(){
    const myModal = await this.modalController.create({
      component: Report1MaterialPage,
      componentProps: { itemList: this.ItemsList },
      cssClass: 'fullscreen'
    });
    return await myModal.present();
  }

  async labourModal(){
    const myModal = await this.modalController.create({
      component: Report1LabourPage,
      componentProps: { itemList: this.ItemsList },
      cssClass: 'fullscreen'
    });
    return await myModal.present();
  }

  async equipmentModal(){
    const myModal = await this.modalController.create({
      component: Report1EquipmentPage,
      componentProps: { itemList: this.ItemsList },
      cssClass: 'fullscreen'
    });
    return await myModal.present();
  }
  async otherModal(){
    const myModal = await this.modalController.create({
      component: Report1OtherPage,
      componentProps: { itemList: this.ItemsList },
      cssClass: 'fullscreen'
    });
    return await myModal.present();
  }

  async getgraph(item){
    console.log(item)
    const modal = await this.modalController.create({
    component: BoqitemgraphPage,
    cssClass: 'halfscreen',
    componentProps: { 
      EtotalPrice: item.EtotalPrice*item.qty,
      LtotalPrice: item.LtotalPrice*item.qty,
      MtotalPrice : item.MtotalPrice*item.qty,
      OtotalPrice : item.OtotalPrice*item.qty,
      StotalPrice : item.StotalPrice*item.qty,
    }
    });
  
    await modal.present();

}





  // setBoqItemsInToProject(){
  //   this.afs.collection(`boq/boq/projects/${this.projectID}/buildings`).get().subscribe(pdata =>{
  //     pdata.docs.forEach(pdoc =>{
  //       console.log('1')
  //       this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${pdoc.ref.id}/floors/`, ref => ref.orderBy("no", "asc")).get().subscribe(fdata =>{
  //         fdata.docs.forEach(fdoc =>{
  //           console.log('2')
  //           this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${pdoc.ref.id}/floors/${fdoc.ref.id}/cat/`).get().subscribe(cdata =>{
  //             cdata.docs.forEach(cdoc =>{
  //               console.log('3')
  //               this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${pdoc.ref.id}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat`).get().subscribe(sdata =>{
  //                 sdata.docs.forEach(sdoc =>{
  //                   console.log('4')
  //                   this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${pdoc.ref.id}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat/${sdoc.ref.id}/subsubcat`).get().subscribe(ssdata =>{
  //                     ssdata.docs.forEach(ssdoc =>{
  //                       console.log('5')
  //                       this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${pdoc.ref.id}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat/${sdoc.ref.id}/subsubcat/${ssdoc.ref.id}/areas`).get().subscribe(adata =>{
  //                         adata.docs.forEach(adoc =>{
  //                           console.log('6')
  //                           this.afs.collection<any>(`boq/boq/projects/${this.projectID}/buildings/${pdoc.ref.id}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat/${sdoc.ref.id}/subsubcat/${ssdoc.ref.id}/areas/${adoc.ref.id}/boqitems`).get().subscribe(idata =>{
  //                             idata.docs.forEach(idoc =>{
  //                               console.log('7')
  //                               this.afs.collection(`boq/boq/projects/${this.projectID}/boqitems`).add({
  //                                 buildname : pdoc.data().name,
  //                                 buildID :  pdoc.ref.id,
  //                                 floorname : fdoc.data().name,
  //                                 floorID: fdoc.ref.id,
  //                                 areacat  : cdoc.data().name,
  //                                 areacatID : cdoc.ref.id,
  //                                 areasubcatname : sdoc.data().name,
  //                                 areasubcatID : sdoc.ref.id,
  //                                 areasubsubcatname : ssdoc.data().name,
  //                                 areasubsubcatID : ssdoc.ref.id,
  //                                 itemID : idoc.ref.id
  //                                 area: adoc.data(),
  //                                 areaID : adoc.ref.id,
  //                                 item: idoc.data(),
  //                               })
  //                             })
  //                           })
  //                         })
  //                       })
  //                     })
  //                   })
  //                 })
  //               })
  //             })
  //           })
  //         })
  //       })
  //     })
  //   })
  // }
  
  

}














//                       area.data().Unit_length,area.data().Unit_width,area.data().Unit_height,
//                       area.data().fill,area.data().No_of_units,doc.data().item.FILL_Percentage,
//                       area.data().exc,doc.data().E_Percentage,area.data().R,area.data().RO,area.data().Floor_width_1,area.data().Floor_length_1,area.data().Floor_width_2,
//                       area.data().Floor_length_2,area.data().Floor_width_3,area.data().Floor_length_3,
//                       area.data().Floor_width_4,area.data().Floor_length_4,0,area.data().areaF,doc.data().item.floor,
//                       area.data().L1,area.data().L2,area.data().L3,area.data().L4,area.data().L5,area.data().L6,area.data().L7,area.data().L8,area.data().areaB,
//                       doc.data().item.blockdpc,0,area.data().areaC,doc.data().item.ceiling,
//                       area.data().Wall_per_lengthA,area.data().Wall_per_lengthB,area.data().Wall_per_lengthC,
//                       area.data().Wall_per_lengthD,area.data().Wall_per_lengthE,area.data().Wall_per_lengthF,
//                       area.data().Wall_per_lengthG,area.data().Wall_per_lengthH,0,area.data().areaW,0,
//                       doc.data().item.walls,area.data().PCLA,area.data().PCLB,area.data().PCLC,area.data().PCLD,
//                       area.data().PCLE,area.data().PCLF,area.data().PCLG,area.data().PCLH,0,area.data().areaCOR,
//                       doc.data().item.cornice,area.data().skirting_per_lengthA,area.data().skirting_per_lengthB,
//                       area.data().skirting_per_lengthC,area.data().skirting_per_lengthD,area.data().skirting_per_lengthE,
//                       area.data().skirting_per_lengthF,area.data().skirting_per_lengthG,area.data().skirting_per_lengthH,
//                       0,area.data().areaS,
//                       0,doc.data().item.skirting,area.data().areaB,doc.data().item.block,area.data().bit,
//                       doc.data().item.blockbitumin,
//                       area.data().conc,doc.data().item.concrete,area.data().EXTRACONCbO,area.data().EXTRACONCb,
//                       doc.data().item.Concb_Percentage,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,
//                       doc.data().item.ssp4,doc.data().item.ssp2,
//                       area.data().shutt,area.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering,doc.data().item.tbp,
//                       doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,
//                       doc.data().item.bitumin,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,
//                       doc.data().item.sep4,doc.data().item.sep2,area.data().EXTRAEXP,doc.data().item.sep1,
//                       doc.data().item.Exp_Percentage,doc.data().item.itemprecast,area.data().precast,
//                       doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,
//                       doc.data().item.spp1,area.data().polyth,
//                       doc.data().item.spp2,doc.data().item.polythene,area.data().Y8,area.data().Y10,area.data().Y12,
//                       area.data().Y16,area.data().Y20,area.data().Y25,area.data().Y32,area.data().steel,
//                       doc.data().item.itemsteel,doc.data().item.iqty,doc.data().item.I_FACTOR

