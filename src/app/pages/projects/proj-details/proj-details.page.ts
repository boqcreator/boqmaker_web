import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase'
import { Storage } from '@ionic/storage';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-proj-details',
  templateUrl: './proj-details.page.html',
  styleUrls: ['./proj-details.page.scss'],
})
export class ProjDetailsPage implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;

  private geoCoder;

  segment = "project"
  Areasegment ="am"
  itemsegment = "finish"
  pid= "";
  name= "";
  id= "";
  no= "";
  client= "";
  con= "";
  access= "";
  start= "";
  end = ""
  cont = ""
  catogery;
  des = ""
  conemail = "";
  clientaddress = "";
  clientemail= "";
  clientohoneno= "";
  contEmail= "";
  contaddress= "";
  contmob= "";
  conttel= "";
  contname= "";
  location= "";
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;


  bcolor = "white"
  bname;
  bdes

  fname;
  fcolor = "white";


  myBuildingList = []
  myBuildingID = ""

  myFloorList= []
  myFloorID = ""

  myCatList= []
  myCatID = ""

  mySubcatList= []
  mySubcatID = ""

  mySubsubcatList = []
  mySubsubcatID = ""

  myAreaList = []
  myAreaID = ""

  myItemCatList= []
  myItemCatID = ""

  myItemSubcatList= []
  myItemSubcatID = ""

  myItemSubsubcatList= []
  myItemSubsubcatID = ""

  myItems = [];
  myItemID = "";

  GloblecatList = [];
  GloblecatID = ""

  GloblesubcatList = [];
  GloblesubcatID = ""

  GloblesubsubcatList = [];
  GloblesubsubcatID = "";

  GlobleareaList = [];
  GlobleareaID = ""

  FloortoAdd;
  areatoAdd;
  CattoAdd;
  SubcattoAdd;
  SubsubcattoAdd;


  Unit_width = 0;
  Unit_length = 0;
  Unit_height = 0;
  No_of_units = 0;
  R = 0;
  RO = 0;
  L1 = 0;
  L2 = 0;
  L3 = 0;
  L4 = 0;
  L5 = 0;
  L6 = 0;
  L7 = 0;
  L8 = 0;
  Hal_Axis = 0;
  Val_Axis = 0;
  Floor_width_1 = 0;
  Floor_width_2 = 0;
  Floor_width_3 = 0;
  Floor_width_4 = 0;
  Floor_length_1 = 0;
  Floor_length_2 = 0;
  Floor_length_3 = 0;
  Floor_length_4 = 0;
  Wall_per_lengthA = 0;
  Wall_per_lengthB = 0;
  Wall_per_lengthC = 0;
  Wall_per_lengthD = 0;
  Wall_per_lengthE = 0;
  Wall_per_lengthF = 0;
  Wall_per_lengthG = 0;
  Wall_per_lengthH = 0;
  skirting_per_lengthA = 0;
  skirting_per_lengthB = 0;
  skirting_per_lengthC = 0;
  skirting_per_lengthD = 0;
  skirting_per_lengthE = 0;
  skirting_per_lengthF = 0;
  skirting_per_lengthG = 0;
  skirting_per_lengthH = 0;
  PCLA = 0;
  PCLB = 0;
  PCLC = 0;
  PCLD = 0;
  PCLE = 0;
  PCLF = 0;
  PCLG = 0;
  PCLH = 0;
  Y8 = 0;
  Y10 = 0;
  Y12 = 0;
  Y16 = 0;
  Y20 = 0;
  Y25 = 0;
  Y32 = 0;
  areaF = 0;
  areaW = 0;
  areaC = 0;
  areaS = 0;
  areaCOR = 0;
  areaB = 0;
  extraBlockDPC = 0;
  conc = 0;
  shutt = 0;
  bit = 0;
  polyth = 0;
  steel = 0;
  exc = 0;
  fill = 0;
  precast = 0;


ch1A = 0;
ch1B = 0;
ch1C = 0;
ch1D = 0;
ch1E = 0;
ch1F = 0;
ch1G = 0;
ch1H = 0;
ch1I = 0;
ch1J = 0;
ch1K = 0;
ch1L = 0;
ch1M = 0;
ch1N = 0;
ch1O = 0;
ch1P = 0;
ch1Q = 0;
ch1R = 0;
ch1S = 0;
ch1T = 0;
ch1U = 0;
ch1V = 0;
ch1W = 0;
ch1X = 0;
ch1Y = 0;
ch1Z = 0;
ch1AA = 0;
ch1AB = 0;
ch1AC = 0;
ch1AD = 0;
ch1AE = 0;
ch1AF = 0;
ch1AG = 0;
ch1AH = 0;
ch1AI = 0;
ch1AJ = 0;
ch1AK = 0;
ch1AL = 0;
ch1AM = 0;
ch1AN = 0;
ch1AO = 0;

ch2A = 0;
ch2B = 0;
ch2C = 0;
ch2D = 0;
ch2E = 0;
ch2F = 0;
ch2G = 0;
ch2H = 0;
ch2I = 0;
ch2J = 0;
ch2K = 0;
ch2L = 0;
ch2M = 0;
ch2N = 0;
ch2O = 0;
ch2P = 0;
ch2Q = 0;
ch2R = 0;
ch2S = 0;
ch2T = 0;
ch2U = 0;
ch2V = 0;
ch2W = 0;
ch2X = 0;
ch2Y = 0;
ch2Z = 0;
ch2AA = 0;
ch2AB = 0;
ch2AC = 0;
ch2AD = 0;
ch2AE = 0;
ch2AF = 0;
ch2AG = 0;
ch2AH = 0;
ch2AI = 0;
ch2AJ = 0;
ch2AK = 0;
ch2AL = 0;
ch2AM = 0;
ch2AN = 0;
ch2AO = 0;

ch3A = 0;
ch3B = 0;
ch3C = 0;
ch3D = 0;
ch3E = 0;
ch3F = 0;
ch3G = 0;
ch3H = 0;
ch3I = 0;
ch3J = 0;
ch3K = 0;
ch3L = 0;
ch3M = 0;
ch3N = 0;
ch3O = 0;
ch3P = 0;
ch3Q = 0;
ch3R = 0;
ch3S = 0;
ch3T = 0;
ch3U = 0;
ch3V = 0;
ch3W = 0;
ch3X = 0;
ch3Y = 0;
ch3Z = 0;
ch3AA = 0;
ch3AB = 0;
ch3AC = 0;
ch3AD = 0;
ch3AE = 0;
ch3AF = 0;
ch3AG = 0;
ch3AH = 0;
ch3AI = 0;
ch3AJ = 0;
ch3AK = 0;
ch3AL = 0;
ch3AM = 0;
ch3AN = 0;
ch3AO = 0;



boqitemcatList = [];
boqitemcatID = ""

boqitemsubcatList = [];
boqitemsubcatID = ""

boqitemsubsubcatList = [];
boqitemsubsubcatID = "";

boqitemList = [];
boqitem;


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
iqty=1;
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






  constructor(private menu : MenuController,private route: ActivatedRoute,
    private afs :AngularFirestore,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private storage : Storage,
    public loadingController: LoadingController) {
    this.menu.enable(false)
    this.pid = this.route.snapshot.paramMap.get('id')
   this.checkLocalStorage()
    this.afs.doc<any>(`boq/boq/projects/${this.pid}`).snapshotChanges().subscribe(value =>{
      this.name = value.payload.data().name
      this.id  = value.payload.data().id
      value.payload.data().no ? this.no = value.payload.data().no : this.no = ""
      value.payload.data().clientname ? this.client = value.payload.data().clientname : this.client = ""
      value.payload.data().con ?  this.con = value.payload.data().con : this.con =""
      value.payload.data().start ? this.start = value.payload.data().start: this.start =""
      value.payload.data().end ? this.end = value.payload.data().end: this.end =""
      value.payload.data().des ? this.des = value.payload.data().des: this.des =""
      value.payload.data().clientaddress ? this.clientaddress =   value.payload.data().clientaddress : this.clientaddress=""
      value.payload.data().clientemail ? this.clientemail =    value.payload.data().clientemail  : this.clientemail=""
      value.payload.data().clientohoneno ? this.clientohoneno = value.payload.data().clientohoneno : this.clientohoneno=""
      value.payload.data().contEmail ? this.contEmail =   value.payload.data().contEmail : this.contEmail=""
      value.payload.data().contaddress ? this.contaddress = value.payload.data().contaddress : this.contaddress=""
      value.payload.data().contmob ? this.contmob = value.payload.data().contmob : this.contmob=""
      value.payload.data().conttel ? this.conttel = value.payload.data().conttel : this.conttel=""
      value.payload.data().location ? this.longitude = value.payload.data().location.longitude : this.longitude=0
      value.payload.data().contname ? this.contname = value.payload.data().contname : this.contname=""
      value.payload.data().location ? this.latitude = value.payload.data().location.latitude : this.latitude=0
      this.map()
    })

    }


    ngOnInit() {
      this.getdata();
      this.getGboqitemcat();
    }

   getdata(){
    this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings`).snapshotChanges().subscribe(pbdata =>{
      if(pbdata.length > 0){
       pbdata.forEach(doc=>{
            this.pushToArrayBUILDING(this.myBuildingList, 
              {  name : doc.payload.doc.data().name ,
              color : doc.payload.doc.data().color,
              id : doc.payload.doc.id,
               })
       })
      }
    })
   }

  pushToArrayBUILDING(arr, obj) {
    const index = arr.findIndex((e) => e.id === obj.id);

    if (index === -1) {
        arr.push(obj);
    } else {
       if( arr[index].name != obj.name){
        arr[index].name = obj.name
       }
       if( arr[index].color != obj.color){
        arr[index].color = obj.color
       } 
    }
}

removelocalstorage(){
  this.storage.remove(`${this.pid}myFloorList`)
  this.storage.remove(`${this.pid}myFloorID`)
  this.myFloorList = [];
  this.myFloorID = "";

  this.storage.remove(`${this.pid}myCatList`)
  this.storage.remove(`${this.pid}myCatID`)
  this.myCatList = [];
  this.myCatID = "";

  this.storage.remove(`${this.pid}mySubcatList`)
  this.storage.remove(`${this.pid}mySubcatID`)
  this.mySubcatList = [];
  this.mySubcatID = "";

  this.storage.remove(`${this.pid}mySubsubcatList`)
  this.storage.remove(`${this.pid}mySubsubcatID`)
  this.mySubsubcatList = [];
  this.mySubsubcatID = "";

  this.storage.remove(`${this.pid}myAreaList`)
  this.storage.remove(`${this.pid}myAreaID`)
  this.myAreaList = [];
  this.myAreaID = "";
}


getFloors(){
  this.storage.set(`${this.pid}myBuildingList`, this.myBuildingList).then(()=>{
    this.storage.set(`${this.pid}myBuildingID`, this.myBuildingID)
  })
// this.removelocalstorage()

  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors`, ref => ref.orderBy("no", "asc")).snapshotChanges().subscribe(value =>{
    this.myFloorList =[]
    if(value.length > 0){
      value.forEach(doc=>{
        this.pushToArray(this.myFloorList, {name : doc.payload.doc.data().name , id : doc.payload.doc.id})
        })
    }else{
     this.removelocalstorage();
    }
   
  })
}


getCats(){
  this.storage.set(`${this.pid}myFloorList`, this.myFloorList).then(()=>{
    this.storage.set(`${this.pid}myFloorID`, this.myFloorID).then(()=>{
      let floor = this.myFloorList.find(x => x.id == this.myFloorID)
      this.FloortoAdd = floor
    })
  })
  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat`).snapshotChanges().subscribe(value =>{
    this.myCatList =[];
    if(value.length > 0){
      value.forEach(doc=>{
        this.pushToArray(this.myCatList, {name : doc.payload.doc.data().name , id : doc.payload.doc.id})
        })
    }else{

      this.storage.remove(`${this.pid}myCatList`)
      this.storage.remove(`${this.pid}myCatID`)
      this.myCatList = [];
      this.myCatID = "";
    
      this.storage.remove(`${this.pid}mySubcatList`)
      this.storage.remove(`${this.pid}mySubcatID`)
      this.mySubcatList = [];
      this.mySubcatID = "";
    
      this.storage.remove(`${this.pid}mySubsubcatList`)
      this.storage.remove(`${this.pid}mySubsubcatID`)
      this.mySubsubcatList = [];
      this.mySubsubcatID = "";
    
      this.storage.remove(`${this.pid}myAreaList`)
      this.storage.remove(`${this.pid}myAreaID`)
      this.myAreaList = [];
      this.myAreaID = "";

    }

   
  })
}

getSubcats(){

  this.storage.set(`${this.pid}myCatList`, this.myCatList).then(()=>{
    this.storage.set(`${this.pid}myCatID`, this.myCatID)
  })
  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat`).snapshotChanges().subscribe(value =>{
    this.mySubcatList = [];
    if(value.length > 0){
    value.forEach(doc=>{
      this.pushToArray(this.mySubcatList, {name : doc.payload.doc.data().name , id : doc.payload.doc.id})
      })  
   }else{
    this.storage.remove(`${this.pid}mySubcatList`)
    this.storage.remove(`${this.pid}mySubcatID`)
    this.mySubcatList = [];
    this.mySubcatID = "";
  
    this.storage.remove(`${this.pid}mySubsubcatList`)
    this.storage.remove(`${this.pid}mySubsubcatID`)
    this.mySubsubcatList = [];
    this.mySubsubcatID = "";
  
    this.storage.remove(`${this.pid}myAreaList`)
    this.storage.remove(`${this.pid}myAreaID`)
    this.myAreaList = [];
    this.myAreaID = "";

   }

  })

}

getSubsubcats(){

  this.storage.set(`${this.pid}mySubcatList`, this.mySubcatList).then(()=>{
    this.storage.set(`${this.pid}mySubcatID`, this.mySubcatID)
  })
  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat`).snapshotChanges().subscribe(value =>{
    this.mySubsubcatList = []
    if(value.length > 0){
    value.forEach(doc=>{
      this.pushToArray(this.mySubsubcatList, {name : doc.payload.doc.data().name , id : doc.payload.doc.id})
      })
   }else{
    this.storage.remove(`${this.pid}mySubsubcatList`)
    this.storage.remove(`${this.pid}mySubsubcatID`)
    this.mySubsubcatList = [];
    this.mySubsubcatID = "";
  
    this.storage.remove(`${this.pid}myAreaList`)
    this.storage.remove(`${this.pid}myAreaID`)
    this.myAreaList = [];
    this.myAreaID = "";
   }

   
  })

}


pushToArray(arr, obj) {
  const index = arr.findIndex((e) => e.id === obj.id);

  if (index === -1) {
      arr.push(obj);
  } else {
     if( arr[index].name != obj.name){
      arr[index].name = obj.name
     }
  }
}

pushToArrayItemCat(arr, obj) {
  const index = arr.findIndex((e) => e.id === obj.id);

  if (index === -1) {
      arr.push(obj);
  } else {
     if( arr[index].name != obj.name){
      arr[index].name = obj.name
     }
  }
}


getArea(){

  this.storage.set(`${this.pid}mySubsubcatList`, this.mySubsubcatList).then(()=>{
    this.storage.set(`${this.pid}mySubsubcatID`, this.mySubsubcatID)
  })

  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas`).snapshotChanges().subscribe(value =>{
    this.myAreaList= []
    if(value.length > 0){
    value.forEach(doc=>{
   this.pushToArray( this.myAreaList, {
      name : doc.payload.doc.data().name ,
       id : doc.payload.doc.id,
       catname : doc.payload.doc.data().catname,
       catid : doc.payload.doc.data().catid,
       subcatname : doc.payload.doc.data().subcatname,
       subcatid : doc.payload.doc.data().subcatid,
       subsubcatname : doc.payload.doc.data().subsubcatname,
       subsubcatid : doc.payload.doc.data().subsubcatid,
       floorname : doc.payload.doc.data().floorname,
       Unit_width : doc.payload.doc.data().Unit_width,
       Unit_length : doc.payload.doc.data().Unit_length,
       Unit_height : doc.payload.doc.data().Unit_height,
       No_of_units : doc.payload.doc.data().No_of_units,
       R : doc.payload.doc.data().R,
       RO : doc.payload.doc.data().RO,
       L1 : doc.payload.doc.data().L1,
       L2 : doc.payload.doc.data().L2,
       L3 : doc.payload.doc.data().L3,
       L4 : doc.payload.doc.data().L4,
       L5 : doc.payload.doc.data().L5,
       L6 : doc.payload.doc.data().L6,
       L7 : doc.payload.doc.data().L7,
       L8 : doc.payload.doc.data().L8,
       Hal_Axis : doc.payload.doc.data().Hal_Axis,
       Val_Axis : doc.payload.doc.data().Val_Axis,
       Floor_width_1 : doc.payload.doc.data().Floor_width_1,
       Floor_width_2 : doc.payload.doc.data().Floor_width_2,
       Floor_width_3 : doc.payload.doc.data().Floor_width_3,
       Floor_width_4 : doc.payload.doc.data().Floor_width_4,
       Floor_length_1 : doc.payload.doc.data().Floor_length_1,
       Floor_length_2 : doc.payload.doc.data().Floor_length_2,
       Floor_length_3 : doc.payload.doc.data().Floor_length_3,
       Floor_length_4 : doc.payload.doc.data().Floor_length_4,
       Wall_per_lengthA : doc.payload.doc.data().Wall_per_lengthA,
       Wall_per_lengthB : doc.payload.doc.data().Wall_per_lengthB,
       Wall_per_lengthC : doc.payload.doc.data().Wall_per_lengthC,
       Wall_per_lengthD : doc.payload.doc.data().Wall_per_lengthD,
       Wall_per_lengthE : doc.payload.doc.data().Wall_per_lengthE,
       Wall_per_lengthF : doc.payload.doc.data().Wall_per_lengthF,
       Wall_per_lengthG : doc.payload.doc.data().Wall_per_lengthG,
       Wall_per_lengthH : doc.payload.doc.data().Wall_per_lengthH,
       skirting_per_lengthA : doc.payload.doc.data().skirting_per_lengthA,
       skirting_per_lengthB : doc.payload.doc.data().skirting_per_lengthB,
       skirting_per_lengthC : doc.payload.doc.data().skirting_per_lengthC,
       skirting_per_lengthD : doc.payload.doc.data().skirting_per_lengthD,
       skirting_per_lengthE : doc.payload.doc.data().skirting_per_lengthE,
       skirting_per_lengthF : doc.payload.doc.data().skirting_per_lengthF,
       skirting_per_lengthG : doc.payload.doc.data().skirting_per_lengthG,
       skirting_per_lengthH : doc.payload.doc.data().skirting_per_lengthH,
       PCLA : doc.payload.doc.data().PCLA,
       PCLB : doc.payload.doc.data().PCLB,
       PCLC : doc.payload.doc.data().PCLC,
       PCLD : doc.payload.doc.data().PCLD,
       PCLE : doc.payload.doc.data().PCLE,
       PCLF : doc.payload.doc.data().PCLF,
       PCLG : doc.payload.doc.data().PCLG,
       PCLH : doc.payload.doc.data().PCLH,
       Y8 : doc.payload.doc.data().Y8,
       Y10 : doc.payload.doc.data().Y10,
       Y12 : doc.payload.doc.data().Y12,
       Y16 : doc.payload.doc.data().Y16,
       Y20 : doc.payload.doc.data().Y20,
       Y25 : doc.payload.doc.data().Y25,
       Y32 : doc.payload.doc.data().Y32,
       areaF : doc.payload.doc.data().areaF,
       areaW : doc.payload.doc.data().areaW,
       areaC : doc.payload.doc.data().areaC,
       areaS : doc.payload.doc.data().areaS,
       areaCOR : doc.payload.doc.data().areaCOR,
       areaB : doc.payload.doc.data().areaB,
       extraBlockDPC : doc.payload.doc.data().extraBlockDPC,
       conc : doc.payload.doc.data().conc,
       shutt : doc.payload.doc.data().shutt,
       bit : doc.payload.doc.data().bit,
       polyth : doc.payload.doc.data().polyth,
       steel : doc.payload.doc.data().steel,
       exc : doc.payload.doc.data().exc,
       fill : doc.payload.doc.data().fill,
       precast : doc.payload.doc.data().precast
     })
    })
  }
  else{
    this.storage.remove(`${this.pid}myAreaList`)
    this.storage.remove(`${this.pid}myAreaID`)
    this.myAreaList = [];
    this.myAreaID = "";
  }
   
  })

}

myAreaSeelcted(){
  this.storage.set(`${this.pid}myAreaList`, this.myAreaList).then(()=>{
    this.storage.set(`${this.pid}myAreaID`, this.myAreaID)
  })

  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas/${this.myAreaID}/boqitems`).snapshotChanges().subscribe(value =>{
    this.myItemCatList = [];
    console.log(value.length)
    value.forEach(doc =>{
        this.afs.doc(`boq/boq/boqitemscat/${doc.payload.doc.data().itemdetails.CatID}`).get().subscribe(boq =>{
           this.pushToArrayItemCat(this.myItemCatList ,{name : boq.data().name , id : boq.id}) 
        })
      })
  })
}
getMyItemsubcat(){
  this.storage.set(`${this.pid}myItemCatList`, this.myItemCatList).then(()=>{
  this.storage.set(`${this.pid}myItemCatID`, this.myItemCatID)
  })
  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas/${this.myAreaID}/boqitems`).snapshotChanges().subscribe(value =>{
    this.myItemSubcatList = [];
    console.log(value.length)
    value.forEach(doc =>{
        this.afs.doc(`boq/boq/boqitemscat/${this.myItemCatID}/subcat/${doc.payload.doc.data().itemdetails.SubcatID}`).get().subscribe(boq =>{
           this.pushToArrayItemCat(this.myItemSubcatList ,{name : boq.data().name , id : boq.id}) 
        })
      })
  })

}


getMyItemsubsubcat(){
  this.storage.set(`${this.pid}myItemSubcatList`, this.myItemSubcatList).then(()=>{
    this.storage.set(`${this.pid}myItemSubcatID`, this.myItemSubcatID)
    })
    this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas/${this.myAreaID}/boqitems`).snapshotChanges().subscribe(value =>{
      this.myItemSubsubcatList = [];
      console.log(value.length)
      value.forEach(doc =>{
          this.afs.doc(`boq/boq/boqitemscat/${this.myItemCatID}/subcat/${this.myItemSubcatID}/subsubcat/${doc.payload.doc.data().itemdetails.SubsubcatID}`).get().subscribe(boq =>{
             this.pushToArrayItemCat(this.myItemSubsubcatList ,{name : boq.data().name , id : boq.id}) 
          })
        })
    })

}

getMyItems(){
  this.storage.set(`${this.pid}myItemSubsubcatList`, this.myItemSubsubcatList).then(()=>{
    this.storage.set(`${this.pid}myItemSubsubcatID`, this.myItemSubsubcatID)
    })
    this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas/${this.myAreaID}/boqitems`, ref => ref.where("itemdetails.SubsubcatID" , "==", this.myItemSubsubcatID)).snapshotChanges().subscribe(value =>{
      this.myItems = [];
      value.forEach(doc =>{
        this.myItems.push({
          id : doc.payload.doc.id,
          itemdetails : doc.payload.doc.data().itemdetails,
        ceiling : doc.payload.doc.data().ceiling,
        floor : doc.payload.doc.data().floor,
        walls : doc.payload.doc.data().walls,
        cornice : doc.payload.doc.data().cornice,
        skirting : doc.payload.doc.data().skirting,
        shuttering : doc.payload.doc.data().shuttering,
        block : doc.payload.doc.data().block,
        blockdpc : doc.payload.doc.data().blockdpc,
        concrete : doc.payload.doc.data().concrete,
        polythene : doc.payload.doc.data().polythene,
        bitumin : doc.payload.doc.data().bitumin,
        itemsteel : doc.payload.doc.data().itemsteel,
        blockbitumin : doc.payload.doc.data().blockbitumin,
        iqty : doc.payload.doc.data().iqty,
        itempercentage : doc.payload.doc.data().itempercentage,
        completion : doc.payload.doc.data().completion,
        itemprecast : doc.payload.doc.data().itemprecast,
        existing : doc.payload.doc.data().existing,
        existing1 : doc.payload.doc.data().existing1,
        existing2 : doc.payload.doc.data().existing2,
        tsp : doc.payload.doc.data().tsp,
        bpp : doc.payload.doc.data().bpp,
        spp1 : doc.payload.doc.data().spp1,
        spp2 : doc.payload.doc.data().spp2,
        spp3 : doc.payload.doc.data().spp3,
        spp4 : doc.payload.doc.data().spp4,
        tpp : doc.payload.doc.data().tpp,
        bbp : doc.payload.doc.data().bbp,
        sbp1 : doc.payload.doc.data().sbp1,
        sbp2 : doc.payload.doc.data().sbp2,
        sbp3 : doc.payload.doc.data().sbp3,
        sbp4 : doc.payload.doc.data().sbp4,
        tep : doc.payload.doc.data().tep,
        tbp : doc.payload.doc.data().tbp,
        bep : doc.payload.doc.data().bep,
        sep1 : doc.payload.doc.data().sep1,
        sep2 : doc.payload.doc.data().sep2,
        sep3 : doc.payload.doc.data().sep3,
        sep4 : doc.payload.doc.data().sep4,
        bsp : doc.payload.doc.data().bsp,
        ssp1 : doc.payload.doc.data().ssp1,
        ssp2 : doc.payload.doc.data().ssp2,
        ssp3 : doc.payload.doc.data().ssp3,
        ssp4 : doc.payload.doc.data().ssp4,
          
        })
      })

    })

}

setMyItems(){
  this.storage.set(`${this.pid}myItems`, this.myItems).then(()=>{
    this.storage.set(`${this.pid}myItemID`, this.myItemID)
    })
}

async updateproj(){

  const loading = await this.loadingController.create({
    message: 'Updating project...',
    duration: 20000
  });
  await loading.present();

  this.afs.doc(`boq/boq/projects/${this.pid}`).update({
    name : this.name,  
    id   : this.id ,
    no  :  this.no  ,  
    con : this.con,
    start : this.start,
    end : this.end,
    des  :  this.des,
    clientaddress :  this.clientaddress,
    clientemail  : this.clientemail ,
    clientohoneno :  this.clientohoneno,
    contEmail : this.contEmail ,
    contaddress:  this.contaddress,
    contmob :this.contmob ,
    conttel : this.conttel ,
    location  : new firebase.firestore.GeoPoint(this.latitude , this.longitude),
    contname : this.contname,
    clientname : this.client,
  }).then(()=>{
    loading.dismiss().then(()=>{
      alert("Updated Successfully!")
    })
  })

}



// ADDING BUILDING
async addBuilding(){
  const loading = await this.loadingController.create({
    message: 'Adding...',
    duration: 20000
  });
  await loading.present();
   this.afs.collection(`boq/boq/projects/${this.pid}/buildings`).add({
     name : this.bname,
     color : this.bcolor,
     des : this.bdes,
   }).then(value =>{
    this.afs.collection(`boq/boq/floors`).get().subscribe(va =>{
      va.docs.forEach(doo =>{
        this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${value.id}/floors/${doo.ref.id}`).set({
          name : doo.data().name,
          no : doo.data().no
        })
      })
    })
    }).then(()=>{
     loading.dismiss();
     this.bdes = ""
     this.bname = ""
     this.bcolor = "white"
     alert("Added Successfully!")
   })
 }

 // ADDING FLOOR
 async addFloor(){
  const loading = await this.loadingController.create({
    message: 'Adding...',
    duration: 20000
  });
  await loading.present();
  this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors`).get().subscribe(v =>{
   let num = v.docs.length+1
   this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors`).add({
    name : this.fname , 
    no : num,
    color : this.fcolor
   }).then(()=>{
     loading.dismiss().then(()=>{
      alert("Added Successfully!")
     })
     this.fname = ""
     this.fcolor = ""
   })
  })

 }

// LOCAL STORAGE CHECK FOR ALREADY SELECTED ITEMS
 checkLocalStorage(){
  this.storage.get(`${this.pid}myBuildingList`).then(value =>{
    if(value !== null){
        this.myBuildingList = value
        this.storage.get(`${this.pid}myBuildingID`).then(myB =>{
        this.myBuildingID = myB
        })
    }
}).then(()=>{

this.storage.get(`${this.pid}myFloorList`).then(value =>{
 if(value !== null){
     this.myFloorList = value
     this.storage.get(`${this.pid}myFloorID`).then(myF =>{
     this.myFloorID = myF
     })
 }
}).then(()=>{
this.storage.get(`${this.pid}myCatList`).then(value =>{
if(value !== null){
 this.myCatList = value
 this.storage.get(`${this.pid}myCatID`).then(myC =>{
 this.myCatID = myC
 })
}
}).then(()=>{

this.storage.get(`${this.pid}mySubcatList`).then(value =>{
if(value !== null){
 this.mySubcatList = value
 this.storage.get(`${this.pid}mySubcatID`).then(mySub =>{
 this.mySubcatID = mySub
 })
}
}).then(()=>{
this.storage.get(`${this.pid}mySubsubcatList`).then(value =>{
if(value !== null){
 this.mySubsubcatList = value
 this.storage.get(`${this.pid}mySubsubcatID`).then(mySubsub =>{
 this.mySubsubcatID = mySubsub
 })
}
}).then(()=>{
this.storage.get(`${this.pid}myAreaList`).then(value =>{
if(value !== null){
 this.myAreaList = value
 this.storage.get(`${this.pid}myAreaID`).then(mySubsub =>{
   if(mySubsub !== null){
    this.myAreaID = mySubsub
    this.myAreaSeelcted()
   }
 })
}
})

})
})

})
})

})

this.storage.get(`${this.pid}GloblecatList`).then(value=>{
  if(value !== null){
    this.GloblecatList = value
    this.storage.get(`${this.pid}GloblecatID`).then(value =>{
      if(value !== null){
        this.GloblecatID = value
      }
    })
  }
}).then(()=>{
  this.getGlobleAreas();
}).then(()=>{

  this.storage.get(`${this.pid}GloblesubcatList`).then(value=>{
    if(value !== null){
      this.GloblesubcatList = value
      this.storage.get(`${this.pid}GloblesubcatID`).then(value =>{
        if(value !== null){
          this.GloblesubcatID = value
        }
      })
    }
  }).then(()=>{
    this.storage.get(`${this.pid}GloblesubsubcatList`).then(value=>{
      if(value !== null){
        this.GloblesubsubcatList = value
        this.storage.get(`${this.pid}GloblesubsubcatID`).then(value =>{
          if(value !== null){
            this.GloblesubsubcatID = value
          }
        })
      }
    })
  }).then(()=>{
    this.storage.get(`${this.pid}GlobleareaList`).then(value=>{
      if(value !== null){
        this.GlobleareaList = value
        this.storage.get(`${this.pid}GlobleareaID`).then(value =>{
          if(value !== null){
            this.GlobleareaID = value
            this.assigning()
          }
        })
      }
    })
    


  })
  
})

this.storage.get(`boqitemcat`).then(value=>{
  if(value !== null){
    this.boqitemcatID = value
    this.getGboqitemsubcat()
  }
})
this.storage.get(`boqitemsubcat`).then(value=>{
  if(value !== null){
    this.boqitemsubcatID = value
    this.getGboqitemsubsubcat()
  }
})
this.storage.get(`boqitemsubsubcat`).then(value=>{
  if(value !== null){
    this.boqitemsubsubcatID = value
    this.getGboqitems()
  }
})

this.storage.get(`${this.pid}myItemCatList`).then(value =>{
  if(value !== null){
   this.myItemCatList = value
   this.storage.get(`${this.pid}myItemCatID`).then(mySubsub =>{
     if(mySubsub !== null){
      this.myItemCatID = mySubsub
      this.getMyItemsubcat()
     }
   })
  }
  })

  this.storage.get(`${this.pid}myItemSubcatList`).then(value =>{
    if(value !== null){
     this.myItemSubcatList = value
     this.storage.get(`${this.pid}myItemSubcatID`).then(v =>{
      if(v !== null){
       this.myItemSubcatID = v
       this.getMyItemsubsubcat()
      }
    })
    }
    })

    this.storage.get(`${this.pid}myItemSubsubcatList`).then(value =>{
      if(value !== null){
       this.myItemSubsubcatList = value
       this.storage.get(`${this.pid}myItemSubsubcatID`).then(v =>{
        if(v !== null){
         this.myItemSubsubcatID = v
         
        }
      })
      }
      })


    this.storage.get(`${this.pid}myItems`).then(value =>{
      if(value !== null){
       this.myItems = value
       this.storage.get(`${this.pid}myItemID`).then(v =>{
        if(v !== null){
         this.myItemID = v
         
        }
      })
      }
      })


 }

 getGlobleAreas(){
   this.afs.collection<any>(`boq/boq/Areas`).snapshotChanges().subscribe(value =>{
     value.forEach(doc =>{
       this.pushToArray(this.GloblecatList ,
         {
           name : doc.payload.doc.data().name,
           id : doc.payload.doc.id
          })
     })
   })
 }

 getGsubcat(){
  this.storage.set(`${this.pid}GloblecatList`, this.GloblecatList).then(()=>{
    this.storage.set(`${this.pid}GloblecatID`, this.GloblecatID)
  })

  this.storage.remove(`${this.pid}GloblesubcatList`)
  this.storage.remove(`${this.pid}GloblesubcatID`)
  this.GloblesubcatList = [];
  this.GloblesubcatID = "";

  this.storage.remove(`${this.pid}GloblesubsubcatList`)
  this.storage.remove(`${this.pid}GloblesubsubcatID`)
  this.GloblesubsubcatList = [];
  this.GloblesubsubcatID = "";

  this.storage.remove(`${this.pid}GlobleareaList`)
  this.storage.remove(`${this.pid}GlobleareaID`)
  this.GlobleareaList = [];
  this.GlobleareaID = "";

  this.afs.collection<any>(`boq/boq/Areas/${this.GloblecatID}/cat`).snapshotChanges().subscribe(value =>{
    value.forEach(doc=>{
    this.pushToArray(this.GloblesubcatList, {name : doc.payload.doc.data().name , id : doc.payload.doc.id})
    })
  })
}

getGsubsubcat(){
  this.storage.set(`${this.pid}GloblesubcatList`, this.GloblesubcatList).then(()=>{
    this.storage.set(`${this.pid}GloblesubcatID`, this.GloblesubcatID)
  })


  this.storage.remove(`${this.pid}GloblesubsubcatList`)
  this.storage.remove(`${this.pid}GloblesubsubcatID`)
  this.GloblesubsubcatList = [];
  this.GloblesubsubcatID = "";

  this.storage.remove(`${this.pid}GlobleareaList`)
  this.storage.remove(`${this.pid}GlobleareaID`)
  this.GlobleareaList = [];
  this.GlobleareaID = "";

  this.afs.collection<any>(`boq/boq/Areas/${this.GloblecatID}/cat/${this.GloblesubcatID}/subcat`).snapshotChanges().subscribe(value =>{
    value.forEach(doc=>{
    this.pushToArray(this.GloblesubsubcatList, {name : doc.payload.doc.data().name , id : doc.payload.doc.id})
    })
   
  })

}

getGlobleareas(){
  this.storage.set(`${this.pid}GloblesubsubcatList`, this.GloblesubsubcatList).then(()=>{
    this.storage.set(`${this.pid}GloblesubsubcatID`, this.GloblesubsubcatID)
  })

  this.storage.remove(`${this.pid}GlobleareaList`)
  this.storage.remove(`${this.pid}GlobleareaID`)
  this.GlobleareaList = [];
  this.GlobleareaID = "";

  this.afs.collection<any>(`boq/boq/Areas/${this.GloblecatID}/cat/${this.GloblesubcatID}/subcat/${this.GloblesubsubcatID}/items`).snapshotChanges().subscribe(value =>{
    value.forEach(doc=>{
    this.pushToArray(this.GlobleareaList,
       {
         name : doc.payload.doc.data().name ,
          id : doc.payload.doc.id,
          attributes : doc.payload.doc.data().attributes
        
        })
    })
   
  })
  

}

assigning(){
  this.storage.set(`${this.pid}GlobleareaList`, this.GlobleareaList).then(()=>{
    this.storage.set(`${this.pid}GlobleareaID`, this.GlobleareaID)
    let area = this.GlobleareaList.find(x => x.id == this.GlobleareaID)
    this.areatoAdd = area
    let cat = this.GloblecatList.find(x => x.id == this.GloblecatID)
    this.CattoAdd = cat
    let subcat = this.GloblesubcatList.find(x => x.id == this.GloblesubcatID)
    this.SubcattoAdd = subcat
    let subsubcat = this.GloblesubsubcatList.find(x => x.id == this.GloblesubsubcatID)
    this.SubsubcattoAdd = subsubcat
    
  })

}


async addareatoproj(){
  const loading = await this.loadingController.create({
    message: 'Adding...',
    duration: 20000
  });
  await loading.present();
  this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.GloblecatID}`).set({
    name : this.CattoAdd.name,
    id :  this.CattoAdd.id,
  }).then(()=>{
    this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.GloblecatID}/subcat/${this.GloblesubcatID}`).set({
      name : this.SubcattoAdd.name,
      id : this.SubcattoAdd.id,
    }).then(()=>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.GloblecatID}/subcat/${this.GloblesubcatID}/subsubcat/${this.GloblesubsubcatID}`).set({
        name : this.SubsubcattoAdd.name,
         id : this.SubsubcattoAdd.id,
      }).then(()=>{

        this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.GloblecatID}/subcat/${this.GloblesubcatID}/subsubcat/${this.GloblesubsubcatID}/areas/${this.GlobleareaID}`).get().subscribe(ch =>{
          if(!ch.exists){
            this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.GloblecatID}/subcat/${this.GloblesubcatID}/subsubcat/${this.GloblesubsubcatID}/areas/${this.GlobleareaID}`).set({
              catname : this.CattoAdd.name,
              catid :  this.CattoAdd.id,
              subcatname : this.SubcattoAdd.name,
              subcatid : this.SubcattoAdd.id,
              subsubcatname : this.SubsubcattoAdd.name,
              subsubcatid : this.SubsubcattoAdd.id,
              name : this.areatoAdd.name,
              floorname : this.FloortoAdd.name,
              Unit_width : this.Unit_width,
          Unit_length : this.Unit_length,
          Unit_height : this.Unit_height,
          No_of_units : this.No_of_units,
          R : this.R,
          RO : this.RO,
          L1 : this.L1,
          L2 : this.L2,
          L3 : this.L3,
          L4 : this.L4,
          L5 : this.L5,
          L6 : this.L6,
          L7 : this.L7,
          L8 : this.L8,
          Hal_Axis : this.Hal_Axis,
          Val_Axis : this.Val_Axis,
          Floor_width_1 : this.Floor_width_1,
          Floor_width_2 : this.Floor_width_2,
          Floor_width_3 : this.Floor_width_3,
          Floor_width_4 : this.Floor_width_4,
          Floor_length_1 : this.Floor_length_1,
          Floor_length_2 : this.Floor_length_2,
          Floor_length_3 : this.Floor_length_3,
          Floor_length_4 : this.Floor_length_4,
          Wall_per_lengthA : this.Wall_per_lengthA,
          Wall_per_lengthB : this.Wall_per_lengthB,
          Wall_per_lengthC : this.Wall_per_lengthC,
          Wall_per_lengthD : this.Wall_per_lengthD,
          Wall_per_lengthE : this.Wall_per_lengthE,
          Wall_per_lengthF : this.Wall_per_lengthF,
          Wall_per_lengthG : this.Wall_per_lengthG,
          Wall_per_lengthH : this.Wall_per_lengthH,
          skirting_per_lengthA : this.skirting_per_lengthA,
          skirting_per_lengthB : this.skirting_per_lengthB,
          skirting_per_lengthC : this.skirting_per_lengthC,
          skirting_per_lengthD : this.skirting_per_lengthD,
          skirting_per_lengthE : this.skirting_per_lengthE,
          skirting_per_lengthF : this.skirting_per_lengthF,
          skirting_per_lengthG : this.skirting_per_lengthG,
          skirting_per_lengthH : this.skirting_per_lengthH,
          PCLA : this.PCLA,
          PCLB : this.PCLB,
          PCLC : this.PCLC,
          PCLD : this.PCLD,
          PCLE : this.PCLE,
          PCLF : this.PCLF,
          PCLG : this.PCLG,
          PCLH : this.PCLH,
          Y8 : this.Y8,
          Y10 : this.Y10,
          Y12 : this.Y12,
          Y16 : this.Y16,
          Y20 : this.Y20,
          Y25 : this.Y25,
          Y32 : this.Y32,
          areaF : this.areaF,
          areaW : this.areaW,
          areaC : this.areaC,
          areaS : this.areaS,
          areaCOR : this.areaCOR,
          areaB : this.areaB,
          extraBlockDPC : this.extraBlockDPC,
          conc : this.conc,
          shutt : this.shutt,
          bit : this.bit,
          polyth : this.polyth,
          steel : this.steel,
          exc : this.exc,
          fill : this.fill,
          precast : this.precast,


ch1A : this.ch1A,
ch1B : this.ch1B,
ch1C : this.ch1C,
ch1D : this.ch1D,
ch1E : this.ch1E,
ch1F : this.ch1F,
ch1G : this.ch1G,
ch1H : this.ch1H,
ch1I : this.ch1I,
ch1J : this.ch1J,
ch1K : this.ch1K,
ch1L : this.ch1L,
ch1M : this.ch1M,
ch1N : this.ch1N,
ch1O : this.ch1O,
ch1P : this.ch1P,
ch1Q : this.ch1Q,
ch1R : this.ch1R,
ch1S : this.ch1S,
ch1T : this.ch1T,
ch1U : this.ch1U,
ch1V : this.ch1V,
ch1W : this.ch1W,
ch1X : this.ch1X,
ch1Y : this.ch1Y,
ch1Z : this.ch1Z,
ch1AA : this.ch1AA,
ch1AB : this.ch1AB,
ch1AC : this.ch1AC,
ch1AD : this.ch1AD,
ch1AE : this.ch1AE,
ch1AF : this.ch1AF,
ch1AG : this.ch1AG,
ch1AH : this.ch1AH,
ch1AI : this.ch1AI,
ch1AJ : this.ch1AJ,
ch1AK : this.ch1AK,
ch1AL : this.ch1AL,
ch1AM : this.ch1AM,
ch1AN : this.ch1AN,
ch1AO : this.ch1AO,

ch2A : this.ch2A,
ch2B : this.ch2B,
ch2C : this.ch2C,
ch2D : this.ch2D,
ch2E : this.ch2E,
ch2F : this.ch2F,
ch2G : this.ch2G,
ch2H : this.ch2H,
ch2I : this.ch2I,
ch2J : this.ch2J,
ch2K : this.ch2K,
ch2L : this.ch2L,
ch2M : this.ch2M,
ch2N : this.ch2N,
ch2O : this.ch2O,
ch2P : this.ch2P,
ch2Q : this.ch2Q,
ch2R : this.ch2R,
ch2S : this.ch2S,
ch2T : this.ch2T,
ch2U : this.ch2U,
ch2V : this.ch2V,
ch2W : this.ch2W,
ch2X : this.ch2X,
ch2Y : this.ch2Y,
ch2Z : this.ch2Z,
ch2AA : this.ch2AA,
ch2AB : this.ch2AB,
ch2AC : this.ch2AC,
ch2AD : this.ch2AD,
ch2AE : this.ch2AE,
ch2AF : this.ch2AF,
ch2AG : this.ch2AG,
ch2AH : this.ch2AH,
ch2AI : this.ch2AI,
ch2AJ : this.ch2AJ,
ch2AK : this.ch2AK,
ch2AL : this.ch2AL,
ch2AM : this.ch2AM,
ch2AN : this.ch2AN,
ch2AO : this.ch2AO,

ch3A : this.ch3A,
ch3B : this.ch3B,
ch3C : this.ch3C,
ch3D : this.ch3D,
ch3E : this.ch3E,
ch3F : this.ch3F,
ch3G : this.ch3G,
ch3H : this.ch3H,
ch3I : this.ch3I,
ch3J : this.ch3J,
ch3K : this.ch3K,
ch3L : this.ch3L,
ch3M : this.ch3M,
ch3N : this.ch3N,
ch3O : this.ch3O,
ch3P : this.ch3P,
ch3Q : this.ch3Q,
ch3R : this.ch3R,
ch3S : this.ch3S,
ch3T : this.ch3T,
ch3U : this.ch3U,
ch3V : this.ch3V,
ch3W : this.ch3W,
ch3X : this.ch3X,
ch3Y : this.ch3Y,
ch3Z : this.ch3Z,
ch3AA : this.ch3AA,
ch3AB : this.ch3AB,
ch3AC : this.ch3AC,
ch3AD : this.ch3AD,
ch3AE : this.ch3AE,
ch3AF : this.ch3AF,
ch3AG : this.ch3AG,
ch3AH : this.ch3AH,
ch3AI : this.ch3AI,
ch3AJ : this.ch3AJ,
ch3AK : this.ch3AK,
ch3AL : this.ch3AL,
ch3AM : this.ch3AM,
ch3AN : this.ch3AN,
ch3AO : this.ch3AO,
          
            }).then(()=>{
              loading.dismiss().then(()=>{
               alert("Added Successfully!")
              })
              
            })
          } else{
            loading.dismiss()
            alert("Can't add because this area already exist")
          }
        })

      })
    })
  })
}


segmentBuilding(){
  this.segment = "building"
}
segmentFloor(){
  this.segment = "floor"
}
segmentarea(){
  if(this.segment!="area") {
   this.segment="area"
  } 
}






// MAP
map(){
  this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;
  
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      
    });
    autocomplete.setComponentRestrictions({
      'country' : [`bh`]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
  
        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 17;
        this.getAddress(this.latitude, this.longitude);
      });
    });
  });
}

    // Get Current Location Coordinates
    private setCurrentLocation() {
          this.zoom = 15;
          this.getAddress(this.latitude, this.longitude);


    }

getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}
  
markerDragEnd(event: MouseEvent) {
  console.log(event);
  this.latitude = event.coords.lat;
  this.longitude = event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}








// ITEMS FUNCTIONS

getGboqitemcat(){
  this.afs.collection<any>(`boq/boq/boqitemscat`).snapshotChanges().subscribe(value =>{
   this.boqitemcatList = []
    value.forEach(doc =>{
     this.boqitemcatList.push({
       name : doc.payload.doc.data().name,
      id : doc.payload.doc.id})
    })
  })
}

getGboqitemsubcat(){
  this.storage.set(`boqitemcat`, this.boqitemcatID)

 this.afs.collection<any>(`boq/boq/boqitemscat/${this.boqitemcatID}/subcat`).snapshotChanges().subscribe(value =>{
  this.boqitemsubcatList = []
    value.forEach(doc =>{
     this.boqitemsubcatList.push({
       name : doc.payload.doc.data().name,
      id : doc.payload.doc.id})
    })
 })
}

getGboqitemsubsubcat(){
  this.storage.set(`boqitemsubcat`, this.boqitemsubcatID)


 this.afs.collection<any>(`boq/boq/boqitemscat/${this.boqitemcatID}/subcat/${this.boqitemsubcatID}/subsubcat`).snapshotChanges().subscribe(value =>{
  this.boqitemsubsubcatList = []
    value.forEach(doc =>{
     this.boqitemsubsubcatList.push({
       name : doc.payload.doc.data().name,
      id : doc.payload.doc.id})
    })
  
 })

}

getGboqitems(){
  this.storage.set(`boqitemsubsubcat`, this.boqitemsubsubcatID)

 this.afs.collection<any>(`boq/boq/boqitemscat/${this.boqitemcatID}/subcat/${this.boqitemsubcatID}/subsubcat/${this.boqitemsubsubcatID}/boqitems`).snapshotChanges().subscribe(value =>{
  this.boqitemList = []
  value.forEach(doc =>{
    this.boqitemList.push({
      name : doc.payload.doc.data().name,
     id : doc.payload.doc.id,
     CatID :doc.payload.doc.data().CatID,
     SubcatID :doc.payload.doc.data().SubcatID,
     SubsubcatID :doc.payload.doc.data().SubsubcatID,
     materials :doc.payload.doc.data().materials,
     price :doc.payload.doc.data().price,
     unit :doc.payload.doc.data().unit,
    })
   })
 })

}

async addItem(){
  if(this.myBuildingID 
    && this.myFloorID 
    && this.myCatID 
    && this.mySubsubcatID 
    && this.mySubsubcatID 
    && this.myAreaID 
    && this.boqitemcatID 
    && this.boqitemsubcatID 
    && this.boqitemsubsubcatID 
    && this.boqitem){
      const loading = await this.loadingController.create({
        message: 'Adding...',
        duration: 20000
      });
      await loading.present();
       this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas/${this.myAreaID}/boqitems/${this.boqitem.id}`).set({
       itemdetails : this.boqitem,
        ceiling : this.ceiling,
        floor : this.floor,
        walls : this.walls,
        cornice : this.cornice,
        skirting : this.skirting,
        shuttering : this.shuttering,
        block : this.block,
        blockdpc : this.blockdpc,
        concrete : this.concrete,
        polythene : this.polythene,
        bitumin : this.bitumin,
        itemsteel : this.itemsteel,
        blockbitumin : this.blockbitumin,
        iqty : this.iqty,
        itempercentage : this.itempercentage,
        completion : this.completion,
        itemprecast : this.itemprecast,
        existing : this.existing,
        existing1 : this.existing1,
        existing2 : this.existing2,
        tsp : this.tsp,
        bpp : this.bpp,
        spp1 : this.spp1,
        spp2 : this.spp2,
        spp3 : this.spp3,
        spp4 : this.spp4,
        tpp : this.tpp,
        bbp : this.bbp,
        sbp1 : this.sbp1,
        sbp2 : this.sbp2,
        sbp3 : this.sbp3,
        sbp4 : this.sbp4,
        tep : this.tep,
        tbp : this.tbp,
        bep : this.bep,
        sep1 : this.sep1,
        sep2 : this.sep2,
        sep3 : this.sep3,
        sep4 : this.sep4,
        bsp : this.bsp,
        ssp1 : this.ssp1,
        ssp2 : this.ssp2,
        ssp3 : this.ssp3,
        ssp4 : this.ssp4,
       }).then(()=>{
         loading.dismiss().then(()=>{
          alert("Added Successfully!")
         })
       })
    
  }else{
    alert("Please recheck, any selection or field is missing.")
  }
}


}
