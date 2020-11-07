import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MenuController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase'
import { Storage } from '@ionic/storage';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { EditareasPage } from '../../editareas/editareas.page';
import { element } from 'protractor';
import { EdititemsPage } from '../../edititems/edititems.page';
import { EditvaritiondetailsPage } from '../../editvaritiondetails/editvaritiondetails.page';
import { FinalqtytablePage } from '../../finalqtytable/finalqtytable.page';
import * as XLSX from 'xlsx';
import { CalculatorPage } from '../../calculator/calculator.page';
import { TypespicPage } from '../../typespic/typespic.page';
declare var google: any;

@Component({
  selector: 'app-proj-details',
  templateUrl: './proj-details.page.html',
  styleUrls: ['./proj-details.page.scss'],
})
export class ProjDetailsPage implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;
  datatable = [];
  termexcel = ''
  data: [][];
  areapanel = true;
  areapanelsize = 3
  itempanel = true;
  itempanelsize = 3
  mainpanelsize = 6
  private geoCoder;
  dualValue2= {lower: 0, upper: 100}
  segment = "project"
  Areasegment ="am"
  itemsegment = "finish"
  segmentlist="form"
  segmentItemDetails = "a2a"
  itemaddsegment = "add"
  firstloadedFloor = false
  firstloadedCat= false
  firstloadedSubcat = false
  firstloadedSubsubcat = false
  firstloadedArea = false
  pid= "";
  name= "";
  id= "";
  type = "";
  code = "";
  no= "";
  client= "";
  con= "";
  country = "";
  currency = "";
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
  allareaflag = false;
  term1;
  term2;
  termId;

  bcolor = "white"
  bname;
  bdes

  fname;
  fcolor = "white";

  myItemsList=[]

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
  myAreaID = [];
  myAreas;

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
  Globlearea;

  FloortoAdd;
  areatoAdd;
  CattoAdd;
  SubcattoAdd;
  SubsubcattoAdd;

  areacode = "";
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
  Y6 = 0;
  Y8 = 0;
  Y10 = 0;
  Y12 = 0;
  Y14 = 0;
  Y16 = 0;
  Y18 = 0;
  Y20 = 0;
  Y22 = 0;
  Y25 = 0;
  Y28 = 0;
  Y32 = 0;
  Y40 = 0;
  totalfinalorderinKg = 0;
  totalfinalorderinTon = 0;

  extraworkqqty = 0;
  extraexpansionjointqty=0;
  extrablkqty = 0;
  extrablindqty=0;
  expectnoboqitem=0;

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
  EXTRAEXP = 0;
  EXTRACONCBO = 0;
  EXTRACONCB = 0;

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
ch1AE = '';
ch1AF = '';
ch1AG = '';
ch1AH = '';
ch1AI = '';
ch1AJ = '';
ch1AK = '';
ch1AL = '';
ch1AM = '';
ch1AN = '';
ch1AO = '';

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
ch2U = '';
ch2V = '';
ch2W = '';
ch2X = '';
ch2Y = '';
ch2Z = '';
ch2AA = '';
ch2AB = '';
ch2AC = '';
ch2AD = '';
ch2AE = '';
ch2AF = '';
ch2AG = '';
ch2AH = '';
ch2AI = '';
ch2AJ = '';
ch2AK = '';
ch2AL = '';
ch2AM = '';
ch2AN = '';
ch2AO = '';

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
ch3U = '';
ch3V = '';
ch3W = '';
ch3X = '';
ch3Y = '';
ch3Z = '';
ch3AA = '';
ch3AB = '';
ch3AC = '';
ch3AD = '';
ch3AE = '';
ch3AF = '';
ch3AG = '';
ch3AH = '';
ch3AI = '';
ch3AJ = '';
ch3AK = '';
ch3AL = '';
ch3AM = '';
ch3AN = '';
ch3AO = '';


boqitemcatList = [];
boqitemcatID = ""

boqitemsubcatList = [];
boqitemsubcatID = ""

boqitemsubsubcatList = [];
boqitemsubsubcatID = "";

boqitemList = [];
boqitem=[];

//ITEMS Variables
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



myfloorsLH = {lower : 0 , upper :0};


segmentopenDetails = "list";
OpentypeList;
opentypeID = "";
OpeningList;
OpeningID;
noofopen = 1;
openper = 100;
opennote = ""
myopeningsList = [];
termopen = "";


segmentprojectionDetails = "list";
projectiontypeList;
projectiontypeID = "";
projectionList;
projectionID;
noofprojection = 1;
projectionper = 100;
projectionnote = ""
myprojectionsList = [];
termprojection = "";
projectionFloor = 0;
projectionCeiling = 0;
projectionWall = 100;
projectionSkirting = 100;
projectionCornice = 100;


//VARIATION VARIABLES
vartermId= "";
myvariationsList = [];
segmentvariationDetails = "list";
variationsegment = "finish";
varceiling=0;
varfloor=0;
varwalls=0;
varcornice=0;
varskirting=0;
varshuttering=0;
varblock=0;
varblockdpc=0;
varconcrete=0;
varpolythene=0;
varbitumin=0;
varitemsteel=0;
varblockbitumin=0;
varFILL_Percentage=0;
varE_Percentage=0;
varI_DIS=0;
varI_FACTOR=100;
varExp_Percentage=0;
varConcb_Percentage=0;
variqty=0;
varitempercentage=0;
varcompletion=0;
varitemprecast=0;
varexisting="true";
varexisting1="false";
varexisting2="false";
vartsp=0;
varbpp=0;
varspp1=0;
varspp2=0;
varspp3=0;
varspp4=0;
vartpp=0;
varbbp=0;
varsbp1=0;
varsbp2=0;
varsbp3=0;
varsbp4=0;
vartep=0;
vartbp=0;
varbep=0;
varsep1=0;
varsep2=0;
varsep3=0;
varsep4=0;
varbsp=0;
varssp1=0;
varssp2=0;
varssp3=0;
varssp4=0;

varich1A = 0;
varich1B = 0;
varich1C = 0;
varich1D = 0;
varich1E = 0;
varich1F = 0;
varich1G = 0;
varich1H = 0;
varich1I = 0;
varich1J = 0;
varich1K = 0;
varich1L = 0;
varich1M = 0;
varich1N = 0;
varich1O = 0;
varich1P = 0;
varich1Q = 0;
varich1R = 0;
varich1S = 0;
varich1T = 0;
varich1U = '';
varich1V = '';
varich1W = '';
varich1X = '';
varich1Y = '';
varich1Z = '';
varich1AA = '';
varich1AB = '';
varich1AC = '';
varich1AD = '';
varich1AE = '';
varich1AF = '';
varich1AG = '';
varich1AH = '';
varich1AI = '';
varich1AJ = '';
varich1AK = '';
varich1AL = '';
varich1AM = '';
varich1AN = '';
varich1AO = '';

varich2A = 0;
varich2B = 0;
varich2C = 0;
varich2D = 0;
varich2E = 0;
varich2F = 0;
varich2G = 0;
varich2H = 0;
varich2I = 0;
varich2J = 0;
varich2K = 0;
varich2L = 0;
varich2M = 0;
varich2N = 0;
varich2O = 0;
varich2P = 0;
varich2Q = 0;
varich2R = 0;
varich2S = 0;
varich2T = 0;
varich2U = '';
varich2V = '';
varich2W = '';
varich2X = '';
varich2Y = '';
varich2Z = '';
varich2AA = '';
varich2AB = '';
varich2AC = '';
varich2AD = '';
varich2AE = '';
varich2AF = '';
varich2AG = '';
varich2AH = '';
varich2AI = '';
varich2AJ = '';
varich2AK = '';
varich2AL = '';
varich2AM = '';
varich2AN = '';
varich2AO = '';

varich3A = 0;
varich3B = 0;
varich3C = 0;
varich3D = 0;
varich3E = 0;
varich3F = 0;
varich3G = 0;
varich3H = 0;
varich3I = 0;
varich3J = 0;
varich3K = 0;
varich3L = 0;
varich3M = 0;
varich3N = 0;
varich3O = 0;
varich3P = 0;
varich3Q = 0;
varich3R = 0;
varich3S = 0;
varich3T = 0;
varich3U = '';
varich3V = '';
varich3W = '';
varich3X = '';
varich3Y = '';
varich3Z = '';
varich3AA = '';
varich3AB = '';
varich3AC = '';
varich3AD = '';
varich3AE = '';
varich3AF = '';
varich3AG = '';
varich3AH = '';
varich3AI = '';
varich3AJ = '';
varich3AK = '';
varich3AL = '';
varich3AM = '';
varich3AN = '';
varich3AO = '';

excelitemList = [];



shape1 = 0;
shape2 = 0;
shape3 = 0;
shape4 = 0;
shape5 = 0;
shape6 = 0;
shape7 = 0;
shape8 = 0;
Totallengthofrings = 0;
NoofringsMIDDLETHIRD = 0;
NoofringsOTHERTHIRDRIGHTLEFT = 0;
c19 = 0;
c21 = 0;
c27 = 0;
c29 = 0;
c31 = 0;
c33 = 0;
c35 = 0;
c37 = 0;
c39 = 0;
c41 = 0;
c43 = 0;
f27 = 0;
f29 = 0;
f31 = 0;
f33 = 0;
f35 = 0;
f37 = 0;
f39 = 0;
f41 = 0;
f43 = 0;

ConcQtym3 = 0;
SteelAllkg = 0;
Steelringonlykg = 0;
Mainsteelonlykg = 0;
persteelkgm3 = 0;
persteelringkgm3 = 0;
permainsteelkgm3 = 0;


// floorstoadd = [
//   {no : -1 , name: "Basement 1"},
//   {no : -2 , name: "Basement 2"},
//   {no : -3 , name: "Basement 3"},
//   {no : -4 , name: "Basement 4"},
//   {no : -5 , name: "Basement 5"},
//   {no : -6 , name: "Basement 6"},
//   {no : -7 , name: "Basement 7"},
//   {no : -8 , name: "Basement 8"},
//   {no : -9 , name: "Basement 9"},
//   {no : -10 , name: "Basement 10"},
//   {no : -11 , name: "Basement 11"},
//   {no : -12 , name: "Basement 12"},
//   {no : -13 , name: "Basement 13"},
//   {no : -14 , name: "Basement 14"},
//   {no : -15 , name: "Basement 15"},
//   {no : -16 , name: "Basement 16"},
//   {no : -17 , name: "Basement 17"},
//   {no : -18 , name: "Basement 18"},
//   {no : -19 , name: "Basement 19"},
//   {no : -20 , name: "Basement 20"},
//   {no : -21 , name: "Basement 21"},
//   {no : -22 , name: "Basement 22"},
//   {no : -23 , name: "Basement 23"},
//   {no : -24 , name: "Basement 24"},
//   {no : -25 , name: "Basement 25"},
//   {no : -26 , name: "Basement 26"},
//   {no : -27 , name: "Basement 27"},
//   {no : -28 , name: "Basement 28"},
//   {no : -29 , name: "Basement 29"},
  
//   {no : -30 , name: "Basement 30"},
//   {no : -31 , name: "Basement 31"},
//   {no : -32 , name: "Basement 32"},
//   {no : -33 , name: "Basement 33"},
//   {no : -34 , name: "Basement 34"},
//   {no : -35 , name: "Basement 35"},
//   {no : -36 , name: "Basement 36"},
//   {no : -37 , name: "Basement 37"},
//   {no : -38 , name: "Basement 38"},
//   {no : -39 , name: "Basement 39"},

//   {no : -40 , name: "Basement 40"},
//   {no : -41 , name: "Basement 41"},
//   {no : -42 , name: "Basement 42"},
//   {no : -43 , name: "Basement 43"},
//   {no : -44 , name: "Basement 44"},
//   {no : -45 , name: "Basement 45"},
//   {no : -46 , name: "Basement 46"},
//   {no : -47 , name: "Basement 47"},
//   {no : -48 , name: "Basement 48"},
//   {no : -49 , name: "Basement 49"},

//   {no : -50 , name: "Basement 50"},
//   {no : -51 , name: "Basement 51"},
//   {no : -52 , name: "Basement 52"},
//   {no : -53 , name: "Basement 53"},
//   {no : -54 , name: "Basement 54"},
//   {no : -55 , name: "Basement 55"},
//   {no : -56 , name: "Basement 56"},
//   {no : -57 , name: "Basement 57"},
//   {no : -58 , name: "Basement 58"},
//   {no : -59 , name: "Basement 59"},

//   {no : -60 , name: "Basement 60"},
//   {no : -61 , name: "Basement 61"},
//   {no : -62 , name: "Basement 62"},
//   {no : -63 , name: "Basement 63"},
//   {no : -64 , name: "Basement 64"},
//   {no : -65 , name: "Basement 65"},
//   {no : -66 , name: "Basement 66"},
//   {no : -67 , name: "Basement 67"},
//   {no : -68 , name: "Basement 68"},
//   {no : -69 , name: "Basement 69"},


//   {no : -70 , name: "Basement 70"},
//   {no : -71 , name: "Basement 71"},
//   {no : -72 , name: "Basement 72"},
//   {no : -73 , name: "Basement 73"},
//   {no : -74 , name: "Basement 74"},
//   {no : -75 , name: "Basement 75"},
//   {no : -76 , name: "Basement 76"},
//   {no : -77 , name: "Basement 77"},
//   {no : -78 , name: "Basement 78"},
//   {no : -79 , name: "Basement 79"},

//   {no : -80 , name: "Basement 80"},
//   {no : -81 , name: "Basement 81"},
//   {no : -82 , name: "Basement 82"},
//   {no : -83 , name: "Basement 83"},
//   {no : -84 , name: "Basement 84"},
//   {no : -85 , name: "Basement 85"},
//   {no : -86 , name: "Basement 86"},
//   {no : -87 , name: "Basement 87"},
//   {no : -88 , name: "Basement 88"},
//   {no : -89 , name: "Basement 89"},

//   {no : -90 , name: "Basement 90"},
//   {no : -91 , name: "Basement 91"},
//   {no : -92 , name: "Basement 92"},
//   {no : -93 , name: "Basement 93"},
//   {no : -94 , name: "Basement 94"},
//   {no : -95 , name: "Basement 95"},
//   {no : -96 , name: "Basement 96"},
//   {no : -97 , name: "Basement 97"},
//   {no : -98 , name: "Basement 98"},
//   {no : -99 , name: "Basement 99"},
//   {no : -100 , name: "Basement 100"},
// ]



  constructor(private menu : MenuController,private route: ActivatedRoute,
    private afs :AngularFirestore,
    private router : Router,
    private mapsAPILoader: MapsAPILoader,
    private modalController: ModalController,
    private alertController: AlertController,
    private ngZone: NgZone,
    private storage : Storage,
    public loadingController: LoadingController) {
    this.menu.enable(false)
    this.pid = this.route.snapshot.paramMap.get('id')
   this.checkLocalStorage()
    this.afs.doc<any>(`boq/boq/projects/${this.pid}`).snapshotChanges().subscribe(value =>{
      this.name = value.payload.data().name
      this.id  = value.payload.data().id
      value.payload.data().type ? this.type = value.payload.data().type : this.type = ""
      value.payload.data().code ? this.code = value.payload.data().code : this.code = ""
      value.payload.data().country ? this.country = value.payload.data().country : this.country = ""
      value.payload.data().currency ? this.currency = value.payload.data().currency : this.currency = ""
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
      this.getopentype();
      this.getprojectiontype();
      this.getGboqitemcat();
      this.getexcelitems();
    }
    hidearea(){
      if(this.areapanel && this.itempanel){
        this.areapanel = false;
        this.areapanelsize = 0.4;
        this.mainpanelsize = 8.6;

      }
      else if(this.areapanel && !this.itempanel){
        this.areapanel = false;
        this.areapanelsize = 0.4;
        this.mainpanelsize = 11.2;
      }else if(!this.areapanel && !this.itempanel){
        this.areapanel = true;
        this.areapanelsize = 3;
        this.mainpanelsize = 8.6;
      }
      else if(!this.areapanel && this.itempanel){
        this.areapanel = true;
        this.areapanelsize = 3;
        this.mainpanelsize = 6;
      }
    }

    hideitem(){
      if(this.areapanel && this.itempanel){
        this.itempanel = false;
        this.itempanelsize = 0.4;
        this.mainpanelsize = 8.6;

      }else if(!this.areapanel && this.itempanel){
        this.itempanel = false;
        this.itempanelsize = 0.4;
        this.mainpanelsize = 11.2;
      }else if(!this.areapanel && !this.itempanel){
        this.itempanel = true;
        this.itempanelsize = 3;
        this.mainpanelsize = 8.6;
      }
      else if(this.areapanel && !this.itempanel){
        this.itempanel = true;
        this.itempanelsize = 3;
        this.mainpanelsize = 6;
      }
    }
    
    getopentype(){
    this.OpentypeList =  this.afs.collection<any>(`boq/boq/openingtypes/`).valueChanges();
    }
    getopeings(){
      this.OpeningList =  this.afs.collection<any>(`boq/boq/openings/`, ref => ref.where("type.id","==", this.opentypeID)).valueChanges();
    }
    async addopeningtoarea(){
      if(this.myAreaID.length > 0){
        const loading = await this.loadingController.create({
          message: 'Adding...',
          duration: 20000
        });
        await loading.present();
  
        this.myAreaID.forEach(element => {
          var areaarray = element.split("/");
          let area = this.myAreaList.find(x => x.id == areaarray[2])
          this.afs.collection(`boq/boq/projects/${this.pid}/openings/`, ref => ref.where("areaID", "==", area.id).where("openID", "==", this.OpeningID.id)).get().subscribe(va =>{
            if(va.docs.length >0){
              loading.dismiss()
              alert("Opening already exist in "+ area.name)
            }else{
              this.afs.collection(`boq/boq/projects/${this.pid}/openings/`).add({
                buildID :  area.BuildingID,
                floorID: area.floorID,
                areacatID : area.catid,
                areasubcatID : area.subcatid,
                areasubsubcatID : area.subsubcatid,
                areaID : area.id,
                openID : this.OpeningID.id,
                openno : this.noofopen,
                openper :  this.openper,
                opennote : this.opennote,
                opening : this.OpeningID,
             }).then(()=>{
              this.afs.doc(`boq/boq/projects/${this.pid}/openingsType/${this.OpeningID.type.id}`).set({
                name : this.OpeningID.type.name,
                createdon : new Date()
              })
             }).then(()=>{
               loading.dismiss().then(()=>{
                alert("Added Successfully!")

                if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                  this.getAllOpeningsofBuilding()
                }
                else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                  this.getAllOpensofFloor()
                }
                else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                  this.getAllOpeningofCat()
                }
                else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
                  this.getAllOpeningofSubcat()
                }
                else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
                  this.getAllOpeningofSubsubcat()
                }else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                  this.getAllOpenings()
                }
               })
             })
            }
          })
        })
    }else{
      alert("Please recheck, any selection or field is missing.")
    }
    }

    getprojectiontype(){
      this.projectiontypeList =  this.afs.collection<any>(`boq/boq/projectiontypes/`).valueChanges();
      }
      getprojections(){
        this.projectionList =  this.afs.collection<any>(`boq/boq/projections/`, ref => ref.where("type.id","==", this.projectiontypeID)).valueChanges();
      }
      async addprojectiontoarea(){
        if(this.myAreaID.length > 0){
          const loading = await this.loadingController.create({
            message: 'Adding...',
            duration: 20000
          });
          await loading.present();
    
          this.myAreaID.forEach(element => {
            var areaarray = element.split("/");
            let area = this.myAreaList.find(x => x.id == areaarray[2])
            this.afs.collection(`boq/boq/projects/${this.pid}/projections/`, ref => ref.where("areaID", "==", area.id).where("projectionID", "==", this.projectionID.id)).get().subscribe(va =>{
              if(va.docs.length >0){
                loading.dismiss()
                alert("projection already exist in "+ area.name)
              }else{
                this.afs.collection(`boq/boq/projects/${this.pid}/projections/`).add({
                  buildID :  area.BuildingID,
                  floorID: area.floorID,
                  areacatID : area.catid,
                  areasubcatID : area.subcatid,
                  areasubsubcatID : area.subsubcatid,
                  areaID : area.id,
                  projectionID : this.projectionID.id,
                  projectionno : this.noofprojection,
                  projectionper :  this.projectionper,
                  projectionnote : this.projectionnote,
                  projectionFloor : this.projectionFloor,
                  projectionCeiling : this.projectionCeiling,
                  projectionWall : this.projectionWall,
                  projectionSkirting : this.projectionSkirting,
                  projectionCornice : this.projectionCornice,
                  projection : this.projectionID,
               }).then(()=>{
                this.afs.doc(`boq/boq/projects/${this.pid}/projectionsType/${this.projectionID.type.id}`).set({
                  name : this.projectionID.type.name,
                  createdon : new Date()
                })
               }).then(()=>{
                 loading.dismiss().then(()=>{
                  alert("Added Successfully!")
  
                  if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                    this.getAllprojectionsofBuilding()
                  }
                  else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                    this.getAllprojectionsofFloor()
                  }
                  else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                    this.getAllprojectionofCat()
                  }
                  else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
                    this.getAllprojectionofSubcat()
                  }
                  else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
                    this.getAllprojectionofSubsubcat()
                  }else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                    this.getAllprojections()
                  }
                 })
               })
              }
            })
          })
      }else{
        alert("Please recheck, any selection or field is missing.")
      }
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
  this.myAreaID = [];
}


getFloors(){
  this.storage.set(`${this.pid}myBuildingList`, this.myBuildingList).then(()=>{
    this.storage.set(`${this.pid}myBuildingID`, this.myBuildingID)
  })
  if(this.firstloadedFloor){
    this.removelocalstorage();
    this.getAllAreasofBuildings()
    this.getAllItemsofBuilding()
    this.getAllVariationsofBuilding()
    this.getAllOpeningsofBuilding()
    this.getAllprojectionsofBuilding()
  }
  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors`, ref => ref.orderBy("no", "asc")).snapshotChanges().subscribe(value =>{
    this.myFloorList =[]
    this.myfloorsLH = {lower : 0 , upper : 0}
    if(value.length > 0){
      value.forEach(doc=>{
        this.pushToArray(this.myFloorList, {name : doc.payload.doc.data().name , id : doc.payload.doc.id})
         if(doc.payload.doc.data().no <= this.myfloorsLH.lower){
          this.myfloorsLH.lower = doc.payload.doc.data().no
         }
         if(doc.payload.doc.data().no >= this.myfloorsLH.upper){
          this.myfloorsLH.upper = doc.payload.doc.data().no
         }
        })
    }else{
     this.removelocalstorage();
    }
   
  })

  this.firstloadedFloor = true;
}


getCats(){
  this.storage.set(`${this.pid}myFloorList`, this.myFloorList).then(()=>{
    this.storage.set(`${this.pid}myFloorID`, this.myFloorID).then(()=>{
      let floor = this.myFloorList.find(x => x.id == this.myFloorID)
      this.FloortoAdd = floor
    })
  })
  if(this.firstloadedCat){
    
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
    this.myAreaID = [];

    this.getAllAreasofFloors();
    this.getAllItemsofFloor();
    this.getAllVariationsofFloor();
    this.getAllOpensofFloor();
    this.getAllprojectionsofFloor();
  }
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
      this.myAreaID = [];

    }

   
  })
  this.firstloadedCat = true;
}

getSubcats(){

  this.storage.set(`${this.pid}myCatList`, this.myCatList).then(()=>{
    this.storage.set(`${this.pid}myCatID`, this.myCatID)
  })
  if(this.firstloadedSubcat){
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
    this.myAreaID = [];

    this.getAllAreasofCat();
    this.getAllItemsofCat();
    this.getAllVariationsofCat();
    this.getAllOpeningofCat()
    this.getAllprojectionofCat()
  }
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
    this.myAreaID = [];

   }

  })
  this.firstloadedSubcat = true
}

getSubsubcats(){

  this.storage.set(`${this.pid}mySubcatList`, this.mySubcatList).then(()=>{
    this.storage.set(`${this.pid}mySubcatID`, this.mySubcatID)
  })
  if(this.firstloadedSubsubcat){
    this.storage.remove(`${this.pid}mySubsubcatList`)
    this.storage.remove(`${this.pid}mySubsubcatID`)
    this.mySubsubcatList = [];
    this.mySubsubcatID = "";
  
    this.storage.remove(`${this.pid}myAreaList`)
    this.storage.remove(`${this.pid}myAreaID`)
    this.myAreaList = [];
    this.myAreaID = [];

    this.getAllAreasofSubcat();
    this.getAllItemsofSubcat();
    this.getAllVariationsofSubcat();
    this.getAllOpeningofSubcat();
    this.getAllprojectionofSubcat();
  }
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
    this.myAreaID = [];
   }

   
  })
this.firstloadedSubsubcat = true
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
console.log("Get area worked")
  this.storage.set(`${this.pid}mySubsubcatList`, this.mySubsubcatList).then(()=>{
    this.storage.set(`${this.pid}mySubsubcatID`, this.mySubsubcatID)
  })
  if(this.firstloadedArea){
    this.storage.remove(`${this.pid}myAreaList`)
    this.storage.remove(`${this.pid}myAreaID`)
    this.myAreaList = [];
    this.myAreaID = [];
    this.getAllItemsofSubsubcat();
    this.getAllVariationsofSubsubcat();
    this.getAllOpeningofSubsubcat();
    this.getAllprojectionofSubsubcat();
  }
  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas`).snapshotChanges().subscribe(value =>{
    this.myAreaList= []
    if(value.length > 0){
    value.forEach(doc=>{
   this.pushToArray( this.myAreaList, {
    id : doc.payload.doc.ref.id,
    catname : doc.payload.doc.data().catname,
     catid :  doc.payload.doc.data().catid,
     subcatname : doc.payload.doc.data().subcatname,
     subcatid : doc.payload.doc.data().subcatid,
     subsubcatname : doc.payload.doc.data().subsubcatname,
     subsubcatid : doc.payload.doc.data().subsubcatid,
     name : doc.payload.doc.data().name,
     floorname : doc.payload.doc.data().floorname,
     floorID : doc.payload.doc.data().floorID,
     BuildingID : doc.payload.doc.data().BuildingID,
     code : doc.payload.doc.data().code,
     image : doc.payload.doc.data().image,
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
     Y6 : doc.payload.doc.data().Y6,
     Y8 : doc.payload.doc.data().Y8,
     Y10 : doc.payload.doc.data().Y10,
     Y12 : doc.payload.doc.data().Y12,
     Y14 : doc.payload.doc.data().Y14,
     Y16 : doc.payload.doc.data().Y16,
     Y18 : doc.payload.doc.data().Y18,
     Y20 : doc.payload.doc.data().Y20,
     Y22 : doc.payload.doc.data().Y22,
     Y25 : doc.payload.doc.data().Y25,
     Y28 : doc.payload.doc.data().Y28,
     Y32 : doc.payload.doc.data().Y32,
     Y40 : doc.payload.doc.data().Y40,
     extraworkqqty : doc.payload.doc.data().extraworkqqty,
     extraexpansionjointqty : doc.payload.doc.data().extraexpansionjointqty,
     extrablkqty : doc.payload.doc.data().extrablkqty,
     extrablindqty : doc.payload.doc.data().extrablindqty,
     expectnoboqitem : doc.payload.doc.data().expectnoboqitem,
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
     precast : doc.payload.doc.data().precast,
     EXTRAEXP : doc.payload.doc.data().EXTRAEXP,
     EXTRACONCBO : doc.payload.doc.data().EXTRACONCBO,
     EXTRACONCB : doc.payload.doc.data().EXTRACONCB,


     ch1A : doc.payload.doc.data().ch1A,
     ch1B : doc.payload.doc.data().ch1B,
     ch1C : doc.payload.doc.data().ch1C,
     ch1D : doc.payload.doc.data().ch1D,
     ch1E : doc.payload.doc.data().ch1E,
     ch1F : doc.payload.doc.data().ch1F,
     ch1G : doc.payload.doc.data().ch1G,
     ch1H : doc.payload.doc.data().ch1H,
     ch1I : doc.payload.doc.data().ch1I,
     ch1J : doc.payload.doc.data().ch1J,
     ch1K : doc.payload.doc.data().ch1K,
     ch1L : doc.payload.doc.data().ch1L,
     ch1M : doc.payload.doc.data().ch1M,
     ch1N : doc.payload.doc.data().ch1N,
     ch1O : doc.payload.doc.data().ch1O,
     ch1P : doc.payload.doc.data().ch1P,
     ch1Q : doc.payload.doc.data().ch1Q,
     ch1R : doc.payload.doc.data().ch1R,
     ch1S : doc.payload.doc.data().ch1S,
     ch1T : doc.payload.doc.data().ch1T,
     ch1U : doc.payload.doc.data().ch1U,
     ch1V : doc.payload.doc.data().ch1V,
     ch1W : doc.payload.doc.data().ch1W,
     ch1X : doc.payload.doc.data().ch1X,
     ch1Y : doc.payload.doc.data().ch1Y,
     ch1Z : doc.payload.doc.data().ch1Z,
     ch1AA : doc.payload.doc.data().ch1AA,
     ch1AB : doc.payload.doc.data().ch1AB,
     ch1AC : doc.payload.doc.data().ch1AC,
     ch1AD : doc.payload.doc.data().ch1AD,
     ch1AE : doc.payload.doc.data().ch1AE,
     ch1AF : doc.payload.doc.data().ch1AF,
     ch1AG : doc.payload.doc.data().ch1AG,
     ch1AH : doc.payload.doc.data().ch1AH,
     ch1AI : doc.payload.doc.data().ch1AI,
     ch1AJ : doc.payload.doc.data().ch1AJ,
     ch1AK : doc.payload.doc.data().ch1AK,
     ch1AL : doc.payload.doc.data().ch1AL,
     ch1AM : doc.payload.doc.data().ch1AM,
     ch1AN : doc.payload.doc.data().ch1AN,
     ch1AO : doc.payload.doc.data().ch1AO,

     ch2A : doc.payload.doc.data().ch2A,
     ch2B : doc.payload.doc.data().ch2B,
     ch2C : doc.payload.doc.data().ch2C,
     ch2D : doc.payload.doc.data().ch2D,
     ch2E : doc.payload.doc.data().ch2E,
     ch2F : doc.payload.doc.data().ch2F,
     ch2G : doc.payload.doc.data().ch2G,
     ch2H : doc.payload.doc.data().ch2H,
     ch2I : doc.payload.doc.data().ch2I,
     ch2J : doc.payload.doc.data().ch2J,
     ch2K : doc.payload.doc.data().ch2K,
     ch2L : doc.payload.doc.data().ch2L,
     ch2M : doc.payload.doc.data().ch2M,
     ch2N : doc.payload.doc.data().ch2N,
     ch2O : doc.payload.doc.data().ch2O,
     ch2P : doc.payload.doc.data().ch2P,
     ch2Q : doc.payload.doc.data().ch2Q,
     ch2R : doc.payload.doc.data().ch2R,
     ch2S : doc.payload.doc.data().ch2S,
     ch2T : doc.payload.doc.data().ch2T,
     ch2U : doc.payload.doc.data().ch2U,
     ch2V : doc.payload.doc.data().ch2V,
     ch2W : doc.payload.doc.data().ch2W,
     ch2X : doc.payload.doc.data().ch2X,
     ch2Y : doc.payload.doc.data().ch2Y,
     ch2Z : doc.payload.doc.data().ch2Z,
     ch2AA : doc.payload.doc.data().ch2AA,
     ch2AB : doc.payload.doc.data().ch2AB,
     ch2AC : doc.payload.doc.data().ch2AC,
     ch2AD : doc.payload.doc.data().ch2AD,
     ch2AE : doc.payload.doc.data().ch2AE,
     ch2AF : doc.payload.doc.data().ch2AF,
     ch2AG : doc.payload.doc.data().ch2AG,
     ch2AH : doc.payload.doc.data().ch2AH,
     ch2AI : doc.payload.doc.data().ch2AI,
     ch2AJ : doc.payload.doc.data().ch2AJ,
     ch2AK : doc.payload.doc.data().ch2AK,
     ch2AL : doc.payload.doc.data().ch2AL,
     ch2AM : doc.payload.doc.data().ch2AM,
     ch2AN : doc.payload.doc.data().ch2AN,
     ch2AO : doc.payload.doc.data().ch2AO,

     ch3A : doc.payload.doc.data().ch3A,
     ch3B : doc.payload.doc.data().ch3B,
     ch3C : doc.payload.doc.data().ch3C,
     ch3D : doc.payload.doc.data().ch3D,
     ch3E : doc.payload.doc.data().ch3E,
     ch3F : doc.payload.doc.data().ch3F,
     ch3G : doc.payload.doc.data().ch3G,
     ch3H : doc.payload.doc.data().ch3H,
     ch3I : doc.payload.doc.data().ch3I,
     ch3J : doc.payload.doc.data().ch3J,
     ch3K : doc.payload.doc.data().ch3K,
     ch3L : doc.payload.doc.data().ch3L,
     ch3M : doc.payload.doc.data().ch3M,
     ch3N : doc.payload.doc.data().ch3N,
     ch3O : doc.payload.doc.data().ch3O,
     ch3P : doc.payload.doc.data().ch3P,
     ch3Q : doc.payload.doc.data().ch3Q,
     ch3R : doc.payload.doc.data().ch3R,
     ch3S : doc.payload.doc.data().ch3S,
     ch3T : doc.payload.doc.data().ch3T,
     ch3U : doc.payload.doc.data().ch3U,
     ch3V : doc.payload.doc.data().ch3V,
     ch3W : doc.payload.doc.data().ch3W,
     ch3X : doc.payload.doc.data().ch3X,
     ch3Y : doc.payload.doc.data().ch3Y,
     ch3Z : doc.payload.doc.data().ch3Z,
     ch3AA : doc.payload.doc.data().ch3AA,
     ch3AB : doc.payload.doc.data().ch3AB,
     ch3AC : doc.payload.doc.data().ch3AC,
     ch3AD : doc.payload.doc.data().ch3AD,
     ch3AE : doc.payload.doc.data().ch3AE,
     ch3AF : doc.payload.doc.data().ch3AF,
     ch3AG : doc.payload.doc.data().ch3AG,
     ch3AH : doc.payload.doc.data().ch3AH,
     ch3AI : doc.payload.doc.data().ch3AI,
     ch3AJ : doc.payload.doc.data().ch3AJ,
     ch3AK : doc.payload.doc.data().ch3AK,
     ch3AL : doc.payload.doc.data().ch3AL,
     ch3AM : doc.payload.doc.data().ch3AM,
     ch3AN : doc.payload.doc.data().ch3AN,
     ch3AO : doc.payload.doc.data().ch3AO,
     })
    })
    this.storage.get(`${this.pid}myAreaID`).then(myarea =>{
      if(myarea !== null){
       this.myAreaID = myarea
       console.log(myarea)

      }
    })
  }
  else{
    this.storage.remove(`${this.pid}myAreaList`)
    this.storage.remove(`${this.pid}myAreaID`)
    this.myAreaList = [];
    this.myAreaID = [];
  }
   
  })
this.firstloadedArea = true;
}

myAreaSeelcted(){
  this.storage.set(`${this.pid}myAreaList`, this.myAreaList)
  this.storage.set(`${this.pid}myAreaID`, this.myAreaID)
this.myAreaID.forEach(element => {
  var areaarray = element.split("/");
  let area = this.myAreaList.find(x => x.id == areaarray[2])
  // this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${area.buildingid}/floors/${area.floorid}/cat/${area.catid}/subcat/${area.subcatid}/subsubcat/${area.subsubcatid}/areas/${area.id}/boqitems`).snapshotChanges().subscribe(value =>{
  //   this.myItemCatList = [];
  //   console.log(value.length)
  //   value.forEach(doc =>{
  //       this.afs.doc(`boq/boq/boqitemscat/${doc.payload.doc.data().itemdetails.CatID}`).get().subscribe(boq =>{
  //          this.pushToArrayItemCat(this.myItemCatList ,{name : boq.data().name , id : boq.id}) 
  //       })
  //     })
  // })
});
}
getMyItemsubcat(){
  this.storage.set(`${this.pid}myItemCatList`, this.myItemCatList).then(()=>{
  this.storage.set(`${this.pid}myItemCatID`, this.myItemCatID)
  })
  // this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas/${this.myAreaID}/boqitems`).snapshotChanges().subscribe(value =>{
  //   this.myItemSubcatList = [];
  //   console.log(value.length)
  //   value.forEach(doc =>{
  //       this.afs.doc(`boq/boq/boqitemscat/${this.myItemCatID}/subcat/${doc.payload.doc.data().itemdetails.SubcatID}`).get().subscribe(boq =>{
  //          this.pushToArrayItemCat(this.myItemSubcatList ,{name : boq.data().name , id : boq.id}) 
  //       })
  //     })
  // })

}


getMyItemsubsubcat(){
  this.storage.set(`${this.pid}myItemSubcatList`, this.myItemSubcatList).then(()=>{
    this.storage.set(`${this.pid}myItemSubcatID`, this.myItemSubcatID)
    })
    // this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas/${this.myAreaID}/boqitems`).snapshotChanges().subscribe(value =>{
    //   this.myItemSubsubcatList = [];
    //   console.log(value.length)
    //   value.forEach(doc =>{
    //       this.afs.doc(`boq/boq/boqitemscat/${this.myItemCatID}/subcat/${this.myItemSubcatID}/subsubcat/${doc.payload.doc.data().itemdetails.SubsubcatID}`).get().subscribe(boq =>{
    //          this.pushToArrayItemCat(this.myItemSubsubcatList ,{name : boq.data().name , id : boq.id}) 
    //       })
    //     })
    // })

}

getMyItems(){
  this.storage.set(`${this.pid}myItemSubsubcatList`, this.myItemSubsubcatList).then(()=>{
    this.storage.set(`${this.pid}myItemSubsubcatID`, this.myItemSubsubcatID)
    })
    // this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${this.mySubsubcatID}/areas/${this.myAreaID}/boqitems`, ref => ref.where("itemdetails.SubsubcatID" , "==", this.myItemSubsubcatID)).snapshotChanges().subscribe(value =>{
    //   this.myItems = [];
    //   value.forEach(doc =>{
    //     this.myItems.push({
    //       id : doc.payload.doc.id,
    //       itemdetails : doc.payload.doc.data().itemdetails,
    //     ceiling : doc.payload.doc.data().ceiling,
    //     floor : doc.payload.doc.data().floor,
    //     walls : doc.payload.doc.data().walls,
    //     cornice : doc.payload.doc.data().cornice,
    //     skirting : doc.payload.doc.data().skirting,
    //     shuttering : doc.payload.doc.data().shuttering,
    //     block : doc.payload.doc.data().block,
    //     blockdpc : doc.payload.doc.data().blockdpc,
    //     concrete : doc.payload.doc.data().concrete,
    //     polythene : doc.payload.doc.data().polythene,
    //     bitumin : doc.payload.doc.data().bitumin,
    //     itemsteel : doc.payload.doc.data().itemsteel,
    //     blockbitumin : doc.payload.doc.data().blockbitumin,
    //     iqty : doc.payload.doc.data().iqty,
    //     itempercentage : doc.payload.doc.data().itempercentage,
    //     completion : doc.payload.doc.data().completion,
    //     itemprecast : doc.payload.doc.data().itemprecast,
    //     existing : doc.payload.doc.data().existing,
    //     existing1 : doc.payload.doc.data().existing1,
    //     existing2 : doc.payload.doc.data().existing2,
    //     tsp : doc.payload.doc.data().tsp,
    //     bpp : doc.payload.doc.data().bpp,
    //     spp1 : doc.payload.doc.data().spp1,
    //     spp2 : doc.payload.doc.data().spp2,
    //     spp3 : doc.payload.doc.data().spp3,
    //     spp4 : doc.payload.doc.data().spp4,
    //     tpp : doc.payload.doc.data().tpp,
    //     bbp : doc.payload.doc.data().bbp,
    //     sbp1 : doc.payload.doc.data().sbp1,
    //     sbp2 : doc.payload.doc.data().sbp2,
    //     sbp3 : doc.payload.doc.data().sbp3,
    //     sbp4 : doc.payload.doc.data().sbp4,
    //     tep : doc.payload.doc.data().tep,
    //     tbp : doc.payload.doc.data().tbp,
    //     bep : doc.payload.doc.data().bep,
    //     sep1 : doc.payload.doc.data().sep1,
    //     sep2 : doc.payload.doc.data().sep2,
    //     sep3 : doc.payload.doc.data().sep3,
    //     sep4 : doc.payload.doc.data().sep4,
    //     bsp : doc.payload.doc.data().bsp,
    //     ssp1 : doc.payload.doc.data().ssp1,
    //     ssp2 : doc.payload.doc.data().ssp2,
    //     ssp3 : doc.payload.doc.data().ssp3,
    //     ssp4 : doc.payload.doc.data().ssp4,
          
    //     })
    //   })

    // })

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
    country : this.country,
    currency : this.currency,
    code : this.code
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
    this.afs.collection(`boq/boq/floors`, ref => ref.where("no",">=", this.dualValue2.lower).where("no","<=", this.dualValue2.upper)).get().subscribe(va =>{
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

 async delfloors(){
  const loading = await this.loadingController.create({
    message: 'Updating...',
    duration: 20000
  });
  await loading.present();
  this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/`, ref => ref.orderBy("no", "asc")).get().subscribe(myfloor =>{
    myfloor.docs.forEach(ele =>{
     if(this.myfloorsLH.lower > ele.data().no){
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${ele.ref.id}`).delete()
     }
     if(this.myfloorsLH.upper < ele.data().no){
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${ele.ref.id}`).delete()
     }
    })
    setTimeout(()=>{
      this.updateFloor()
    },5000)
  })
 }

 async updateFloor(){
  this.afs.collection(`boq/boq/floors`, ref => ref.where("no",">=", this.myfloorsLH.lower).where("no","<=", this.myfloorsLH.upper)).get().subscribe(va =>{
    va.docs.forEach(doo =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${doo.ref.id}`).get().subscribe(check =>{
        if(!check.exists){
          this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${doo.ref.id}`).set({
            name : doo.data().name,
            no : doo.data().no
          })
        }
      })
    })
  })
  this.loadingController.dismiss();
  alert("Updated Successfully!")
   

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
    }
}).then(()=>{

this.storage.get(`${this.pid}myFloorList`).then(value =>{
 if(value !== null){
     this.myFloorList = value
 }
}).then(()=>{
this.storage.get(`${this.pid}myCatList`).then(value =>{
if(value !== null){
 this.myCatList = value
}
}).then(()=>{

this.storage.get(`${this.pid}mySubcatList`).then(value =>{
if(value !== null){
 this.mySubcatList = value
}
}).then(()=>{
this.storage.get(`${this.pid}mySubsubcatList`).then(value =>{
if(value !== null){
 this.mySubsubcatList = value

}
}).then(()=>{
this.storage.get(`${this.pid}myAreaList`).then(value =>{
if(value !== null){
 this.myAreaList = value
}
}).then(()=>{
  this.storage.get(`${this.pid}myBuildingID`).then(myB =>{
    if(myB !== null){
      this.myBuildingID = myB
    }
    }).then(()=>{
      this.storage.get(`${this.pid}myFloorID`).then(myF =>{
        if(myF !== null){
          this.myFloorID = myF
          
        }
        }).then(()=>{
          this.storage.get(`${this.pid}myCatID`).then(myC =>{
            if(myC !== null){
              this.myCatID = myC
         
            }
            }).then(()=> {
              this.storage.get(`${this.pid}mySubcatID`).then(mySub =>{
                if(mySub !== null){
                  this.mySubcatID = mySub
                 
                }
                }).then(()=>{
                  this.storage.get(`${this.pid}mySubsubcatID`).then(mySubsub =>{
                    if(mySubsub !== null){
                      this.mySubsubcatID = mySubsub
                  
                    }
                    }).then(()=>{
                      this.storage.get(`${this.pid}myAreaID`).then(myarea =>{
                        if(myarea !== null){
                         this.myAreaID = myarea
                  
                        }
                      })
                    })
                    }).then(()=>{
                      if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                        this.getAllAreasofBuildings()
                        this.getAllItemsofBuilding()
                        this.getAllVariationsofBuilding()
                        this.getAllOpeningsofBuilding()
                        this.getAllprojectionsofBuilding()
                      }
                      else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                        this.getAllAreasofFloors()
                        this.getAllItemsofFloor()
                        this.getAllVariationsofFloor()
                        this.getAllOpensofFloor()
                        this.getAllprojectionsofFloor()
                      }
                      else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                        this.getAllAreasofCat()
                        this.getAllItemsofCat()
                        this.getAllVariationsofCat()
                        this.getAllOpeningofCat()
                        this.getAllprojectionofCat()
                      }
                      else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
                        this.getAllItemsofSubcat()
                        this.getAllVariationsofSubcat()
                        this.getAllOpeningofSubcat()
                        this.getAllprojectionofSubcat()
                      }
                      else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
                        this.getAllItemsofSubsubcat()
                        this.getAllVariationsofSubsubcat()
                        this.getAllOpeningofSubsubcat()
                        this.getAllprojectionofSubsubcat()
                      }
                      else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                        this.getAllItems()
                        this.getAllVariations()
                        this.getAllOpenings()
                        this.getAllprojections()
                      }
                    }).then(()=>{
                      setTimeout(()=>{ 
                        this.storage.get(`boqitemcat`).then(value=>{
                          if(value !== null){
                            this.boqitemcatID = value
                          }
                        })
                      
                      }, 1000);
                    }).then(()=>{
                      setTimeout(()=>{ 
                        this.storage.get(`boqitemsubcat`).then(value=>{
                          if(value !== null){
                            this.boqitemsubcatID = value
                            
                          }
                        }).then(()=>{
                          setTimeout(()=>{ 
                            this.storage.get(`boqitemsubsubcat`).then(value=>{
                              if(value !== null){
                                this.boqitemsubsubcatID = value
                                
                              }
                            })
                          }, 2000);
                        })
                      }, 2000);
                    })
                })
            })
        })
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
            this.getGlobleareas()
          }
        })
      }
    })
  })
  
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
  console.log("getGlobleareas() running")
  this.storage.set(`${this.pid}GloblesubsubcatList`, this.GloblesubsubcatList).then(()=>{
    this.storage.set(`${this.pid}GloblesubsubcatID`, this.GloblesubsubcatID)
  })

  this.storage.remove(`${this.pid}GlobleareaList`)
  this.storage.remove(`${this.pid}GlobleareaID`)
  this.GlobleareaList = [];
  this.GlobleareaID = "";

  this.afs.collection<any>(`boq/boq/Areas/${this.GloblecatID}/cat/${this.GloblesubcatID}/subcat/${this.GloblesubsubcatID}/items`).snapshotChanges().subscribe(value =>{
    value.forEach(doc=>{
      var img  = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
      if( doc.payload.doc.data().image){
        this.pushToArray(this.GlobleareaList,
          {
            name : doc.payload.doc.data().name ,
             id : doc.payload.doc.id,
             image : doc.payload.doc.data().image,
             attributes : doc.payload.doc.data().attributes
           
           })
      }else{
        this.pushToArray(this.GlobleareaList,
          {
            name : doc.payload.doc.data().name ,
             id : doc.payload.doc.id,
             image : img,
             attributes : doc.payload.doc.data().attributes
           
           })
      }
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
        this.Globlearea.forEach(element => {
          this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.GloblecatID}/subcat/${this.GloblesubcatID}/subsubcat/${this.GloblesubsubcatID}/areas/${element.id}`).get().subscribe(ch =>{
            if(!ch.exists){
              this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.GloblecatID}/subcat/${this.GloblesubcatID}/subsubcat/${this.GloblesubsubcatID}/areas/${element.id}`).set({
                catname : this.CattoAdd.name,
                catid :  this.CattoAdd.id,
                subcatname : this.SubcattoAdd.name,
                subcatid : this.SubcattoAdd.id,
                subsubcatname : this.SubsubcattoAdd.name,
                subsubcatid : this.SubsubcattoAdd.id,
                name : element.name,
                image : element.image,
                floorname : this.FloortoAdd.name,
                floorID : this.myFloorID,
                BuildingID : this.myBuildingID,
                code : this.areacode,
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
                Y6 : this.Y6,
                Y8 : this.Y8,
                Y10 : this.Y10,
                Y12 : this.Y12,
                Y14 : this.Y14,
                Y16 : this.Y16,
                Y18 : this.Y18,
                Y20 : this.Y20,
                Y22 : this.Y22,
                Y25 : this.Y25,
                Y28 : this.Y28,
                Y32 : this.Y32,
                Y40 : this.Y40,
                extraworkqqty : this.extraworkqqty,
                extraexpansionjointqty : this.extraexpansionjointqty,
                extrablkqty : this.extrablkqty,
                extrablindqty : this.extrablindqty,
                expectnoboqitem : this.expectnoboqitem,
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
                EXTRAEXP : this.EXTRAEXP,
                EXTRACONCBO : this.EXTRACONCBO,
                EXTRACONCB : this.EXTRACONCB,
  
  
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
                alert("Added Successfully!")
              })
            } else{
              alert("Can't add because this area already exist")
            }
          })
        });
      }).then(()=>{
        loading.dismiss().then(()=>{
           this.refresharea();

         })
      })
    })
  })
}

SelectallAreas(){
  this.Globlearea = this.GlobleareaList;
}
RemoveallAreas(){
  this.Globlearea = [];
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

 this.afs.collection<any>(`boq/boq/boqitemssubcat`, ref =>ref.where("catID", "==", this.boqitemcatID)).snapshotChanges().subscribe(value =>{
  this.boqitemsubcatList = []
    value.forEach(doc =>{
     this.boqitemsubcatList.push({
       name : doc.payload.doc.data().name,
       catID : doc.payload.doc.data().catID,
        id : doc.payload.doc.id})
    })
 })
}

getGboqitemsubsubcat(){
  this.storage.set(`boqitemsubcat`, this.boqitemsubcatID)


 this.afs.collection<any>(`boq/boq/boqitemssubsubcat/`, ref =>ref.where("subcatID", "==", this.boqitemsubcatID)).snapshotChanges().subscribe(value =>{
  this.boqitemsubsubcatList = []
    value.forEach(doc =>{
     this.boqitemsubsubcatList.push({
       name : doc.payload.doc.data().name,
       catID : doc.payload.doc.data().catID,
       subcatID : doc.payload.doc.data().subcatID,
      id : doc.payload.doc.id})
    })
  
 })

}

getGboqitems(){
  this.storage.set(`boqitemsubsubcat`, this.boqitemsubsubcatID)

 this.afs.collection<any>(`boq/boq/boqitems`, ref =>ref.where("SubsubcatID", "==", this.boqitemsubsubcatID)).snapshotChanges().subscribe(value =>{
  this.boqitemList = []
  value.forEach(doc =>{
    this.boqitemList.push({
      name : doc.payload.doc.data().name,
     id : doc.payload.doc.id,
     CatID :doc.payload.doc.data().CatID,
     SubcatID :doc.payload.doc.data().SubcatID,
     SubsubcatID :doc.payload.doc.data().SubsubcatID,
     materials :doc.payload.doc.data().materials,
     labours : doc.payload.doc.data().labours,
     equipment : doc.payload.doc.data().equipment,
     other : doc.payload.doc.data().other,
     subcontractor : doc.payload.doc.data().subcontractor,
     price :doc.payload.doc.data().price,
     unit :doc.payload.doc.data().unit,
     code :doc.payload.doc.data().code,
     image : doc.payload.doc.data().image,
     libunit : doc.payload.doc.data().libunit,
     libprice : doc.payload.doc.data().libprice,
     libmaterialtotal: doc.payload.doc.data().libmaterialtotal,
     liblabourtotal : doc.payload.doc.data().liblabourtotal,
     libequipmenttotal : doc.payload.doc.data().libequipmenttotal,
     libsubcontractortotal : doc.payload.doc.data().libsubcontractortotal,
     libothertotal : doc.payload.doc.data().libothertotal,
    })
   })
 })

}

async addItem(){
  if(this.myAreaID){
      const loading = await this.loadingController.create({
        message: 'Adding...',
        duration: 20000
      });
      await loading.present();

      this.myAreaID.forEach(element => {
        var areaarray = element.split("/");
        let area = this.myAreaList.find(x => x.id == areaarray[2])
        this.boqitem.forEach(itemEle =>{
          this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`, ref => ref.where("areaID", "==", area.id).where("itemID", "==", itemEle.id).where("floorID", "==", area.floorID )).get().subscribe(va =>{
            if(va.docs.length >0){
              loading.dismiss()
              alert("Item already exist in "+ area.name)
            }else{
              this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`).add({
                buildID :  area.BuildingID,
                floorID: area.floorID,
                areacatID : area.catid,
                areasubcatID : area.subcatid,
                areasubsubcatID : area.subsubcatid,
                itemID : itemEle.id,
                areaID : area.id,
             item : {
              itemdetails : itemEle,
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
             FILL_Percentage : this.FILL_Percentage,
             E_Percentage : this.E_Percentage,
             I_DIS : this.I_DIS,
             I_FACTOR : this.I_FACTOR,
             Exp_Percentage : this.Exp_Percentage,
             createdon : new Date(),
             Concb_Percentage : this.Concb_Percentage,
            
  
              ich1A : this.ich1A,
              ich1B : this.ich1B,
              ich1C : this.ich1C,
              ich1D : this.ich1D,
              ich1E : this.ich1E,
              ich1F : this.ich1F,
              ich1G : this.ich1G,
              ich1H : this.ich1H,
              ich1I : this.ich1I,
              ich1J : this.ich1J,
              ich1K : this.ich1K,
              ich1L : this.ich1L,
              ich1M : this.ich1M,
              ich1N : this.ich1N,
              ich1O : this.ich1O,
              ich1P : this.ich1P,
              ich1Q : this.ich1Q,
              ich1R : this.ich1R,
              ich1S : this.ich1S,
              ich1T : this.ich1T,
              ich1U : this.ich1U,
              ich1V : this.ich1V,
              ich1W : this.ich1W,
              ich1X : this.ich1X,
              ich1Y : this.ich1Y,
              ich1Z : this.ich1Z,
              ich1AA : this.ich1AA,
              ich1AB : this.ich1AB,
              ich1AC : this.ich1AC,
              ich1AD : this.ich1AD,
              ich1AE : this.ich1AE,
              ich1AF : this.ich1AF,
              ich1AG : this.ich1AG,
              ich1AH : this.ich1AH,
              ich1AI : this.ich1AI,
              ich1AJ : this.ich1AJ,
              ich1AK : this.ich1AK,
              ich1AL : this.ich1AL,
              ich1AM : this.ich1AM,
              ich1AN : this.ich1AN,
              ich1AO : this.ich1AO,
  
              ich2A : this.ich2A,
              ich2B : this.ich2B,
              ich2C : this.ich2C,
              ich2D : this.ich2D,
              ich2E : this.ich2E,
              ich2F : this.ich2F,
              ich2G : this.ich2G,
              ich2H : this.ich2H,
              ich2I : this.ich2I,
              ich2J : this.ich2J,
              ich2K : this.ich2K,
              ich2L : this.ich2L,
              ich2M : this.ich2M,
              ich2N : this.ich2N,
              ich2O : this.ich2O,
              ich2P : this.ich2P,
              ich2Q : this.ich2Q,
              ich2R : this.ich2R,
              ich2S : this.ich2S,
              ich2T : this.ich2T,
              ich2U : this.ich2U,
              ich2V : this.ich2V,
              ich2W : this.ich2W,
              ich2X : this.ich2X,
              ich2Y : this.ich2Y,
              ich2Z : this.ich2Z,
              ich2AA : this.ich2AA,
              ich2AB : this.ich2AB,
              ich2AC : this.ich2AC,
              ich2AD : this.ich2AD,
              ich2AE : this.ich2AE,
              ich2AF : this.ich2AF,
              ich2AG : this.ich2AG,
              ich2AH : this.ich2AH,
              ich2AI : this.ich2AI,
              ich2AJ : this.ich2AJ,
              ich2AK : this.ich2AK,
              ich2AL : this.ich2AL,
              ich2AM : this.ich2AM,
              ich2AN : this.ich2AN,
              ich2AO : this.ich2AO,
  
              ich3A : this.ich3A,
              ich3B : this.ich3B,
              ich3C : this.ich3C,
              ich3D : this.ich3D,
              ich3E : this.ich3E,
              ich3F : this.ich3F,
              ich3G : this.ich3G,
              ich3H : this.ich3H,
              ich3I : this.ich3I,
              ich3J : this.ich3J,
              ich3K : this.ich3K,
              ich3L : this.ich3L,
              ich3M : this.ich3M,
              ich3N : this.ich3N,
              ich3O : this.ich3O,
              ich3P : this.ich3P,
              ich3Q : this.ich3Q,
              ich3R : this.ich3R,
              ich3S : this.ich3S,
              ich3T : this.ich3T,
              ich3U : this.ich3U,
              ich3V : this.ich3V,
              ich3W : this.ich3W,
              ich3X : this.ich3X,
              ich3Y : this.ich3Y,
              ich3Z : this.ich3Z,
              ich3AA : this.ich3AA,
              ich3AB : this.ich3AB,
              ich3AC : this.ich3AC,
              ich3AD : this.ich3AD,
              ich3AE : this.ich3AE,
              ich3AF : this.ich3AF,
              ich3AG : this.ich3AG,
              ich3AH : this.ich3AH,
              ich3AI : this.ich3AI,
              ich3AJ : this.ich3AJ,
              ich3AK : this.ich3AK,
              ich3AL : this.ich3AL,
              ich3AM : this.ich3AM,
              ich3AN : this.ich3AN,
              ich3AO : this.ich3AO,
            
            }
             }).then(()=>{
              this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}`).get().subscribe(act =>{
                if(act.exists){
                  if(itemEle.materials.length > 0){
                    itemEle.materials.forEach(element => {
                      this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/materials/${element.id}`).get().subscribe(actmat =>{
                        if(!actmat.exists){
                          this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/materials/${element.id}`).set({
                            aqty : 0,
                            atotal : 0,
                          })
                        }
                      })
                    });
                  }

                  if(itemEle.equipment.length > 0){
                    itemEle.equipment.forEach(element => {
                      this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/equipment/${element.id}`).get().subscribe(actmat =>{
                        if(!actmat.exists){
                          this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/equipment/${element.id}`).set({
                            aqty : 0,
                            atotal : 0,
                          })
                        }
                      })
                    });
                  }

                  if(itemEle.labours.length > 0){
                    itemEle.labours.forEach(element => {
                      this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/labours/${element.id}`).get().subscribe(actmat =>{
                        if(!actmat.exists){
                          this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/labours/${element.id}`).set({
                            aqty : 0,
                            atotal : 0,
                          })
                        }
                      })
                    });
                  }

                  if(itemEle.other.length > 0){
                    itemEle.other.forEach(element => {
                      this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/other/${element.id}`).get().subscribe(actmat =>{
                        if(!actmat.exists){
                          this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/other/${element.id}`).set({
                            aqty : 0,
                            atotal : 0,
                          })
                        }
                      })
                    });
                  }

                  if(itemEle.subcontractor.length > 0){
                    itemEle.subcontractor.forEach(element => {
                      this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/subcontractor/${element.id}`).get().subscribe(actmat =>{
                        if(!actmat.exists){
                          this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/subcontractor/${element.id}`).set({
                            aqty : 0,
                            atotal : 0,
                          })
                        }
                      })
                    });
                  }
                }

                else{
                  this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}`).set({
                    name:itemEle.name,
                    id: itemEle.id,
                    extramaterial : [],
                    extralabour : [],
                    extraequipment: [],
                    extraother : [],
                    extrasubcontractor : [],

                  }).then(()=>{
                    if(itemEle.materials.length > 0){
                      itemEle.materials.forEach(element => {
                        this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/materials/${element.id}`).set({
                          aqty : 0,
                          atotal : 0,
                        })
                      });
                    }
  
                    if(itemEle.equipment.length > 0){
                      itemEle.equipment.forEach(element => {
                        this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/equipment/${element.id}`).set({
                          aqty : 0,
                          atotal : 0,
                        })
                      });
                    }
  
                    if(itemEle.labours.length > 0){
                      itemEle.labours.forEach(element => {
                        this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/labours/${element.id}`).set({
                          aqty : 0,
                          atotal : 0,
                        })
                      });
                    }
  
                    if(itemEle.other.length > 0){
                      itemEle.other.forEach(element => {
                        this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/other/${element.id}`).set({
                          aqty : 0,
                          atotal : 0,
                        })
                      });
                    }
  
                    if(itemEle.subcontractor.length > 0){
                      itemEle.subcontractor.forEach(element => {
                        this.afs.doc(`boq/boq/projects/${this.pid}/actboqitems/${itemEle.id}/subcontractor/${element.id}`).set({
                          aqty : 0,
                          atotal : 0,
                        })
                      });
                    }
                  })
                }
              })
             }).then(()=>{
              var cat = this.boqitemcatList.find(x => x.id == itemEle.CatID)
              this.afs.doc(`boq/boq/projects/${this.pid}/boqitemsCat/${itemEle.CatID}`).set({
                name : cat.name,
                createdon : new Date()
              }).then(()=>{
                var subcat = this.boqitemsubcatList.find(x => x.id == itemEle.SubcatID)
                this.afs.doc(`boq/boq/projects/${this.pid}/boqitemsSubcat/${itemEle.SubcatID}`).set({
                  catID : itemEle.CatID,
                  name : subcat.name,
                  createdon : new Date()
                }).then(()=>{
                  var subsubcat = this.boqitemsubsubcatList.find(x => x.id == itemEle.SubsubcatID)
                  this.afs.doc(`boq/boq/projects/${this.pid}/boqitemsSubsubcat/${itemEle.SubsubcatID}`).set({
                    catID : itemEle.CatID,
                    subcatID : itemEle.SubcatID,
                    name : subsubcat.name,
                    createdon : new Date()
                  })
                }).then(()=>{
                  if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                    this.getAllItemsofBuilding()
                  }
                  else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                    this.getAllItemsofFloor()
                  }
                  else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                    this.getAllItemsofCat()
                  }
                  else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
                    this.getAllItemsofSubcat()
                  }
                  else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
                    this.getAllItemsofSubsubcat()
                  }else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
                    this.getAllItems()
                  }
                })
              })
             }).then(()=>{
               loading.dismiss().then(()=>{
                alert("Added Successfully!")
               })
             })
            }
          })
        })

      })
  }else{
    alert("Please recheck, any selection or field is missing.")
  }
}

//VARIATION  ADD FUNTION 
async addVariation(){
  if(this.myAreaID ){
    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 20000
    });
    await loading.present();

    this.myAreaID.forEach(element => {
      var areaarray = element.split("/");
      let area = this.myAreaList.find(x => x.id == areaarray[2])
      this.boqitem.forEach(itemEle =>{
        this.afs.collection(`boq/boq/projects/${this.pid}/variations/`, ref => ref.where("areaID", "==", area.id).where("variationID", "==", itemEle.id)).get().subscribe(va =>{
          if(va.docs.length >0){
            loading.dismiss()
            alert("Item already exist in "+ area.name)
          }else{
            this.afs.collection(`boq/boq/projects/${this.pid}/variations/`).add({
              buildID :  area.BuildingID,
              floorID: area.floorID,
              areacatID : area.catid,
              areasubcatID : area.subcatid,
              areasubsubcatID : area.subsubcatid,
              variationID : itemEle.id,
              areaID : area.id,
          variation : {
            variationdetails : itemEle,
            ceiling : this.varceiling,
            floor : this.varfloor,
            walls : this.varwalls,
            cornice : this.varcornice,
            skirting : this.varskirting,
            shuttering : this.varshuttering,
            block : this.varblock,
            blockdpc : this.varblockdpc,
            concrete : this.varconcrete,
            polythene : this.varpolythene,
            bitumin : this.varbitumin,
            itemsteel : this.varitemsteel,
            blockbitumin : this.varblockbitumin,
            iqty : this.variqty,
            itempercentage : this.varitempercentage,
            completion : this.varcompletion,
            itemprecast : this.varitemprecast,
            existing : this.varexisting,
            existing1 : this.varexisting1,
            existing2 : this.varexisting2,
            tsp : this.vartsp,
            bpp : this.varbpp,
            spp1 : this.varspp1,
            spp2 : this.varspp2,
            spp3 : this.varspp3,
            spp4 : this.varspp4,
            tpp : this.vartpp,
            bbp : this.varbbp,
            sbp1 : this.varsbp1,
            sbp2 : this.varsbp2,
            sbp3 : this.varsbp3,
            sbp4 : this.varsbp4,
            tep : this.vartep,
            tbp : this.vartbp,
            bep : this.varbep,
            sep1 : this.varsep1,
            sep2 : this.varsep2,
            sep3 : this.varsep3,
            sep4 : this.varsep4,
            bsp : this.varbsp,
            ssp1 : this.varssp1,
            ssp2 : this.varssp2,
            ssp3 : this.varssp3,
            ssp4 : this.varssp4,
           FILL_Percentage : this.varFILL_Percentage,
           E_Percentage : this.varE_Percentage,
           I_DIS : this.varI_DIS,
           I_FACTOR : this.varI_FACTOR,
           Exp_Percentage : this.varExp_Percentage,
           createdon : new Date(),
           Concb_Percentage : this.varConcb_Percentage,
          
  
            ich1A : this.varich1A,
            ich1B : this.varich1B,
            ich1C : this.varich1C,
            ich1D : this.varich1D,
            ich1E : this.varich1E,
            ich1F : this.varich1F,
            ich1G : this.varich1G,
            ich1H : this.varich1H,
            ich1I : this.varich1I,
            ich1J : this.varich1J,
            ich1K : this.varich1K,
            ich1L : this.varich1L,
            ich1M : this.varich1M,
            ich1N : this.varich1N,
            ich1O : this.varich1O,
            ich1P : this.varich1P,
            ich1Q : this.varich1Q,
            ich1R : this.varich1R,
            ich1S : this.varich1S,
            ich1T : this.varich1T,
            ich1U : this.varich1U,
            ich1V : this.varich1V,
            ich1W : this.varich1W,
            ich1X : this.varich1X,
            ich1Y : this.varich1Y,
            ich1Z : this.varich1Z,
            ich1AA : this.varich1AA,
            ich1AB : this.varich1AB,
            ich1AC : this.varich1AC,
            ich1AD : this.varich1AD,
            ich1AE : this.varich1AE,
            ich1AF : this.varich1AF,
            ich1AG : this.varich1AG,
            ich1AH : this.varich1AH,
            ich1AI : this.varich1AI,
            ich1AJ : this.varich1AJ,
            ich1AK : this.varich1AK,
            ich1AL : this.varich1AL,
            ich1AM : this.varich1AM,
            ich1AN : this.varich1AN,
            ich1AO : this.varich1AO,
  
            ich2A : this.varich2A,
            ich2B : this.varich2B,
            ich2C : this.varich2C,
            ich2D : this.varich2D,
            ich2E : this.varich2E,
            ich2F : this.varich2F,
            ich2G : this.varich2G,
            ich2H : this.varich2H,
            ich2I : this.varich2I,
            ich2J : this.varich2J,
            ich2K : this.varich2K,
            ich2L : this.varich2L,
            ich2M : this.varich2M,
            ich2N : this.varich2N,
            ich2O : this.varich2O,
            ich2P : this.varich2P,
            ich2Q : this.varich2Q,
            ich2R : this.varich2R,
            ich2S : this.varich2S,
            ich2T : this.varich2T,
            ich2U : this.varich2U,
            ich2V : this.varich2V,
            ich2W : this.varich2W,
            ich2X : this.varich2X,
            ich2Y : this.varich2Y,
            ich2Z : this.varich2Z,
            ich2AA : this.varich2AA,
            ich2AB : this.varich2AB,
            ich2AC : this.varich2AC,
            ich2AD : this.varich2AD,
            ich2AE : this.varich2AE,
            ich2AF : this.varich2AF,
            ich2AG : this.varich2AG,
            ich2AH : this.varich2AH,
            ich2AI : this.varich2AI,
            ich2AJ : this.varich2AJ,
            ich2AK : this.varich2AK,
            ich2AL : this.varich2AL,
            ich2AM : this.varich2AM,
            ich2AN : this.varich2AN,
            ich2AO : this.varich2AO,
  
            ich3A : this.varich3A,
            ich3B : this.varich3B,
            ich3C : this.varich3C,
            ich3D : this.varich3D,
            ich3E : this.varich3E,
            ich3F : this.varich3F,
            ich3G : this.varich3G,
            ich3H : this.varich3H,
            ich3I : this.varich3I,
            ich3J : this.varich3J,
            ich3K : this.varich3K,
            ich3L : this.varich3L,
            ich3M : this.varich3M,
            ich3N : this.varich3N,
            ich3O : this.varich3O,
            ich3P : this.varich3P,
            ich3Q : this.varich3Q,
            ich3R : this.varich3R,
            ich3S : this.varich3S,
            ich3T : this.varich3T,
            ich3U : this.varich3U,
            ich3V : this.varich3V,
            ich3W : this.varich3W,
            ich3X : this.varich3X,
            ich3Y : this.varich3Y,
            ich3Z : this.varich3Z,
            ich3AA : this.varich3AA,
            ich3AB : this.varich3AB,
            ich3AC : this.varich3AC,
            ich3AD : this.varich3AD,
            ich3AE : this.varich3AE,
            ich3AF : this.varich3AF,
            ich3AG : this.varich3AG,
            ich3AH : this.varich3AH,
            ich3AI : this.varich3AI,
            ich3AJ : this.varich3AJ,
            ich3AK : this.varich3AK,
            ich3AL : this.varich3AL,
            ich3AM : this.varich3AM,
            ich3AN : this.varich3AN,
            ich3AO : this.varich3AO,
          
          }
           }).then(()=>{
             this.refreshVariation()
           }).then(()=>{
            var cat = this.boqitemcatList.find(x => x.id == itemEle.CatID)
            this.afs.doc(`boq/boq/projects/${this.pid}/variationsCat/${itemEle.CatID}`).set({
              name : cat.name,
              createdon : new Date()
            }).then(()=>{
              var subcat = this.boqitemsubcatList.find(x => x.id == itemEle.SubcatID)
              this.afs.doc(`boq/boq/projects/${this.pid}/variationsSubcat/${itemEle.SubcatID}`).set({
                catID : itemEle.CatID,
                name : subcat.name,
                createdon : new Date()
              }).then(()=>{
                var subsubcat = this.boqitemsubsubcatList.find(x => x.id == itemEle.SubsubcatID)
                this.afs.doc(`boq/boq/projects/${this.pid}/variationsSubsubcat/${itemEle.SubsubcatID}`).set({
                  catID : itemEle.CatID,
                  subcatID : itemEle.SubcatID,
                  name : subsubcat.name,
                  createdon : new Date()
                })
              })
            })
           }).then(()=>{
             loading.dismiss().then(()=>{
              alert("Added Successfully!")
             })
           })
          }
        })
      })

    })
}else{
  alert("Please recheck, any selection or field is missing.")
}

}

getAllItemsofBuilding(){
  this.myItemsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`, ref => ref.where("buildID", "==", this.myBuildingID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{

        var fill  = this.calculateFill(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().fill,areavalue.data().No_of_units,doc.data().item.FILL_Percentage);
        var excavation = this.calculateExcavation(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().exc,doc.data().item.E_Percentage);
          var floor =  this.calculateFloor(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().item.floor);
          var BlockDPC =  this.calculateBlockDPC(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,doc.data().item.blockdpc);
          var ceiling = this.calculateCeiling(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaC,doc.data().item.ceiling);
          var wall = this.calculateWall(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,doc.data().item.walls);
          var cornice = this.calculateCornice(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,doc.data().item.cornice);
          var skirting = this.calculateSkirting(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,0,areavalue.data().areaS,0,doc.data().item.skirting);
          var block =  this.calculateBlock(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaB,doc.data().item.block);
          var blockbitpaint = this.calculateBlockbitpaint(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,0,areavalue.data().bit,doc.data().item.blockbitumin);
           var concrete = this.calculateConcrete(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().conc,doc.data().item.concrete);
           var blinding = this.calculateBlinding(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,doc.data().item.Concb_Percentage);
          var formwork = this.calculateFormwork(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,doc.data().item.ssp4,doc.data().item.ssp2,areavalue.data().shutt,areavalue.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering);
          var bitpaint = this.calculateBitpaint(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().bit,areavalue.data().Unit_width,doc.data().item.tbp,doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,doc.data().item.bitumin);
          var expansionjoints =  this.calculateExpansionjoints(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,doc.data().item.sep4,doc.data().item.sep2,areavalue.data().EXTRAEXP,doc.data().item.sep1,doc.data().item.Exp_Percentage);
          var precast = this.calculatePrecast(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,doc.data().item.itemprecast,areavalue.data().precast);
          var polythene =  this.calculatePolythene(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,doc.data().item.spp1,areavalue.data().polyth,doc.data().item.spp2,doc.data().item.polythene);
          var steel = this.calculateSteel(areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,doc.data().item.itemsteel);      
          var individualqty = this.calculateIndividualqty(areavalue.data().No_of_units,doc.data().item.iqty,doc.data().item.I_FACTOR)
        this.myItemsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          itemID : doc.data().itemID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          item : doc.data().item,
          fill: fill,
          excavation : excavation,
          floor : floor,
          BlockDPC : BlockDPC,
          ceiling : ceiling,
          wall : wall,
          cornice : cornice,
          skirting : skirting,
          block : block,
          blockbitpaint : blockbitpaint,
          concrete : concrete,
          blinding : blinding,
          formwork : formwork,
          bitpaint : bitpaint,
          expansionjoints : expansionjoints,
          precast : precast,
          polythene : polythene,
          steel : steel,
          individualqty : individualqty,
          fqty : (fill+excavation+floor+BlockDPC+ceiling+wall+cornice+skirting+block+blockbitpaint+concrete+blinding+formwork+bitpaint+expansionjoints+precast+polythene+steel+individualqty)
       })
      })
    })
    })
}

getAllItemsofFloor(){
  this.myItemsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`, ref => ref.where("floorID", "==", this.myFloorID).where("buildID","==",this.myBuildingID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
       
        var fill  = this.calculateFill(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().fill,areavalue.data().No_of_units,doc.data().item.FILL_Percentage);
        var excavation = this.calculateExcavation(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().exc,doc.data().item.E_Percentage);
          var floor =  this.calculateFloor(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().item.floor);
          var BlockDPC =  this.calculateBlockDPC(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,doc.data().item.blockdpc);
          var ceiling = this.calculateCeiling(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaC,doc.data().item.ceiling);
          var wall = this.calculateWall(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,doc.data().item.walls);
          var cornice = this.calculateCornice(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,doc.data().item.cornice);
          var skirting = this.calculateSkirting(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,0,areavalue.data().areaS,0,doc.data().item.skirting);
          var block =  this.calculateBlock(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaB,doc.data().item.block);
          var blockbitpaint = this.calculateBlockbitpaint(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,0,areavalue.data().bit,doc.data().item.blockbitumin);
           var concrete = this.calculateConcrete(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().conc,doc.data().item.concrete);
           var blinding = this.calculateBlinding(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,doc.data().item.Concb_Percentage);
          var formwork = this.calculateFormwork(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,doc.data().item.ssp4,doc.data().item.ssp2,areavalue.data().shutt,areavalue.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering);
          var bitpaint = this.calculateBitpaint(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().bit,areavalue.data().Unit_width,doc.data().item.tbp,doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,doc.data().item.bitumin);
          var expansionjoints =  this.calculateExpansionjoints(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,doc.data().item.sep4,doc.data().item.sep2,areavalue.data().EXTRAEXP,doc.data().item.sep1,doc.data().item.Exp_Percentage);
          var precast = this.calculatePrecast(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,doc.data().item.itemprecast,areavalue.data().precast);
          var polythene =  this.calculatePolythene(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,doc.data().item.spp1,areavalue.data().polyth,doc.data().item.spp2,doc.data().item.polythene);
          var steel = this.calculateSteel(areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,doc.data().item.itemsteel);      
          var individualqty = this.calculateIndividualqty(areavalue.data().No_of_units,doc.data().item.iqty,doc.data().item.I_FACTOR)
        this.myItemsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          itemID : doc.data().itemID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          item : doc.data().item,
          fill: fill,
          excavation : excavation,
          floor : floor,
          BlockDPC : BlockDPC,
          ceiling : ceiling,
          wall : wall,
          cornice : cornice,
          skirting : skirting,
          block : block,
          blockbitpaint : blockbitpaint,
          concrete : concrete,
          blinding : blinding,
          formwork : formwork,
          bitpaint : bitpaint,
          expansionjoints : expansionjoints,
          precast : precast,
          polythene : polythene,
          steel : steel,
          individualqty : individualqty,
          fqty : (fill+excavation+floor+BlockDPC+ceiling+wall+cornice+skirting+block+blockbitpaint+concrete+blinding+formwork+bitpaint+expansionjoints+precast+polythene+steel+individualqty)
       })
      })
    })
    })
}

getAllItemsofCat(){
  this.myItemsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`, ref => ref.where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
       
        var fill  = this.calculateFill(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().fill,areavalue.data().No_of_units,doc.data().item.FILL_Percentage);
        var excavation = this.calculateExcavation(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().exc,doc.data().item.E_Percentage);
          var floor =  this.calculateFloor(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().item.floor);
          var BlockDPC =  this.calculateBlockDPC(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,doc.data().item.blockdpc);
          var ceiling = this.calculateCeiling(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaC,doc.data().item.ceiling);
          var wall = this.calculateWall(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,doc.data().item.walls);
          var cornice = this.calculateCornice(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,doc.data().item.cornice);
          var skirting = this.calculateSkirting(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,0,areavalue.data().areaS,0,doc.data().item.skirting);
          var block =  this.calculateBlock(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaB,doc.data().item.block);
          var blockbitpaint = this.calculateBlockbitpaint(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,0,areavalue.data().bit,doc.data().item.blockbitumin);
           var concrete = this.calculateConcrete(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().conc,doc.data().item.concrete);
           var blinding = this.calculateBlinding(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,doc.data().item.Concb_Percentage);
          var formwork = this.calculateFormwork(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,doc.data().item.ssp4,doc.data().item.ssp2,areavalue.data().shutt,areavalue.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering);
          var bitpaint = this.calculateBitpaint(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().bit,areavalue.data().Unit_width,doc.data().item.tbp,doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,doc.data().item.bitumin);
          var expansionjoints =  this.calculateExpansionjoints(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,doc.data().item.sep4,doc.data().item.sep2,areavalue.data().EXTRAEXP,doc.data().item.sep1,doc.data().item.Exp_Percentage);
          var precast = this.calculatePrecast(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,doc.data().item.itemprecast,areavalue.data().precast);
          var polythene =  this.calculatePolythene(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,doc.data().item.spp1,areavalue.data().polyth,doc.data().item.spp2,doc.data().item.polythene);
          var steel = this.calculateSteel(areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,doc.data().item.itemsteel);      
          var individualqty = this.calculateIndividualqty(areavalue.data().No_of_units,doc.data().item.iqty,doc.data().item.I_FACTOR)
        this.myItemsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          itemID : doc.data().itemID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          item : doc.data().item,
          fill: fill,
          excavation : excavation,
          floor : floor,
          BlockDPC : BlockDPC,
          ceiling : ceiling,
          wall : wall,
          cornice : cornice,
          skirting : skirting,
          block : block,
          blockbitpaint : blockbitpaint,
          concrete : concrete,
          blinding : blinding,
          formwork : formwork,
          bitpaint : bitpaint,
          expansionjoints : expansionjoints,
          precast : precast,
          polythene : polythene,
          steel : steel,
          individualqty : individualqty,
          fqty : (fill+excavation+floor+BlockDPC+ceiling+wall+cornice+skirting+block+blockbitpaint+concrete+blinding+formwork+bitpaint+expansionjoints+precast+polythene+steel+individualqty)
       })
      })
    })
    })
}

getAllItemsofSubcat(){
  this.myItemsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`, ref => ref.where("areasubcatID", "==", this.mySubcatID).where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        
        var fill  = this.calculateFill(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().fill,areavalue.data().No_of_units,doc.data().item.FILL_Percentage);
        var excavation = this.calculateExcavation(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().exc,doc.data().item.E_Percentage);
          var floor =  this.calculateFloor(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().item.floor);
          var BlockDPC =  this.calculateBlockDPC(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,doc.data().item.blockdpc);
          var ceiling = this.calculateCeiling(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaC,doc.data().item.ceiling);
          var wall = this.calculateWall(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,doc.data().item.walls);
          var cornice = this.calculateCornice(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,doc.data().item.cornice);
          var skirting = this.calculateSkirting(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,0,areavalue.data().areaS,0,doc.data().item.skirting);
          var block =  this.calculateBlock(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaB,doc.data().item.block);
          var blockbitpaint = this.calculateBlockbitpaint(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,0,areavalue.data().bit,doc.data().item.blockbitumin);
           var concrete = this.calculateConcrete(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().conc,doc.data().item.concrete);
           var blinding = this.calculateBlinding(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,doc.data().item.Concb_Percentage);
          var formwork = this.calculateFormwork(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,doc.data().item.ssp4,doc.data().item.ssp2,areavalue.data().shutt,areavalue.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering);
          var bitpaint = this.calculateBitpaint(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().bit,areavalue.data().Unit_width,doc.data().item.tbp,doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,doc.data().item.bitumin);
          var expansionjoints =  this.calculateExpansionjoints(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,doc.data().item.sep4,doc.data().item.sep2,areavalue.data().EXTRAEXP,doc.data().item.sep1,doc.data().item.Exp_Percentage);
          var precast = this.calculatePrecast(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,doc.data().item.itemprecast,areavalue.data().precast);
          var polythene =  this.calculatePolythene(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,doc.data().item.spp1,areavalue.data().polyth,doc.data().item.spp2,doc.data().item.polythene);
          var steel = this.calculateSteel(areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,doc.data().item.itemsteel);      
          var individualqty = this.calculateIndividualqty(areavalue.data().No_of_units,doc.data().item.iqty,doc.data().item.I_FACTOR)
        this.myItemsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          itemID : doc.data().itemID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          item : doc.data().item,
          fill: fill,
          excavation : excavation,
          floor : floor,
          BlockDPC : BlockDPC,
          ceiling : ceiling,
          wall : wall,
          cornice : cornice,
          skirting : skirting,
          block : block,
          blockbitpaint : blockbitpaint,
          concrete : concrete,
          blinding : blinding,
          formwork : formwork,
          bitpaint : bitpaint,
          expansionjoints : expansionjoints,
          precast : precast,
          polythene : polythene,
          steel : steel,
          individualqty : individualqty,
          fqty : (fill+excavation+floor+BlockDPC+ceiling+wall+cornice+skirting+block+blockbitpaint+concrete+blinding+formwork+bitpaint+expansionjoints+precast+polythene+steel+individualqty)
       })
      })
    })
    })
}

getAllItemsofSubsubcat(){
  this.myItemsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`, ref => ref.where("areasubsubcatID", "==", this.mySubsubcatID).where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
     
        var fill  = this.calculateFill(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().fill,areavalue.data().No_of_units,doc.data().item.FILL_Percentage);
        var excavation = this.calculateExcavation(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().exc,doc.data().item.E_Percentage);
          var floor =  this.calculateFloor(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().item.floor);
          var BlockDPC =  this.calculateBlockDPC(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,doc.data().item.blockdpc);
          var ceiling = this.calculateCeiling(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaC,doc.data().item.ceiling);
          var wall = this.calculateWall(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,doc.data().item.walls);
          var cornice = this.calculateCornice(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,doc.data().item.cornice);
          var skirting = this.calculateSkirting(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,0,areavalue.data().areaS,0,doc.data().item.skirting);
          var block =  this.calculateBlock(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaB,doc.data().item.block);
          var blockbitpaint = this.calculateBlockbitpaint(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,0,areavalue.data().bit,doc.data().item.blockbitumin);
           var concrete = this.calculateConcrete(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().conc,doc.data().item.concrete);
           var blinding = this.calculateBlinding(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,doc.data().item.Concb_Percentage);
          var formwork = this.calculateFormwork(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,doc.data().item.ssp4,doc.data().item.ssp2,areavalue.data().shutt,areavalue.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering);
          var bitpaint = this.calculateBitpaint(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().bit,areavalue.data().Unit_width,doc.data().item.tbp,doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,doc.data().item.bitumin);
          var expansionjoints =  this.calculateExpansionjoints(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,doc.data().item.sep4,doc.data().item.sep2,areavalue.data().EXTRAEXP,doc.data().item.sep1,doc.data().item.Exp_Percentage);
          var precast = this.calculatePrecast(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,doc.data().item.itemprecast,areavalue.data().precast);
          var polythene =  this.calculatePolythene(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,doc.data().item.spp1,areavalue.data().polyth,doc.data().item.spp2,doc.data().item.polythene);
          var steel = this.calculateSteel(areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,doc.data().item.itemsteel);      
          var individualqty = this.calculateIndividualqty(areavalue.data().No_of_units,doc.data().item.iqty,doc.data().item.I_FACTOR)
        this.myItemsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          itemID : doc.data().itemID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          item : doc.data().item,
          fill: fill,
          excavation : excavation,
          floor : floor,
          BlockDPC : BlockDPC,
          ceiling : ceiling,
          wall : wall,
          cornice : cornice,
          skirting : skirting,
          block : block,
          blockbitpaint : blockbitpaint,
          concrete : concrete,
          blinding : blinding,
          formwork : formwork,
          bitpaint : bitpaint,
          expansionjoints : expansionjoints,
          precast : precast,
          polythene : polythene,
          steel : steel,
          individualqty : individualqty,
          fqty : (fill+excavation+floor+BlockDPC+ceiling+wall+cornice+skirting+block+blockbitpaint+concrete+blinding+formwork+bitpaint+expansionjoints+precast+polythene+steel+individualqty)
       })
      })
    })
    })
}

getAllItems(){
  this.myItemsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
       
        var fill  = this.calculateFill(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().fill,areavalue.data().No_of_units,doc.data().item.FILL_Percentage);
        var excavation = this.calculateExcavation(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().exc,doc.data().item.E_Percentage);
          var floor =  this.calculateFloor(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().item.floor);
          var BlockDPC =  this.calculateBlockDPC(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,doc.data().item.blockdpc);
          var ceiling = this.calculateCeiling(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaC,doc.data().item.ceiling);
          var wall = this.calculateWall(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,doc.data().item.walls);
          var cornice = this.calculateCornice(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,doc.data().item.cornice);
          var skirting = this.calculateSkirting(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,0,areavalue.data().areaS,0,doc.data().item.skirting);
          var block =  this.calculateBlock(areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaB,doc.data().item.block);
          var blockbitpaint = this.calculateBlockbitpaint(areavalue.data().No_of_units,areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,areavalue.data().Wall_per_lengthD,0,areavalue.data().bit,doc.data().item.blockbitumin);
           var concrete = this.calculateConcrete(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().conc,doc.data().item.concrete);
           var blinding = this.calculateBlinding(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,doc.data().item.Concb_Percentage);
          var formwork = this.calculateFormwork(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,doc.data().item.bsp,doc.data().item.tsp,doc.data().item.ssp3,doc.data().item.ssp4,doc.data().item.ssp2,areavalue.data().shutt,areavalue.data().Unit_width,doc.data().item.ssp1,doc.data().item.shuttering);
          var bitpaint = this.calculateBitpaint(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().bit,areavalue.data().Unit_width,doc.data().item.tbp,doc.data().item.bbp,doc.data().item.sbp4,doc.data().item.sbp3,doc.data().item.sbp2,doc.data().item.sbp1,doc.data().item.bitumin);
          var expansionjoints =  this.calculateExpansionjoints(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.bep,doc.data().item.tep,doc.data().item.sep3,doc.data().item.sep4,doc.data().item.sep2,areavalue.data().EXTRAEXP,doc.data().item.sep1,doc.data().item.Exp_Percentage);
          var precast = this.calculatePrecast(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().No_of_units,doc.data().item.itemprecast,areavalue.data().precast);
          var polythene =  this.calculatePolythene(areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,areavalue.data().No_of_units,areavalue.data().Unit_width,doc.data().item.tpp,doc.data().item.bpp,doc.data().item.spp4,doc.data().item.spp3,doc.data().item.spp1,areavalue.data().polyth,doc.data().item.spp2,doc.data().item.polythene);
          var steel = this.calculateSteel(areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,doc.data().item.itemsteel);      
          var individualqty = this.calculateIndividualqty(areavalue.data().No_of_units,doc.data().item.iqty,doc.data().item.I_FACTOR)
        this.myItemsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          itemID : doc.data().itemID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          item : doc.data().item,
          fill: fill,
          excavation : excavation,
          floor : floor,
          BlockDPC : BlockDPC,
          ceiling : ceiling,
          wall : wall,
          cornice : cornice,
          skirting : skirting,
          block : block,
          blockbitpaint : blockbitpaint,
          concrete : concrete,
          blinding : blinding,
          formwork : formwork,
          bitpaint : bitpaint,
          expansionjoints : expansionjoints,
          precast : precast,
          polythene : polythene,
          steel : steel,
          individualqty : individualqty,
          fqty : (fill+excavation+floor+BlockDPC+ceiling+wall+cornice+skirting+block+blockbitpaint+concrete+blinding+formwork+bitpaint+expansionjoints+precast+polythene+steel+individualqty)
       })
      })
    })
    })
}


getAllVariationsofBuilding(){
  this.myvariationsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/variations/`, ref => ref.where("buildID", "==", this.myBuildingID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        let qty = this.calculateFinalQuantity(
          areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,
          areavalue.data().fill,areavalue.data().No_of_units,doc.data().variation.FILL_Percentage,
          areavalue.data().exc,doc.data().variation.E_Percentage,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,
          areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,
          areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().variation.floor,
          areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,
          doc.data().variation.blockdpc,0,areavalue.data().areaC,doc.data().variation.ceiling,
          areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,
          areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,
          areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,
          doc.data().variation.walls,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,
          areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,
          doc.data().variation.cornice,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,
          areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,
          areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,
          0,areavalue.data().areaS,
          0,doc.data().variation.skirting,areavalue.data().areaB,doc.data().variation.block,areavalue.data().bit,
          doc.data().variation.blockbitumin,
          areavalue.data().conc,doc.data().variation.concrete,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,
          doc.data().variation.Concb_Percentage,doc.data().variation.bsp,doc.data().variation.tsp,doc.data().variation.ssp3,
          doc.data().variation.ssp4,doc.data().variation.ssp2,
          areavalue.data().shutt,areavalue.data().Unit_width,doc.data().variation.ssp1,doc.data().variation.shuttering,doc.data().variation.tbp,
          doc.data().variation.bbp,doc.data().variation.sbp4,doc.data().variation.sbp3,doc.data().variation.sbp2,doc.data().variation.sbp1,
          doc.data().variation.bitumin,doc.data().variation.bep,doc.data().variation.tep,doc.data().variation.sep3,
          doc.data().variation.sep4,doc.data().variation.sep2,areavalue.data().EXTRAEXP,doc.data().variation.sep1,
          doc.data().variation.Exp_Percentage,doc.data().variation.itemprecast,areavalue.data().precast,
          doc.data().variation.tpp,doc.data().variation.bpp,doc.data().variation.spp4,doc.data().variation.spp3,
          doc.data().variation.spp1,areavalue.data().polyth,
          doc.data().variation.spp2,doc.data().variation.polythene,areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,
          areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,
          doc.data().variation.itemsteel,doc.data().variation.iqty,doc.data().variation.I_FACTOR
          )
        this.myvariationsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          variationID : doc.data().variationID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          variation : doc.data().variation,
          fqty : qty
       })
      })
    })
    })
}

getAllVariationsofFloor(){
  this.myvariationsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/variations/`, ref => ref.where("floorID", "==", this.myFloorID).where("buildID","==",this.myBuildingID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        let qty = this.calculateFinalQuantity(
          areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,
          areavalue.data().fill,areavalue.data().No_of_units,doc.data().variation.FILL_Percentage,
          areavalue.data().exc,doc.data().variation.E_Percentage,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,
          areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,
          areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().variation.floor,
          areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,
          doc.data().variation.blockdpc,0,areavalue.data().areaC,doc.data().variation.ceiling,
          areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,
          areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,
          areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,
          doc.data().variation.walls,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,
          areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,
          doc.data().variation.cornice,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,
          areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,
          areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,
          0,areavalue.data().areaS,
          0,doc.data().variation.skirting,areavalue.data().areaB,doc.data().variation.block,areavalue.data().bit,
          doc.data().variation.blockbitumin,
          areavalue.data().conc,doc.data().variation.concrete,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,
          doc.data().variation.Concb_Percentage,doc.data().variation.bsp,doc.data().variation.tsp,doc.data().variation.ssp3,
          doc.data().variation.ssp4,doc.data().variation.ssp2,
          areavalue.data().shutt,areavalue.data().Unit_width,doc.data().variation.ssp1,doc.data().variation.shuttering,doc.data().variation.tbp,
          doc.data().variation.bbp,doc.data().variation.sbp4,doc.data().variation.sbp3,doc.data().variation.sbp2,doc.data().variation.sbp1,
          doc.data().variation.bitumin,doc.data().variation.bep,doc.data().variation.tep,doc.data().variation.sep3,
          doc.data().variation.sep4,doc.data().variation.sep2,areavalue.data().EXTRAEXP,doc.data().variation.sep1,
          doc.data().variation.Exp_Percentage,doc.data().variation.itemprecast,areavalue.data().precast,
          doc.data().variation.tpp,doc.data().variation.bpp,doc.data().variation.spp4,doc.data().variation.spp3,
          doc.data().variation.spp1,areavalue.data().polyth,
          doc.data().variation.spp2,doc.data().variation.polythene,areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,
          areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,
          doc.data().variation.itemsteel,doc.data().variation.iqty,doc.data().variation.I_FACTOR
          )
          this.myvariationsList.push({
            id: doc.ref.id,
            buildID :  doc.data().buildID,
            floorID: doc.data().floorID,
            areacatID : doc.data().areacatID,
            areasubcatID : doc.data().areasubcatID,
            areasubsubcatID : doc.data().areasubsubcatID,
            variationID : doc.data().variationID,
            areaID : doc.data().areaID,
            areaname : areavalue.data().name,
            code : areavalue.data().code,
            variation : doc.data().variation,
            fqty : qty
         })
      })
    })
    })
}

getAllVariationsofCat(){
  this.myvariationsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/variations/`, ref => ref.where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        let qty = this.calculateFinalQuantity(
          areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,
          areavalue.data().fill,areavalue.data().No_of_units,doc.data().variation.FILL_Percentage,
          areavalue.data().exc,doc.data().variation.E_Percentage,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,
          areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,
          areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().variation.floor,
          areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,
          doc.data().variation.blockdpc,0,areavalue.data().areaC,doc.data().variation.ceiling,
          areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,
          areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,
          areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,
          doc.data().variation.walls,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,
          areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,
          doc.data().variation.cornice,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,
          areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,
          areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,
          0,areavalue.data().areaS,
          0,doc.data().variation.skirting,areavalue.data().areaB,doc.data().variation.block,areavalue.data().bit,
          doc.data().variation.blockbitumin,
          areavalue.data().conc,doc.data().variation.concrete,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,
          doc.data().variation.Concb_Percentage,doc.data().variation.bsp,doc.data().variation.tsp,doc.data().variation.ssp3,
          doc.data().variation.ssp4,doc.data().variation.ssp2,
          areavalue.data().shutt,areavalue.data().Unit_width,doc.data().variation.ssp1,doc.data().variation.shuttering,doc.data().variation.tbp,
          doc.data().variation.bbp,doc.data().variation.sbp4,doc.data().variation.sbp3,doc.data().variation.sbp2,doc.data().variation.sbp1,
          doc.data().variation.bitumin,doc.data().variation.bep,doc.data().variation.tep,doc.data().variation.sep3,
          doc.data().variation.sep4,doc.data().variation.sep2,areavalue.data().EXTRAEXP,doc.data().variation.sep1,
          doc.data().variation.Exp_Percentage,doc.data().variation.itemprecast,areavalue.data().precast,
          doc.data().variation.tpp,doc.data().variation.bpp,doc.data().variation.spp4,doc.data().variation.spp3,
          doc.data().variation.spp1,areavalue.data().polyth,
          doc.data().variation.spp2,doc.data().variation.polythene,areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,
          areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,
          doc.data().variation.itemsteel,doc.data().variation.iqty,doc.data().variation.I_FACTOR
          )
          this.myvariationsList.push({
            id: doc.ref.id,
            buildID :  doc.data().buildID,
            floorID: doc.data().floorID,
            areacatID : doc.data().areacatID,
            areasubcatID : doc.data().areasubcatID,
            areasubsubcatID : doc.data().areasubsubcatID,
            variationID : doc.data().variationID,
            areaID : doc.data().areaID,
            areaname : areavalue.data().name,
            code : areavalue.data().code,
            variation : doc.data().variation,
            fqty : qty
         })
      })
    })
    })
}

getAllVariationsofSubcat(){
  this.myvariationsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/variations/`, ref => ref.where("areasubcatID", "==", this.mySubcatID).where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        let qty = this.calculateFinalQuantity(
          areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,
          areavalue.data().fill,areavalue.data().No_of_units,doc.data().variation.FILL_Percentage,
          areavalue.data().exc,doc.data().variation.E_Percentage,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,
          areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,
          areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().variation.floor,
          areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,
          doc.data().variation.blockdpc,0,areavalue.data().areaC,doc.data().variation.ceiling,
          areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,
          areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,
          areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,
          doc.data().variation.walls,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,
          areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,
          doc.data().variation.cornice,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,
          areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,
          areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,
          0,areavalue.data().areaS,
          0,doc.data().variation.skirting,areavalue.data().areaB,doc.data().variation.block,areavalue.data().bit,
          doc.data().variation.blockbitumin,
          areavalue.data().conc,doc.data().variation.concrete,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,
          doc.data().variation.Concb_Percentage,doc.data().variation.bsp,doc.data().variation.tsp,doc.data().variation.ssp3,
          doc.data().variation.ssp4,doc.data().variation.ssp2,
          areavalue.data().shutt,areavalue.data().Unit_width,doc.data().variation.ssp1,doc.data().variation.shuttering,doc.data().variation.tbp,
          doc.data().variation.bbp,doc.data().variation.sbp4,doc.data().variation.sbp3,doc.data().variation.sbp2,doc.data().variation.sbp1,
          doc.data().variation.bitumin,doc.data().variation.bep,doc.data().variation.tep,doc.data().variation.sep3,
          doc.data().variation.sep4,doc.data().variation.sep2,areavalue.data().EXTRAEXP,doc.data().variation.sep1,
          doc.data().variation.Exp_Percentage,doc.data().variation.itemprecast,areavalue.data().precast,
          doc.data().variation.tpp,doc.data().variation.bpp,doc.data().variation.spp4,doc.data().variation.spp3,
          doc.data().variation.spp1,areavalue.data().polyth,
          doc.data().variation.spp2,doc.data().variation.polythene,areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,
          areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,
          doc.data().variation.itemsteel,doc.data().variation.iqty,doc.data().variation.I_FACTOR
          )
          this.myvariationsList.push({
            id: doc.ref.id,
            buildID :  doc.data().buildID,
            floorID: doc.data().floorID,
            areacatID : doc.data().areacatID,
            areasubcatID : doc.data().areasubcatID,
            areasubsubcatID : doc.data().areasubsubcatID,
            variationID : doc.data().variationID,
            areaID : doc.data().areaID,
            areaname : areavalue.data().name,
            code : areavalue.data().code,
            variation : doc.data().variation,
            fqty : qty
         })
      })
    })
    })
}

getAllVariationsofSubsubcat(){
  this.myvariationsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`, ref => ref.where("areasubsubcatID", "==", this.mySubsubcatID).where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        let qty = this.calculateFinalQuantity(
          areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,
          areavalue.data().fill,areavalue.data().No_of_units,doc.data().variation.FILL_Percentage,
          areavalue.data().exc,doc.data().variation.E_Percentage,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,
          areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,
          areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().variation.floor,
          areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,
          doc.data().variation.blockdpc,0,areavalue.data().areaC,doc.data().variation.ceiling,
          areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,
          areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,
          areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,
          doc.data().variation.walls,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,
          areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,
          doc.data().variation.cornice,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,
          areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,
          areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,
          0,areavalue.data().areaS,
          0,doc.data().variation.skirting,areavalue.data().areaB,doc.data().variation.block,areavalue.data().bit,
          doc.data().variation.blockbitumin,
          areavalue.data().conc,doc.data().variation.concrete,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,
          doc.data().variation.Concb_Percentage,doc.data().variation.bsp,doc.data().variation.tsp,doc.data().variation.ssp3,
          doc.data().variation.ssp4,doc.data().variation.ssp2,
          areavalue.data().shutt,areavalue.data().Unit_width,doc.data().variation.ssp1,doc.data().variation.shuttering,doc.data().variation.tbp,
          doc.data().variation.bbp,doc.data().variation.sbp4,doc.data().variation.sbp3,doc.data().variation.sbp2,doc.data().variation.sbp1,
          doc.data().variation.bitumin,doc.data().variation.bep,doc.data().variation.tep,doc.data().variation.sep3,
          doc.data().variation.sep4,doc.data().variation.sep2,areavalue.data().EXTRAEXP,doc.data().variation.sep1,
          doc.data().variation.Exp_Percentage,doc.data().variation.itemprecast,areavalue.data().precast,
          doc.data().variation.tpp,doc.data().variation.bpp,doc.data().variation.spp4,doc.data().variation.spp3,
          doc.data().variation.spp1,areavalue.data().polyth,
          doc.data().variation.spp2,doc.data().variation.polythene,areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,
          areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,
          doc.data().variation.itemsteel,doc.data().variation.iqty,doc.data().variation.I_FACTOR
          )
          this.myvariationsList.push({
            id: doc.ref.id,
            buildID :  doc.data().buildID,
            floorID: doc.data().floorID,
            areacatID : doc.data().areacatID,
            areasubcatID : doc.data().areasubcatID,
            areasubsubcatID : doc.data().areasubsubcatID,
            variationID : doc.data().variationID,
            areaID : doc.data().areaID,
            areaname : areavalue.data().name,
            code : areavalue.data().code,
            variation : doc.data().variation,
            fqty : qty
         })
      })
    })
    })
}

getAllVariations(){
  this.myvariationsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/variations/`).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        let qty = this.calculateFinalQuantity(
          areavalue.data().Unit_length,areavalue.data().Unit_width,areavalue.data().Unit_height,
          areavalue.data().fill,areavalue.data().No_of_units,doc.data().variation.FILL_Percentage,
          areavalue.data().exc,doc.data().variation.E_Percentage,areavalue.data().R,areavalue.data().RO,areavalue.data().Floor_width_1,areavalue.data().Floor_length_1,areavalue.data().Floor_width_2,
          areavalue.data().Floor_length_2,areavalue.data().Floor_width_3,areavalue.data().Floor_length_3,
          areavalue.data().Floor_width_4,areavalue.data().Floor_length_4,0,areavalue.data().areaF,doc.data().variation.floor,
          areavalue.data().L1,areavalue.data().L2,areavalue.data().L3,areavalue.data().L4,areavalue.data().L5,areavalue.data().L6,areavalue.data().L7,areavalue.data().L8,areavalue.data().areaB,
          doc.data().variation.blockdpc,0,areavalue.data().areaC,doc.data().variation.ceiling,
          areavalue.data().Wall_per_lengthA,areavalue.data().Wall_per_lengthB,areavalue.data().Wall_per_lengthC,
          areavalue.data().Wall_per_lengthD,areavalue.data().Wall_per_lengthE,areavalue.data().Wall_per_lengthF,
          areavalue.data().Wall_per_lengthG,areavalue.data().Wall_per_lengthH,0,areavalue.data().areaW,0,
          doc.data().variation.walls,areavalue.data().PCLA,areavalue.data().PCLB,areavalue.data().PCLC,areavalue.data().PCLD,
          areavalue.data().PCLE,areavalue.data().PCLF,areavalue.data().PCLG,areavalue.data().PCLH,0,areavalue.data().areaCOR,
          doc.data().variation.cornice,areavalue.data().skirting_per_lengthA,areavalue.data().skirting_per_lengthB,
          areavalue.data().skirting_per_lengthC,areavalue.data().skirting_per_lengthD,areavalue.data().skirting_per_lengthE,
          areavalue.data().skirting_per_lengthF,areavalue.data().skirting_per_lengthG,areavalue.data().skirting_per_lengthH,
          0,areavalue.data().areaS,
          0,doc.data().variation.skirting,areavalue.data().areaB,doc.data().variation.block,areavalue.data().bit,
          doc.data().variation.blockbitumin,
          areavalue.data().conc,doc.data().variation.concrete,areavalue.data().EXTRACONCBO,areavalue.data().EXTRACONCB,
          doc.data().variation.Concb_Percentage,doc.data().variation.bsp,doc.data().variation.tsp,doc.data().variation.ssp3,
          doc.data().variation.ssp4,doc.data().variation.ssp2,
          areavalue.data().shutt,areavalue.data().Unit_width,doc.data().variation.ssp1,doc.data().variation.shuttering,doc.data().variation.tbp,
          doc.data().variation.bbp,doc.data().variation.sbp4,doc.data().variation.sbp3,doc.data().variation.sbp2,doc.data().variation.sbp1,
          doc.data().variation.bitumin,doc.data().variation.bep,doc.data().variation.tep,doc.data().variation.sep3,
          doc.data().variation.sep4,doc.data().variation.sep2,areavalue.data().EXTRAEXP,doc.data().variation.sep1,
          doc.data().variation.Exp_Percentage,doc.data().variation.itemprecast,areavalue.data().precast,
          doc.data().variation.tpp,doc.data().variation.bpp,doc.data().variation.spp4,doc.data().variation.spp3,
          doc.data().variation.spp1,areavalue.data().polyth,
          doc.data().variation.spp2,doc.data().variation.polythene,areavalue.data().Y8,areavalue.data().Y10,areavalue.data().Y12,
          areavalue.data().Y16,areavalue.data().Y20,areavalue.data().Y25,areavalue.data().Y32,areavalue.data().steel,
          doc.data().variation.itemsteel,doc.data().variation.iqty,doc.data().variation.I_FACTOR
          )
          this.myvariationsList.push({
            id: doc.ref.id,
            buildID :  doc.data().buildID,
            floorID: doc.data().floorID,
            areacatID : doc.data().areacatID,
            areasubcatID : doc.data().areasubcatID,
            areasubsubcatID : doc.data().areasubsubcatID,
            variationID : doc.data().variationID,
            areaID : doc.data().areaID,
            areaname : areavalue.data().name,
            code : areavalue.data().code,
            variation : doc.data().variation,
            fqty : qty
         })
      })
    })
    })
}

getAllOpeningsofBuilding(){
  this.myopeningsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/openings/`, ref => ref.where("buildID", "==", this.myBuildingID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myopeningsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          openID : doc.data().openID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          opening : doc.data().opening,
          openno : doc.data().openno,
          openper : doc.data().openper
       })
      })
    })
    })
}

getAllOpensofFloor(){
  this.myopeningsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/openings/`, ref => ref.where("floorID", "==", this.myFloorID).where("buildID","==",this.myBuildingID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myopeningsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          openID : doc.data().openID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          opening : doc.data().opening,
          openno : doc.data().openno,
          openper : doc.data().openper
       })
      })
    })
    })
}

getAllOpeningofCat(){
  this.myopeningsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/openings/`, ref => ref.where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myopeningsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          openID : doc.data().openID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          opening : doc.data().opening,
          openno : doc.data().openno,
          openper : doc.data().openper
       })
      })
    })
    })
}

getAllOpeningofSubcat(){
  this.myopeningsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/openings/`, ref => ref.where("areasubcatID", "==", this.mySubcatID).where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myopeningsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          openID : doc.data().openID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          opening : doc.data().opening,
          openno : doc.data().openno,
          openper : doc.data().openper
       })
      })
    })
    })
}

getAllOpeningofSubsubcat(){
  this.myopeningsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/openings/`, ref => ref.where("areasubsubcatID", "==", this.mySubsubcatID).where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myopeningsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          openID : doc.data().openID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          opening : doc.data().opening,
          openno : doc.data().openno,
       })
      })
    })
    })
}

getAllOpenings(){
  this.myopeningsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/openings/`).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myopeningsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          openID : doc.data().openID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          opening : doc.data().opening,
          openper : doc.data().openper
       })
      })
    })
    })
}

getAllprojectionsofBuilding(){
  this.myprojectionsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/projections/`, ref => ref.where("buildID", "==", this.myBuildingID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myprojectionsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          projectionID : doc.data().projectionID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          projection : doc.data().projection,
          projectionno : doc.data().projectionno,
          projectionper : doc.data().projectionper
       })
      })
    })
    })
}

getAllprojectionsofFloor(){
  this.myprojectionsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/projections/`, ref => ref.where("floorID", "==", this.myFloorID).where("buildID","==",this.myBuildingID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myprojectionsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          projectionID : doc.data().projectionID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          projection : doc.data().projection,
          projectionno : doc.data().projectionno,
          projectionper : doc.data().projectionper
       })
      })
    })
    })
}

getAllprojectionofCat(){
  this.myprojectionsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/projections/`, ref => ref.where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myprojectionsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          projectionID : doc.data().projectionID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          projection : doc.data().projection,
          projectionno : doc.data().projectionno,
          projectionper : doc.data().projectionper
       })
      })
    })
    })
}

getAllprojectionofSubcat(){
  this.myprojectionsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/projections/`, ref => ref.where("areasubcatID", "==", this.mySubcatID).where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myprojectionsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          projectionID : doc.data().projectionID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          projection : doc.data().projection,
          projectionno : doc.data().projectionno,
          projectionper : doc.data().projectionper
       })
      })
    })
    })
}

getAllprojectionofSubsubcat(){
  this.myprojectionsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/projections/`, ref => ref.where("areasubsubcatID", "==", this.mySubsubcatID).where("areacatID", "==", this.myCatID).where("buildID","==",this.myBuildingID).where("floorID", "==", this.myFloorID)).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myprojectionsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          projectionID : doc.data().projectionID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          projection : doc.data().projection,
          projectionno : doc.data().projectionno,
       })
      })
    })
    })
}

getAllprojections(){
  this.myprojectionsList=[]
  this.afs.collection(`boq/boq/projects/${this.pid}/projections/`).get().subscribe(va =>{
    va.docs.forEach(doc =>{
      this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${doc.data().buildID}/floors/${doc.data().floorID}/cat/${doc.data().areacatID}/subcat/${doc.data().areasubcatID}/subsubcat/${doc.data().areasubsubcatID}/areas/${doc.data().areaID}`).get().subscribe(areavalue =>{
        this.myprojectionsList.push({
          id: doc.ref.id,
          buildID :  doc.data().buildID,
          floorID: doc.data().floorID,
          areacatID : doc.data().areacatID,
          areasubcatID : doc.data().areasubcatID,
          areasubsubcatID : doc.data().areasubsubcatID,
          projectionID : doc.data().projectionID,
          areaID : doc.data().areaID,
          areaname : areavalue.data().name,
          code : areavalue.data().code,
          projection : doc.data().projection,
          projectionper : doc.data().projectionper
       })
      })
    })
    })
}





getAllAreas(){
  this.myAreaList = []
  this.afs.collection(`boq/boq/projects/${this.pid}/buildings`).get().subscribe(docs =>{
    docs.forEach(doc =>{
      this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${doc.ref.id}/floors`).get().subscribe(fvalue =>{
        fvalue.forEach(fdoc=>{
          this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${doc.ref.id}/floors/${fdoc.ref.id}/cat`).get().subscribe(cdocs =>{
           cdocs.forEach(cdoc =>{
            this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${doc.ref.id}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat`).get().subscribe(subdocs =>{
            subdocs.forEach(subdoc =>{
              this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${doc.ref.id}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat/${subdoc.ref.id}/subsubcat`).get().subscribe(subsubdocs =>{
                subsubdocs.forEach(subsubdoc =>{
                  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${doc.ref.id}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat/${subdoc.ref.id}/subsubcat/${subsubdoc.ref.id}/areas`).get().subscribe(adocs=>{
                   adocs.forEach(adoc =>{
                      this.pushToArray( this.myAreaList, {
                         id : adoc.ref.id,
                         catname : adoc.data().catname,
                          catid :  adoc.data().catid,
                          subcatname : adoc.data().subcatname,
                          subcatid : adoc.data().subcatid,
                          subsubcatname : adoc.data().subsubcatname,
                          subsubcatid : adoc.data().subsubcatid,
                          name : adoc.data().name,
                          floorname : adoc.data().floorname,
                          floorID : adoc.data().floorID,
                          BuildingID : adoc.data().BuildingID,
                          code : adoc.data().code,
                          image : adoc.data().image,
                          Unit_width : adoc.data().Unit_width,
                          Unit_length : adoc.data().Unit_length,
                          Unit_height : adoc.data().Unit_height,
                          No_of_units : adoc.data().No_of_units,
                          R : adoc.data().R,
                          RO : adoc.data().RO,
                          L1 : adoc.data().L1,
                          L2 : adoc.data().L2,
                          L3 : adoc.data().L3,
                          L4 : adoc.data().L4,
                          L5 : adoc.data().L5,
                          L6 : adoc.data().L6,
                          L7 : adoc.data().L7,
                          L8 : adoc.data().L8,
                          Hal_Axis : adoc.data().Hal_Axis,
                          Val_Axis : adoc.data().Val_Axis,
                          Floor_width_1 : adoc.data().Floor_width_1,
                          Floor_width_2 : adoc.data().Floor_width_2,
                          Floor_width_3 : adoc.data().Floor_width_3,
                          Floor_width_4 : adoc.data().Floor_width_4,
                          Floor_length_1 : adoc.data().Floor_length_1,
                          Floor_length_2 : adoc.data().Floor_length_2,
                          Floor_length_3 : adoc.data().Floor_length_3,
                          Floor_length_4 : adoc.data().Floor_length_4,
                          Wall_per_lengthA : adoc.data().Wall_per_lengthA,
                          Wall_per_lengthB : adoc.data().Wall_per_lengthB,
                          Wall_per_lengthC : adoc.data().Wall_per_lengthC,
                          Wall_per_lengthD : adoc.data().Wall_per_lengthD,
                          Wall_per_lengthE : adoc.data().Wall_per_lengthE,
                          Wall_per_lengthF : adoc.data().Wall_per_lengthF,
                          Wall_per_lengthG : adoc.data().Wall_per_lengthG,
                          Wall_per_lengthH : adoc.data().Wall_per_lengthH,
                          skirting_per_lengthA : adoc.data().skirting_per_lengthA,
                          skirting_per_lengthB : adoc.data().skirting_per_lengthB,
                          skirting_per_lengthC : adoc.data().skirting_per_lengthC,
                          skirting_per_lengthD : adoc.data().skirting_per_lengthD,
                          skirting_per_lengthE : adoc.data().skirting_per_lengthE,
                          skirting_per_lengthF : adoc.data().skirting_per_lengthF,
                          skirting_per_lengthG : adoc.data().skirting_per_lengthG,
                          skirting_per_lengthH : adoc.data().skirting_per_lengthH,
                          PCLA : adoc.data().PCLA,
                          PCLB : adoc.data().PCLB,
                          PCLC : adoc.data().PCLC,
                          PCLD : adoc.data().PCLD,
                          PCLE : adoc.data().PCLE,
                          PCLF : adoc.data().PCLF,
                          PCLG : adoc.data().PCLG,
                          PCLH : adoc.data().PCLH,
                          Y6 : adoc.data().Y6,
                          Y8 : adoc.data().Y8,
                          Y10 : adoc.data().Y10,
                          Y12 : adoc.data().Y12,
                          Y14 : adoc.data().Y14,
                          Y16 : adoc.data().Y16,
                          Y18 : adoc.data().Y18,
                          Y20 : adoc.data().Y20,
                          Y22 : adoc.data().Y22,
                          Y25 : adoc.data().Y25,
                          Y28 : adoc.data().Y28,
                          Y32 : adoc.data().Y32,
                          Y40 : adoc.data().Y40,
                          extraworkqqty : adoc.data().extraworkqqty,
                          extraexpansionjointqty : adoc.data().extraexpansionjointqty,
                          extrablkqty : adoc.data().extrablkqty,
                          extrablindqty : adoc.data().extrablindqty,
                          expectnoboqitem : adoc.data().expectnoboqitem,
                          areaF : adoc.data().areaF,
                          areaW : adoc.data().areaW,
                          areaC : adoc.data().areaC,
                          areaS : adoc.data().areaS,
                          areaCOR : adoc.data().areaCOR,
                          areaB : adoc.data().areaB,
                          extraBlockDPC : adoc.data().extraBlockDPC,
                          conc : adoc.data().conc,
                          shutt : adoc.data().shutt,
                          bit : adoc.data().bit,
                          polyth : adoc.data().polyth,
                          steel : adoc.data().steel,
                          exc : adoc.data().exc,
                          fill : adoc.data().fill,
                          precast : adoc.data().precast,
                          EXTRAEXP : adoc.data().EXTRAEXP,
                          EXTRACONCBO : adoc.data().EXTRACONCBO,
                          EXTRACONCB : adoc.data().EXTRACONCB,


                          ch1A : adoc.data().ch1A,
                          ch1B : adoc.data().ch1B,
                          ch1C : adoc.data().ch1C,
                          ch1D : adoc.data().ch1D,
                          ch1E : adoc.data().ch1E,
                          ch1F : adoc.data().ch1F,
                          ch1G : adoc.data().ch1G,
                          ch1H : adoc.data().ch1H,
                          ch1I : adoc.data().ch1I,
                          ch1J : adoc.data().ch1J,
                          ch1K : adoc.data().ch1K,
                          ch1L : adoc.data().ch1L,
                          ch1M : adoc.data().ch1M,
                          ch1N : adoc.data().ch1N,
                          ch1O : adoc.data().ch1O,
                          ch1P : adoc.data().ch1P,
                          ch1Q : adoc.data().ch1Q,
                          ch1R : adoc.data().ch1R,
                          ch1S : adoc.data().ch1S,
                          ch1T : adoc.data().ch1T,
                          ch1U : adoc.data().ch1U,
                          ch1V : adoc.data().ch1V,
                          ch1W : adoc.data().ch1W,
                          ch1X : adoc.data().ch1X,
                          ch1Y : adoc.data().ch1Y,
                          ch1Z : adoc.data().ch1Z,
                          ch1AA : adoc.data().ch1AA,
                          ch1AB : adoc.data().ch1AB,
                          ch1AC : adoc.data().ch1AC,
                          ch1AD : adoc.data().ch1AD,
                          ch1AE : adoc.data().ch1AE,
                          ch1AF : adoc.data().ch1AF,
                          ch1AG : adoc.data().ch1AG,
                          ch1AH : adoc.data().ch1AH,
                          ch1AI : adoc.data().ch1AI,
                          ch1AJ : adoc.data().ch1AJ,
                          ch1AK : adoc.data().ch1AK,
                          ch1AL : adoc.data().ch1AL,
                          ch1AM : adoc.data().ch1AM,
                          ch1AN : adoc.data().ch1AN,
                          ch1AO : adoc.data().ch1AO,

                          ch2A : adoc.data().ch2A,
                          ch2B : adoc.data().ch2B,
                          ch2C : adoc.data().ch2C,
                          ch2D : adoc.data().ch2D,
                          ch2E : adoc.data().ch2E,
                          ch2F : adoc.data().ch2F,
                          ch2G : adoc.data().ch2G,
                          ch2H : adoc.data().ch2H,
                          ch2I : adoc.data().ch2I,
                          ch2J : adoc.data().ch2J,
                          ch2K : adoc.data().ch2K,
                          ch2L : adoc.data().ch2L,
                          ch2M : adoc.data().ch2M,
                          ch2N : adoc.data().ch2N,
                          ch2O : adoc.data().ch2O,
                          ch2P : adoc.data().ch2P,
                          ch2Q : adoc.data().ch2Q,
                          ch2R : adoc.data().ch2R,
                          ch2S : adoc.data().ch2S,
                          ch2T : adoc.data().ch2T,
                          ch2U : adoc.data().ch2U,
                          ch2V : adoc.data().ch2V,
                          ch2W : adoc.data().ch2W,
                          ch2X : adoc.data().ch2X,
                          ch2Y : adoc.data().ch2Y,
                          ch2Z : adoc.data().ch2Z,
                          ch2AA : adoc.data().ch2AA,
                          ch2AB : adoc.data().ch2AB,
                          ch2AC : adoc.data().ch2AC,
                          ch2AD : adoc.data().ch2AD,
                          ch2AE : adoc.data().ch2AE,
                          ch2AF : adoc.data().ch2AF,
                          ch2AG : adoc.data().ch2AG,
                          ch2AH : adoc.data().ch2AH,
                          ch2AI : adoc.data().ch2AI,
                          ch2AJ : adoc.data().ch2AJ,
                          ch2AK : adoc.data().ch2AK,
                          ch2AL : adoc.data().ch2AL,
                          ch2AM : adoc.data().ch2AM,
                          ch2AN : adoc.data().ch2AN,
                          ch2AO : adoc.data().ch2AO,

                          ch3A : adoc.data().ch3A,
                          ch3B : adoc.data().ch3B,
                          ch3C : adoc.data().ch3C,
                          ch3D : adoc.data().ch3D,
                          ch3E : adoc.data().ch3E,
                          ch3F : adoc.data().ch3F,
                          ch3G : adoc.data().ch3G,
                          ch3H : adoc.data().ch3H,
                          ch3I : adoc.data().ch3I,
                          ch3J : adoc.data().ch3J,
                          ch3K : adoc.data().ch3K,
                          ch3L : adoc.data().ch3L,
                          ch3M : adoc.data().ch3M,
                          ch3N : adoc.data().ch3N,
                          ch3O : adoc.data().ch3O,
                          ch3P : adoc.data().ch3P,
                          ch3Q : adoc.data().ch3Q,
                          ch3R : adoc.data().ch3R,
                          ch3S : adoc.data().ch3S,
                          ch3T : adoc.data().ch3T,
                          ch3U : adoc.data().ch3U,
                          ch3V : adoc.data().ch3V,
                          ch3W : adoc.data().ch3W,
                          ch3X : adoc.data().ch3X,
                          ch3Y : adoc.data().ch3Y,
                          ch3Z : adoc.data().ch3Z,
                          ch3AA : adoc.data().ch3AA,
                          ch3AB : adoc.data().ch3AB,
                          ch3AC : adoc.data().ch3AC,
                          ch3AD : adoc.data().ch3AD,
                          ch3AE : adoc.data().ch3AE,
                          ch3AF : adoc.data().ch3AF,
                          ch3AG : adoc.data().ch3AG,
                          ch3AH : adoc.data().ch3AH,
                          ch3AI : adoc.data().ch3AI,
                          ch3AJ : adoc.data().ch3AJ,
                          ch3AK : adoc.data().ch3AK,
                          ch3AL : adoc.data().ch3AL,
                          ch3AM : adoc.data().ch3AM,
                          ch3AN : adoc.data().ch3AN,
                          ch3AO : adoc.data().ch3AO,
                       })
                    })
                  })
                })
              })
            })
            })
          })
          })
        })
      })
    })
  })
}

getAllAreasofBuildings(){
this.presentLoading();
  this.myAreaList = []
      this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors`).get().subscribe(fvalue =>{
        fvalue.forEach(fdoc=>{
          this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${fdoc.ref.id}/cat`).get().subscribe(cdocs =>{
           cdocs.forEach(cdoc =>{
            this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat`).get().subscribe(subdocs =>{
            subdocs.forEach(subdoc =>{
              this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat/${subdoc.ref.id}/subsubcat`).get().subscribe(subsubdocs =>{
                subsubdocs.forEach(subsubdoc =>{
                  this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${fdoc.ref.id}/cat/${cdoc.ref.id}/subcat/${subdoc.ref.id}/subsubcat/${subsubdoc.ref.id}/areas`).get().subscribe(adocs=>{
                  console.log("GETALLAREASOFBUILDING")
                    adocs.docs.forEach(adoc =>{
                      this.myAreaList.push({
                        no : fdoc.data().no,
                          id : adoc.ref.id,
                          catname : adoc.data().catname,
                           catid :  adoc.data().catid,
                           subcatname : adoc.data().subcatname,
                           subcatid : adoc.data().subcatid,
                           subsubcatname : adoc.data().subsubcatname,
                           subsubcatid : adoc.data().subsubcatid,
                           name : adoc.data().name,
                           floorname : adoc.data().floorname,
                           floorID : adoc.data().floorID,
                           BuildingID : adoc.data().BuildingID,
                           code : adoc.data().code,
                           image : adoc.data().image,
                           Unit_width : adoc.data().Unit_width,
                           Unit_length : adoc.data().Unit_length,
                           Unit_height : adoc.data().Unit_height,
                           No_of_units : adoc.data().No_of_units,
                           R : adoc.data().R,
                           RO : adoc.data().RO,
                           L1 : adoc.data().L1,
                           L2 : adoc.data().L2,
                           L3 : adoc.data().L3,
                           L4 : adoc.data().L4,
                           L5 : adoc.data().L5,
                           L6 : adoc.data().L6,
                           L7 : adoc.data().L7,
                           L8 : adoc.data().L8,
                           Hal_Axis : adoc.data().Hal_Axis,
                           Val_Axis : adoc.data().Val_Axis,
                           Floor_width_1 : adoc.data().Floor_width_1,
                           Floor_width_2 : adoc.data().Floor_width_2,
                           Floor_width_3 : adoc.data().Floor_width_3,
                           Floor_width_4 : adoc.data().Floor_width_4,
                           Floor_length_1 : adoc.data().Floor_length_1,
                           Floor_length_2 : adoc.data().Floor_length_2,
                           Floor_length_3 : adoc.data().Floor_length_3,
                           Floor_length_4 : adoc.data().Floor_length_4,
                           Wall_per_lengthA : adoc.data().Wall_per_lengthA,
                           Wall_per_lengthB : adoc.data().Wall_per_lengthB,
                           Wall_per_lengthC : adoc.data().Wall_per_lengthC,
                           Wall_per_lengthD : adoc.data().Wall_per_lengthD,
                           Wall_per_lengthE : adoc.data().Wall_per_lengthE,
                           Wall_per_lengthF : adoc.data().Wall_per_lengthF,
                           Wall_per_lengthG : adoc.data().Wall_per_lengthG,
                           Wall_per_lengthH : adoc.data().Wall_per_lengthH,
                           skirting_per_lengthA : adoc.data().skirting_per_lengthA,
                           skirting_per_lengthB : adoc.data().skirting_per_lengthB,
                           skirting_per_lengthC : adoc.data().skirting_per_lengthC,
                           skirting_per_lengthD : adoc.data().skirting_per_lengthD,
                           skirting_per_lengthE : adoc.data().skirting_per_lengthE,
                           skirting_per_lengthF : adoc.data().skirting_per_lengthF,
                           skirting_per_lengthG : adoc.data().skirting_per_lengthG,
                           skirting_per_lengthH : adoc.data().skirting_per_lengthH,
                           PCLA : adoc.data().PCLA,
                           PCLB : adoc.data().PCLB,
                           PCLC : adoc.data().PCLC,
                           PCLD : adoc.data().PCLD,
                           PCLE : adoc.data().PCLE,
                           PCLF : adoc.data().PCLF,
                           PCLG : adoc.data().PCLG,
                           PCLH : adoc.data().PCLH,
                           Y6 : adoc.data().Y6,
                           Y8 : adoc.data().Y8,
                           Y10 : adoc.data().Y10,
                           Y12 : adoc.data().Y12,
                           Y14 : adoc.data().Y14,
                           Y16 : adoc.data().Y16,
                           Y18 : adoc.data().Y18,
                           Y20 : adoc.data().Y20,
                           Y22 : adoc.data().Y22,
                           Y25 : adoc.data().Y25,
                           Y28 : adoc.data().Y28,
                           Y32 : adoc.data().Y32,
                           Y40 : adoc.data().Y40,
                           extraworkqqty : adoc.data().extraworkqqty,
                           extraexpansionjointqty : adoc.data().extraexpansionjointqty,
                           extrablkqty : adoc.data().extrablkqty,
                           extrablindqty : adoc.data().extrablindqty,
                           expectnoboqitem : adoc.data().expectnoboqitem,
                           areaF : adoc.data().areaF,
                           areaW : adoc.data().areaW,
                           areaC : adoc.data().areaC,
                           areaS : adoc.data().areaS,
                           areaCOR : adoc.data().areaCOR,
                           areaB : adoc.data().areaB,
                           extraBlockDPC : adoc.data().extraBlockDPC,
                           conc : adoc.data().conc,
                           shutt : adoc.data().shutt,
                           bit : adoc.data().bit,
                           polyth : adoc.data().polyth,
                           steel : adoc.data().steel,
                           exc : adoc.data().exc,
                           fill : adoc.data().fill,
                           precast : adoc.data().precast,
                           EXTRAEXP : adoc.data().EXTRAEXP,
                           EXTRACONCBO : adoc.data().EXTRACONCBO,
                           EXTRACONCB : adoc.data().EXTRACONCB,
  
  
                           ch1A : adoc.data().ch1A,
                           ch1B : adoc.data().ch1B,
                           ch1C : adoc.data().ch1C,
                           ch1D : adoc.data().ch1D,
                           ch1E : adoc.data().ch1E,
                           ch1F : adoc.data().ch1F,
                           ch1G : adoc.data().ch1G,
                           ch1H : adoc.data().ch1H,
                           ch1I : adoc.data().ch1I,
                           ch1J : adoc.data().ch1J,
                           ch1K : adoc.data().ch1K,
                           ch1L : adoc.data().ch1L,
                           ch1M : adoc.data().ch1M,
                           ch1N : adoc.data().ch1N,
                           ch1O : adoc.data().ch1O,
                           ch1P : adoc.data().ch1P,
                           ch1Q : adoc.data().ch1Q,
                           ch1R : adoc.data().ch1R,
                           ch1S : adoc.data().ch1S,
                           ch1T : adoc.data().ch1T,
                           ch1U : adoc.data().ch1U,
                           ch1V : adoc.data().ch1V,
                           ch1W : adoc.data().ch1W,
                           ch1X : adoc.data().ch1X,
                           ch1Y : adoc.data().ch1Y,
                           ch1Z : adoc.data().ch1Z,
                           ch1AA : adoc.data().ch1AA,
                           ch1AB : adoc.data().ch1AB,
                           ch1AC : adoc.data().ch1AC,
                           ch1AD : adoc.data().ch1AD,
                           ch1AE : adoc.data().ch1AE,
                           ch1AF : adoc.data().ch1AF,
                           ch1AG : adoc.data().ch1AG,
                           ch1AH : adoc.data().ch1AH,
                           ch1AI : adoc.data().ch1AI,
                           ch1AJ : adoc.data().ch1AJ,
                           ch1AK : adoc.data().ch1AK,
                           ch1AL : adoc.data().ch1AL,
                           ch1AM : adoc.data().ch1AM,
                           ch1AN : adoc.data().ch1AN,
                           ch1AO : adoc.data().ch1AO,
  
                           ch2A : adoc.data().ch2A,
                           ch2B : adoc.data().ch2B,
                           ch2C : adoc.data().ch2C,
                           ch2D : adoc.data().ch2D,
                           ch2E : adoc.data().ch2E,
                           ch2F : adoc.data().ch2F,
                           ch2G : adoc.data().ch2G,
                           ch2H : adoc.data().ch2H,
                           ch2I : adoc.data().ch2I,
                           ch2J : adoc.data().ch2J,
                           ch2K : adoc.data().ch2K,
                           ch2L : adoc.data().ch2L,
                           ch2M : adoc.data().ch2M,
                           ch2N : adoc.data().ch2N,
                           ch2O : adoc.data().ch2O,
                           ch2P : adoc.data().ch2P,
                           ch2Q : adoc.data().ch2Q,
                           ch2R : adoc.data().ch2R,
                           ch2S : adoc.data().ch2S,
                           ch2T : adoc.data().ch2T,
                           ch2U : adoc.data().ch2U,
                           ch2V : adoc.data().ch2V,
                           ch2W : adoc.data().ch2W,
                           ch2X : adoc.data().ch2X,
                           ch2Y : adoc.data().ch2Y,
                           ch2Z : adoc.data().ch2Z,
                           ch2AA : adoc.data().ch2AA,
                           ch2AB : adoc.data().ch2AB,
                           ch2AC : adoc.data().ch2AC,
                           ch2AD : adoc.data().ch2AD,
                           ch2AE : adoc.data().ch2AE,
                           ch2AF : adoc.data().ch2AF,
                           ch2AG : adoc.data().ch2AG,
                           ch2AH : adoc.data().ch2AH,
                           ch2AI : adoc.data().ch2AI,
                           ch2AJ : adoc.data().ch2AJ,
                           ch2AK : adoc.data().ch2AK,
                           ch2AL : adoc.data().ch2AL,
                           ch2AM : adoc.data().ch2AM,
                           ch2AN : adoc.data().ch2AN,
                           ch2AO : adoc.data().ch2AO,
  
                           ch3A : adoc.data().ch3A,
                           ch3B : adoc.data().ch3B,
                           ch3C : adoc.data().ch3C,
                           ch3D : adoc.data().ch3D,
                           ch3E : adoc.data().ch3E,
                           ch3F : adoc.data().ch3F,
                           ch3G : adoc.data().ch3G,
                           ch3H : adoc.data().ch3H,
                           ch3I : adoc.data().ch3I,
                           ch3J : adoc.data().ch3J,
                           ch3K : adoc.data().ch3K,
                           ch3L : adoc.data().ch3L,
                           ch3M : adoc.data().ch3M,
                           ch3N : adoc.data().ch3N,
                           ch3O : adoc.data().ch3O,
                           ch3P : adoc.data().ch3P,
                           ch3Q : adoc.data().ch3Q,
                           ch3R : adoc.data().ch3R,
                           ch3S : adoc.data().ch3S,
                           ch3T : adoc.data().ch3T,
                           ch3U : adoc.data().ch3U,
                           ch3V : adoc.data().ch3V,
                           ch3W : adoc.data().ch3W,
                           ch3X : adoc.data().ch3X,
                           ch3Y : adoc.data().ch3Y,
                           ch3Z : adoc.data().ch3Z,
                           ch3AA : adoc.data().ch3AA,
                           ch3AB : adoc.data().ch3AB,
                           ch3AC : adoc.data().ch3AC,
                           ch3AD : adoc.data().ch3AD,
                           ch3AE : adoc.data().ch3AE,
                           ch3AF : adoc.data().ch3AF,
                           ch3AG : adoc.data().ch3AG,
                           ch3AH : adoc.data().ch3AH,
                           ch3AI : adoc.data().ch3AI,
                           ch3AJ : adoc.data().ch3AJ,
                           ch3AK : adoc.data().ch3AK,
                           ch3AL : adoc.data().ch3AL,
                           ch3AM : adoc.data().ch3AM,
                           ch3AN : adoc.data().ch3AN,
                           ch3AO : adoc.data().ch3AO,
               })
                    })
                  })
                })
              })
            })
            })
          })
          })
        })
        this.loadingController.dismiss()
      })

}

getAllAreasofFloors(){
  this.presentLoading()
  this.myAreaList = []
      this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat`).get().subscribe(cdocs =>{
       cdocs.forEach(cdoc =>{
        this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${cdoc.ref.id}/subcat`).get().subscribe(subdocs =>{
        subdocs.forEach(subdoc =>{
          this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${cdoc.ref.id}/subcat/${subdoc.ref.id}/subsubcat`).get().subscribe(subsubdocs =>{
            subsubdocs.forEach(subsubdoc =>{
              this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${cdoc.ref.id}/subcat/${subdoc.ref.id}/subsubcat/${subsubdoc.ref.id}/areas`).get().subscribe(adocs=>{
               adocs.docs.forEach(adoc =>{
                this.myAreaList.push({
                  id : adoc.ref.id,
                    catname : adoc.data().catname,
                     catid :  adoc.data().catid,
                     subcatname : adoc.data().subcatname,
                     subcatid : adoc.data().subcatid,
                     subsubcatname : adoc.data().subsubcatname,
                     subsubcatid : adoc.data().subsubcatid,
                     name : adoc.data().name,
                     floorname : adoc.data().floorname,
                     floorID : adoc.data().floorID,
                     BuildingID : adoc.data().BuildingID,
                     code : adoc.data().code,
                     image : adoc.data().image,
                     Unit_width : adoc.data().Unit_width,
                     Unit_length : adoc.data().Unit_length,
                     Unit_height : adoc.data().Unit_height,
                     No_of_units : adoc.data().No_of_units,
                     R : adoc.data().R,
                     RO : adoc.data().RO,
                     L1 : adoc.data().L1,
                     L2 : adoc.data().L2,
                     L3 : adoc.data().L3,
                     L4 : adoc.data().L4,
                     L5 : adoc.data().L5,
                     L6 : adoc.data().L6,
                     L7 : adoc.data().L7,
                     L8 : adoc.data().L8,
                     Hal_Axis : adoc.data().Hal_Axis,
                     Val_Axis : adoc.data().Val_Axis,
                     Floor_width_1 : adoc.data().Floor_width_1,
                     Floor_width_2 : adoc.data().Floor_width_2,
                     Floor_width_3 : adoc.data().Floor_width_3,
                     Floor_width_4 : adoc.data().Floor_width_4,
                     Floor_length_1 : adoc.data().Floor_length_1,
                     Floor_length_2 : adoc.data().Floor_length_2,
                     Floor_length_3 : adoc.data().Floor_length_3,
                     Floor_length_4 : adoc.data().Floor_length_4,
                     Wall_per_lengthA : adoc.data().Wall_per_lengthA,
                     Wall_per_lengthB : adoc.data().Wall_per_lengthB,
                     Wall_per_lengthC : adoc.data().Wall_per_lengthC,
                     Wall_per_lengthD : adoc.data().Wall_per_lengthD,
                     Wall_per_lengthE : adoc.data().Wall_per_lengthE,
                     Wall_per_lengthF : adoc.data().Wall_per_lengthF,
                     Wall_per_lengthG : adoc.data().Wall_per_lengthG,
                     Wall_per_lengthH : adoc.data().Wall_per_lengthH,
                     skirting_per_lengthA : adoc.data().skirting_per_lengthA,
                     skirting_per_lengthB : adoc.data().skirting_per_lengthB,
                     skirting_per_lengthC : adoc.data().skirting_per_lengthC,
                     skirting_per_lengthD : adoc.data().skirting_per_lengthD,
                     skirting_per_lengthE : adoc.data().skirting_per_lengthE,
                     skirting_per_lengthF : adoc.data().skirting_per_lengthF,
                     skirting_per_lengthG : adoc.data().skirting_per_lengthG,
                     skirting_per_lengthH : adoc.data().skirting_per_lengthH,
                     PCLA : adoc.data().PCLA,
                     PCLB : adoc.data().PCLB,
                     PCLC : adoc.data().PCLC,
                     PCLD : adoc.data().PCLD,
                     PCLE : adoc.data().PCLE,
                     PCLF : adoc.data().PCLF,
                     PCLG : adoc.data().PCLG,
                     PCLH : adoc.data().PCLH,
                     Y6 : adoc.data().Y6,
                     Y8 : adoc.data().Y8,
                     Y10 : adoc.data().Y10,
                     Y12 : adoc.data().Y12,
                     Y14 : adoc.data().Y14,
                     Y16 : adoc.data().Y16,
                     Y18 : adoc.data().Y18,
                     Y20 : adoc.data().Y20,
                     Y22 : adoc.data().Y22,
                     Y25 : adoc.data().Y25,
                     Y28 : adoc.data().Y28,
                     Y32 : adoc.data().Y32,
                     Y40 : adoc.data().Y40,
                     extraworkqqty : adoc.data().extraworkqqty,
                     extraexpansionjointqty : adoc.data().extraexpansionjointqty,
                     extrablkqty : adoc.data().extrablkqty,
                     extrablindqty : adoc.data().extrablindqty,
                     expectnoboqitem : adoc.data().expectnoboqitem,
                     areaF : adoc.data().areaF,
                     areaW : adoc.data().areaW,
                     areaC : adoc.data().areaC,
                     areaS : adoc.data().areaS,
                     areaCOR : adoc.data().areaCOR,
                     areaB : adoc.data().areaB,
                     extraBlockDPC : adoc.data().extraBlockDPC,
                     conc : adoc.data().conc,
                     shutt : adoc.data().shutt,
                     bit : adoc.data().bit,
                     polyth : adoc.data().polyth,
                     steel : adoc.data().steel,
                     exc : adoc.data().exc,
                     fill : adoc.data().fill,
                     precast : adoc.data().precast,
                     EXTRAEXP : adoc.data().EXTRAEXP,
                     EXTRACONCBO : adoc.data().EXTRACONCBO,
                     EXTRACONCB : adoc.data().EXTRACONCB,


                     ch1A : adoc.data().ch1A,
                     ch1B : adoc.data().ch1B,
                     ch1C : adoc.data().ch1C,
                     ch1D : adoc.data().ch1D,
                     ch1E : adoc.data().ch1E,
                     ch1F : adoc.data().ch1F,
                     ch1G : adoc.data().ch1G,
                     ch1H : adoc.data().ch1H,
                     ch1I : adoc.data().ch1I,
                     ch1J : adoc.data().ch1J,
                     ch1K : adoc.data().ch1K,
                     ch1L : adoc.data().ch1L,
                     ch1M : adoc.data().ch1M,
                     ch1N : adoc.data().ch1N,
                     ch1O : adoc.data().ch1O,
                     ch1P : adoc.data().ch1P,
                     ch1Q : adoc.data().ch1Q,
                     ch1R : adoc.data().ch1R,
                     ch1S : adoc.data().ch1S,
                     ch1T : adoc.data().ch1T,
                     ch1U : adoc.data().ch1U,
                     ch1V : adoc.data().ch1V,
                     ch1W : adoc.data().ch1W,
                     ch1X : adoc.data().ch1X,
                     ch1Y : adoc.data().ch1Y,
                     ch1Z : adoc.data().ch1Z,
                     ch1AA : adoc.data().ch1AA,
                     ch1AB : adoc.data().ch1AB,
                     ch1AC : adoc.data().ch1AC,
                     ch1AD : adoc.data().ch1AD,
                     ch1AE : adoc.data().ch1AE,
                     ch1AF : adoc.data().ch1AF,
                     ch1AG : adoc.data().ch1AG,
                     ch1AH : adoc.data().ch1AH,
                     ch1AI : adoc.data().ch1AI,
                     ch1AJ : adoc.data().ch1AJ,
                     ch1AK : adoc.data().ch1AK,
                     ch1AL : adoc.data().ch1AL,
                     ch1AM : adoc.data().ch1AM,
                     ch1AN : adoc.data().ch1AN,
                     ch1AO : adoc.data().ch1AO,

                     ch2A : adoc.data().ch2A,
                     ch2B : adoc.data().ch2B,
                     ch2C : adoc.data().ch2C,
                     ch2D : adoc.data().ch2D,
                     ch2E : adoc.data().ch2E,
                     ch2F : adoc.data().ch2F,
                     ch2G : adoc.data().ch2G,
                     ch2H : adoc.data().ch2H,
                     ch2I : adoc.data().ch2I,
                     ch2J : adoc.data().ch2J,
                     ch2K : adoc.data().ch2K,
                     ch2L : adoc.data().ch2L,
                     ch2M : adoc.data().ch2M,
                     ch2N : adoc.data().ch2N,
                     ch2O : adoc.data().ch2O,
                     ch2P : adoc.data().ch2P,
                     ch2Q : adoc.data().ch2Q,
                     ch2R : adoc.data().ch2R,
                     ch2S : adoc.data().ch2S,
                     ch2T : adoc.data().ch2T,
                     ch2U : adoc.data().ch2U,
                     ch2V : adoc.data().ch2V,
                     ch2W : adoc.data().ch2W,
                     ch2X : adoc.data().ch2X,
                     ch2Y : adoc.data().ch2Y,
                     ch2Z : adoc.data().ch2Z,
                     ch2AA : adoc.data().ch2AA,
                     ch2AB : adoc.data().ch2AB,
                     ch2AC : adoc.data().ch2AC,
                     ch2AD : adoc.data().ch2AD,
                     ch2AE : adoc.data().ch2AE,
                     ch2AF : adoc.data().ch2AF,
                     ch2AG : adoc.data().ch2AG,
                     ch2AH : adoc.data().ch2AH,
                     ch2AI : adoc.data().ch2AI,
                     ch2AJ : adoc.data().ch2AJ,
                     ch2AK : adoc.data().ch2AK,
                     ch2AL : adoc.data().ch2AL,
                     ch2AM : adoc.data().ch2AM,
                     ch2AN : adoc.data().ch2AN,
                     ch2AO : adoc.data().ch2AO,

                     ch3A : adoc.data().ch3A,
                     ch3B : adoc.data().ch3B,
                     ch3C : adoc.data().ch3C,
                     ch3D : adoc.data().ch3D,
                     ch3E : adoc.data().ch3E,
                     ch3F : adoc.data().ch3F,
                     ch3G : adoc.data().ch3G,
                     ch3H : adoc.data().ch3H,
                     ch3I : adoc.data().ch3I,
                     ch3J : adoc.data().ch3J,
                     ch3K : adoc.data().ch3K,
                     ch3L : adoc.data().ch3L,
                     ch3M : adoc.data().ch3M,
                     ch3N : adoc.data().ch3N,
                     ch3O : adoc.data().ch3O,
                     ch3P : adoc.data().ch3P,
                     ch3Q : adoc.data().ch3Q,
                     ch3R : adoc.data().ch3R,
                     ch3S : adoc.data().ch3S,
                     ch3T : adoc.data().ch3T,
                     ch3U : adoc.data().ch3U,
                     ch3V : adoc.data().ch3V,
                     ch3W : adoc.data().ch3W,
                     ch3X : adoc.data().ch3X,
                     ch3Y : adoc.data().ch3Y,
                     ch3Z : adoc.data().ch3Z,
                     ch3AA : adoc.data().ch3AA,
                     ch3AB : adoc.data().ch3AB,
                     ch3AC : adoc.data().ch3AC,
                     ch3AD : adoc.data().ch3AD,
                     ch3AE : adoc.data().ch3AE,
                     ch3AF : adoc.data().ch3AF,
                     ch3AG : adoc.data().ch3AG,
                     ch3AH : adoc.data().ch3AH,
                     ch3AI : adoc.data().ch3AI,
                     ch3AJ : adoc.data().ch3AJ,
                     ch3AK : adoc.data().ch3AK,
                     ch3AL : adoc.data().ch3AL,
                     ch3AM : adoc.data().ch3AM,
                     ch3AN : adoc.data().ch3AN,
                     ch3AO : adoc.data().ch3AO,
         })
                })
              })
            })
          })
        })
        })
      })
      this.storage.get(`${this.pid}myAreaID`).then(myarea =>{
        if(myarea !== null){
         this.myAreaID = myarea
         console.log(myarea)
    
        }
      })
      this.loadingController.dismiss()
      })

}

getAllAreasofCat(){
  this.presentLoading()
  this.myAreaList = []
    this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat`).get().subscribe(subdocs =>{
    subdocs.forEach(subdoc =>{
      this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${subdoc.ref.id}/subsubcat`).get().subscribe(subsubdocs =>{
        subsubdocs.forEach(subsubdoc =>{
          this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${subdoc.ref.id}/subsubcat/${subsubdoc.ref.id}/areas`).get().subscribe(adocs=>{
           adocs.docs.forEach(adoc =>{
            this.myAreaList.push({
              id : adoc.ref.id,
                catname : adoc.data().catname,
                 catid :  adoc.data().catid,
                 subcatname : adoc.data().subcatname,
                 subcatid : adoc.data().subcatid,
                 subsubcatname : adoc.data().subsubcatname,
                 subsubcatid : adoc.data().subsubcatid,
                 name : adoc.data().name,
                 floorname : adoc.data().floorname,
                 floorID : adoc.data().floorID,
                 BuildingID : adoc.data().BuildingID,
                 code : adoc.data().code,
                 image : adoc.data().image,
                 Unit_width : adoc.data().Unit_width,
                 Unit_length : adoc.data().Unit_length,
                 Unit_height : adoc.data().Unit_height,
                 No_of_units : adoc.data().No_of_units,
                 R : adoc.data().R,
                 RO : adoc.data().RO,
                 L1 : adoc.data().L1,
                 L2 : adoc.data().L2,
                 L3 : adoc.data().L3,
                 L4 : adoc.data().L4,
                 L5 : adoc.data().L5,
                 L6 : adoc.data().L6,
                 L7 : adoc.data().L7,
                 L8 : adoc.data().L8,
                 Hal_Axis : adoc.data().Hal_Axis,
                 Val_Axis : adoc.data().Val_Axis,
                 Floor_width_1 : adoc.data().Floor_width_1,
                 Floor_width_2 : adoc.data().Floor_width_2,
                 Floor_width_3 : adoc.data().Floor_width_3,
                 Floor_width_4 : adoc.data().Floor_width_4,
                 Floor_length_1 : adoc.data().Floor_length_1,
                 Floor_length_2 : adoc.data().Floor_length_2,
                 Floor_length_3 : adoc.data().Floor_length_3,
                 Floor_length_4 : adoc.data().Floor_length_4,
                 Wall_per_lengthA : adoc.data().Wall_per_lengthA,
                 Wall_per_lengthB : adoc.data().Wall_per_lengthB,
                 Wall_per_lengthC : adoc.data().Wall_per_lengthC,
                 Wall_per_lengthD : adoc.data().Wall_per_lengthD,
                 Wall_per_lengthE : adoc.data().Wall_per_lengthE,
                 Wall_per_lengthF : adoc.data().Wall_per_lengthF,
                 Wall_per_lengthG : adoc.data().Wall_per_lengthG,
                 Wall_per_lengthH : adoc.data().Wall_per_lengthH,
                 skirting_per_lengthA : adoc.data().skirting_per_lengthA,
                 skirting_per_lengthB : adoc.data().skirting_per_lengthB,
                 skirting_per_lengthC : adoc.data().skirting_per_lengthC,
                 skirting_per_lengthD : adoc.data().skirting_per_lengthD,
                 skirting_per_lengthE : adoc.data().skirting_per_lengthE,
                 skirting_per_lengthF : adoc.data().skirting_per_lengthF,
                 skirting_per_lengthG : adoc.data().skirting_per_lengthG,
                 skirting_per_lengthH : adoc.data().skirting_per_lengthH,
                 PCLA : adoc.data().PCLA,
                 PCLB : adoc.data().PCLB,
                 PCLC : adoc.data().PCLC,
                 PCLD : adoc.data().PCLD,
                 PCLE : adoc.data().PCLE,
                 PCLF : adoc.data().PCLF,
                 PCLG : adoc.data().PCLG,
                 PCLH : adoc.data().PCLH,
                 Y6 : adoc.data().Y6,
                 Y8 : adoc.data().Y8,
                 Y10 : adoc.data().Y10,
                 Y12 : adoc.data().Y12,
                 Y14 : adoc.data().Y14,
                 Y16 : adoc.data().Y16,
                 Y18 : adoc.data().Y18,
                 Y20 : adoc.data().Y20,
                 Y22 : adoc.data().Y22,
                 Y25 : adoc.data().Y25,
                 Y28 : adoc.data().Y28,
                 Y32 : adoc.data().Y32,
                 Y40 : adoc.data().Y40,
                 extraworkqqty : adoc.data().extraworkqqty,
                 extraexpansionjointqty : adoc.data().extraexpansionjointqty,
                 extrablkqty : adoc.data().extrablkqty,
                 extrablindqty : adoc.data().extrablindqty,
                 expectnoboqitem : adoc.data().expectnoboqitem,
                 areaF : adoc.data().areaF,
                 areaW : adoc.data().areaW,
                 areaC : adoc.data().areaC,
                 areaS : adoc.data().areaS,
                 areaCOR : adoc.data().areaCOR,
                 areaB : adoc.data().areaB,
                 extraBlockDPC : adoc.data().extraBlockDPC,
                 conc : adoc.data().conc,
                 shutt : adoc.data().shutt,
                 bit : adoc.data().bit,
                 polyth : adoc.data().polyth,
                 steel : adoc.data().steel,
                 exc : adoc.data().exc,
                 fill : adoc.data().fill,
                 precast : adoc.data().precast,
                 EXTRAEXP : adoc.data().EXTRAEXP,
                 EXTRACONCBO : adoc.data().EXTRACONCBO,
                 EXTRACONCB : adoc.data().EXTRACONCB,


                 ch1A : adoc.data().ch1A,
                 ch1B : adoc.data().ch1B,
                 ch1C : adoc.data().ch1C,
                 ch1D : adoc.data().ch1D,
                 ch1E : adoc.data().ch1E,
                 ch1F : adoc.data().ch1F,
                 ch1G : adoc.data().ch1G,
                 ch1H : adoc.data().ch1H,
                 ch1I : adoc.data().ch1I,
                 ch1J : adoc.data().ch1J,
                 ch1K : adoc.data().ch1K,
                 ch1L : adoc.data().ch1L,
                 ch1M : adoc.data().ch1M,
                 ch1N : adoc.data().ch1N,
                 ch1O : adoc.data().ch1O,
                 ch1P : adoc.data().ch1P,
                 ch1Q : adoc.data().ch1Q,
                 ch1R : adoc.data().ch1R,
                 ch1S : adoc.data().ch1S,
                 ch1T : adoc.data().ch1T,
                 ch1U : adoc.data().ch1U,
                 ch1V : adoc.data().ch1V,
                 ch1W : adoc.data().ch1W,
                 ch1X : adoc.data().ch1X,
                 ch1Y : adoc.data().ch1Y,
                 ch1Z : adoc.data().ch1Z,
                 ch1AA : adoc.data().ch1AA,
                 ch1AB : adoc.data().ch1AB,
                 ch1AC : adoc.data().ch1AC,
                 ch1AD : adoc.data().ch1AD,
                 ch1AE : adoc.data().ch1AE,
                 ch1AF : adoc.data().ch1AF,
                 ch1AG : adoc.data().ch1AG,
                 ch1AH : adoc.data().ch1AH,
                 ch1AI : adoc.data().ch1AI,
                 ch1AJ : adoc.data().ch1AJ,
                 ch1AK : adoc.data().ch1AK,
                 ch1AL : adoc.data().ch1AL,
                 ch1AM : adoc.data().ch1AM,
                 ch1AN : adoc.data().ch1AN,
                 ch1AO : adoc.data().ch1AO,

                 ch2A : adoc.data().ch2A,
                 ch2B : adoc.data().ch2B,
                 ch2C : adoc.data().ch2C,
                 ch2D : adoc.data().ch2D,
                 ch2E : adoc.data().ch2E,
                 ch2F : adoc.data().ch2F,
                 ch2G : adoc.data().ch2G,
                 ch2H : adoc.data().ch2H,
                 ch2I : adoc.data().ch2I,
                 ch2J : adoc.data().ch2J,
                 ch2K : adoc.data().ch2K,
                 ch2L : adoc.data().ch2L,
                 ch2M : adoc.data().ch2M,
                 ch2N : adoc.data().ch2N,
                 ch2O : adoc.data().ch2O,
                 ch2P : adoc.data().ch2P,
                 ch2Q : adoc.data().ch2Q,
                 ch2R : adoc.data().ch2R,
                 ch2S : adoc.data().ch2S,
                 ch2T : adoc.data().ch2T,
                 ch2U : adoc.data().ch2U,
                 ch2V : adoc.data().ch2V,
                 ch2W : adoc.data().ch2W,
                 ch2X : adoc.data().ch2X,
                 ch2Y : adoc.data().ch2Y,
                 ch2Z : adoc.data().ch2Z,
                 ch2AA : adoc.data().ch2AA,
                 ch2AB : adoc.data().ch2AB,
                 ch2AC : adoc.data().ch2AC,
                 ch2AD : adoc.data().ch2AD,
                 ch2AE : adoc.data().ch2AE,
                 ch2AF : adoc.data().ch2AF,
                 ch2AG : adoc.data().ch2AG,
                 ch2AH : adoc.data().ch2AH,
                 ch2AI : adoc.data().ch2AI,
                 ch2AJ : adoc.data().ch2AJ,
                 ch2AK : adoc.data().ch2AK,
                 ch2AL : adoc.data().ch2AL,
                 ch2AM : adoc.data().ch2AM,
                 ch2AN : adoc.data().ch2AN,
                 ch2AO : adoc.data().ch2AO,

                 ch3A : adoc.data().ch3A,
                 ch3B : adoc.data().ch3B,
                 ch3C : adoc.data().ch3C,
                 ch3D : adoc.data().ch3D,
                 ch3E : adoc.data().ch3E,
                 ch3F : adoc.data().ch3F,
                 ch3G : adoc.data().ch3G,
                 ch3H : adoc.data().ch3H,
                 ch3I : adoc.data().ch3I,
                 ch3J : adoc.data().ch3J,
                 ch3K : adoc.data().ch3K,
                 ch3L : adoc.data().ch3L,
                 ch3M : adoc.data().ch3M,
                 ch3N : adoc.data().ch3N,
                 ch3O : adoc.data().ch3O,
                 ch3P : adoc.data().ch3P,
                 ch3Q : adoc.data().ch3Q,
                 ch3R : adoc.data().ch3R,
                 ch3S : adoc.data().ch3S,
                 ch3T : adoc.data().ch3T,
                 ch3U : adoc.data().ch3U,
                 ch3V : adoc.data().ch3V,
                 ch3W : adoc.data().ch3W,
                 ch3X : adoc.data().ch3X,
                 ch3Y : adoc.data().ch3Y,
                 ch3Z : adoc.data().ch3Z,
                 ch3AA : adoc.data().ch3AA,
                 ch3AB : adoc.data().ch3AB,
                 ch3AC : adoc.data().ch3AC,
                 ch3AD : adoc.data().ch3AD,
                 ch3AE : adoc.data().ch3AE,
                 ch3AF : adoc.data().ch3AF,
                 ch3AG : adoc.data().ch3AG,
                 ch3AH : adoc.data().ch3AH,
                 ch3AI : adoc.data().ch3AI,
                 ch3AJ : adoc.data().ch3AJ,
                 ch3AK : adoc.data().ch3AK,
                 ch3AL : adoc.data().ch3AL,
                 ch3AM : adoc.data().ch3AM,
                 ch3AN : adoc.data().ch3AN,
                 ch3AO : adoc.data().ch3AO,
     })
            })
          })
        })
      })
    })
    this.storage.get(`${this.pid}myAreaID`).then(myarea =>{
      if(myarea !== null){
       this.myAreaID = myarea
       console.log(myarea)

      }
    })
    this.loadingController.dismiss()
    })

}

getAllAreasofSubcat(){
  this.presentLoading()
  this.myAreaList = []
    this.afs.collection(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat`).get().subscribe(subsubdocs =>{
      subsubdocs.forEach(subsubdoc =>{
        this.afs.collection<any>(`boq/boq/projects/${this.pid}/buildings/${this.myBuildingID}/floors/${this.myFloorID}/cat/${this.myCatID}/subcat/${this.mySubcatID}/subsubcat/${subsubdoc.ref.id}/areas`).get().subscribe(adocs=>{
         adocs.docs.forEach(adoc =>{
            this.myAreaList.push({
                      id : adoc.ref.id,
                        catname : adoc.data().catname,
                         catid :  adoc.data().catid,
                         subcatname : adoc.data().subcatname,
                         subcatid : adoc.data().subcatid,
                         subsubcatname : adoc.data().subsubcatname,
                         subsubcatid : adoc.data().subsubcatid,
                         name : adoc.data().name,
                         floorname : adoc.data().floorname,
                         floorID : adoc.data().floorID,
                         BuildingID : adoc.data().BuildingID,
                         code : adoc.data().code,
                         image : adoc.data().image,
                         Unit_width : adoc.data().Unit_width,
                         Unit_length : adoc.data().Unit_length,
                         Unit_height : adoc.data().Unit_height,
                         No_of_units : adoc.data().No_of_units,
                         R : adoc.data().R,
                         RO : adoc.data().RO,
                         L1 : adoc.data().L1,
                         L2 : adoc.data().L2,
                         L3 : adoc.data().L3,
                         L4 : adoc.data().L4,
                         L5 : adoc.data().L5,
                         L6 : adoc.data().L6,
                         L7 : adoc.data().L7,
                         L8 : adoc.data().L8,
                         Hal_Axis : adoc.data().Hal_Axis,
                         Val_Axis : adoc.data().Val_Axis,
                         Floor_width_1 : adoc.data().Floor_width_1,
                         Floor_width_2 : adoc.data().Floor_width_2,
                         Floor_width_3 : adoc.data().Floor_width_3,
                         Floor_width_4 : adoc.data().Floor_width_4,
                         Floor_length_1 : adoc.data().Floor_length_1,
                         Floor_length_2 : adoc.data().Floor_length_2,
                         Floor_length_3 : adoc.data().Floor_length_3,
                         Floor_length_4 : adoc.data().Floor_length_4,
                         Wall_per_lengthA : adoc.data().Wall_per_lengthA,
                         Wall_per_lengthB : adoc.data().Wall_per_lengthB,
                         Wall_per_lengthC : adoc.data().Wall_per_lengthC,
                         Wall_per_lengthD : adoc.data().Wall_per_lengthD,
                         Wall_per_lengthE : adoc.data().Wall_per_lengthE,
                         Wall_per_lengthF : adoc.data().Wall_per_lengthF,
                         Wall_per_lengthG : adoc.data().Wall_per_lengthG,
                         Wall_per_lengthH : adoc.data().Wall_per_lengthH,
                         skirting_per_lengthA : adoc.data().skirting_per_lengthA,
                         skirting_per_lengthB : adoc.data().skirting_per_lengthB,
                         skirting_per_lengthC : adoc.data().skirting_per_lengthC,
                         skirting_per_lengthD : adoc.data().skirting_per_lengthD,
                         skirting_per_lengthE : adoc.data().skirting_per_lengthE,
                         skirting_per_lengthF : adoc.data().skirting_per_lengthF,
                         skirting_per_lengthG : adoc.data().skirting_per_lengthG,
                         skirting_per_lengthH : adoc.data().skirting_per_lengthH,
                         PCLA : adoc.data().PCLA,
                         PCLB : adoc.data().PCLB,
                         PCLC : adoc.data().PCLC,
                         PCLD : adoc.data().PCLD,
                         PCLE : adoc.data().PCLE,
                         PCLF : adoc.data().PCLF,
                         PCLG : adoc.data().PCLG,
                         PCLH : adoc.data().PCLH,
                         Y6 : adoc.data().Y6,
                         Y8 : adoc.data().Y8,
                         Y10 : adoc.data().Y10,
                         Y12 : adoc.data().Y12,
                         Y14 : adoc.data().Y14,
                         Y16 : adoc.data().Y16,
                         Y18 : adoc.data().Y18,
                         Y20 : adoc.data().Y20,
                         Y22 : adoc.data().Y22,
                         Y25 : adoc.data().Y25,
                         Y28 : adoc.data().Y28,
                         Y32 : adoc.data().Y32,
                         Y40 : adoc.data().Y40,
                         extraworkqqty : adoc.data().extraworkqqty,
                         extraexpansionjointqty : adoc.data().extraexpansionjointqty,
                         extrablkqty : adoc.data().extrablkqty,
                         extrablindqty : adoc.data().extrablindqty,
                         expectnoboqitem : adoc.data().expectnoboqitem,
                         areaF : adoc.data().areaF,
                         areaW : adoc.data().areaW,
                         areaC : adoc.data().areaC,
                         areaS : adoc.data().areaS,
                         areaCOR : adoc.data().areaCOR,
                         areaB : adoc.data().areaB,
                         extraBlockDPC : adoc.data().extraBlockDPC,
                         conc : adoc.data().conc,
                         shutt : adoc.data().shutt,
                         bit : adoc.data().bit,
                         polyth : adoc.data().polyth,
                         steel : adoc.data().steel,
                         exc : adoc.data().exc,
                         fill : adoc.data().fill,
                         precast : adoc.data().precast,
                         EXTRAEXP : adoc.data().EXTRAEXP,
                         EXTRACONCBO : adoc.data().EXTRACONCBO,
                         EXTRACONCB : adoc.data().EXTRACONCB,


                         ch1A : adoc.data().ch1A,
                         ch1B : adoc.data().ch1B,
                         ch1C : adoc.data().ch1C,
                         ch1D : adoc.data().ch1D,
                         ch1E : adoc.data().ch1E,
                         ch1F : adoc.data().ch1F,
                         ch1G : adoc.data().ch1G,
                         ch1H : adoc.data().ch1H,
                         ch1I : adoc.data().ch1I,
                         ch1J : adoc.data().ch1J,
                         ch1K : adoc.data().ch1K,
                         ch1L : adoc.data().ch1L,
                         ch1M : adoc.data().ch1M,
                         ch1N : adoc.data().ch1N,
                         ch1O : adoc.data().ch1O,
                         ch1P : adoc.data().ch1P,
                         ch1Q : adoc.data().ch1Q,
                         ch1R : adoc.data().ch1R,
                         ch1S : adoc.data().ch1S,
                         ch1T : adoc.data().ch1T,
                         ch1U : adoc.data().ch1U,
                         ch1V : adoc.data().ch1V,
                         ch1W : adoc.data().ch1W,
                         ch1X : adoc.data().ch1X,
                         ch1Y : adoc.data().ch1Y,
                         ch1Z : adoc.data().ch1Z,
                         ch1AA : adoc.data().ch1AA,
                         ch1AB : adoc.data().ch1AB,
                         ch1AC : adoc.data().ch1AC,
                         ch1AD : adoc.data().ch1AD,
                         ch1AE : adoc.data().ch1AE,
                         ch1AF : adoc.data().ch1AF,
                         ch1AG : adoc.data().ch1AG,
                         ch1AH : adoc.data().ch1AH,
                         ch1AI : adoc.data().ch1AI,
                         ch1AJ : adoc.data().ch1AJ,
                         ch1AK : adoc.data().ch1AK,
                         ch1AL : adoc.data().ch1AL,
                         ch1AM : adoc.data().ch1AM,
                         ch1AN : adoc.data().ch1AN,
                         ch1AO : adoc.data().ch1AO,

                         ch2A : adoc.data().ch2A,
                         ch2B : adoc.data().ch2B,
                         ch2C : adoc.data().ch2C,
                         ch2D : adoc.data().ch2D,
                         ch2E : adoc.data().ch2E,
                         ch2F : adoc.data().ch2F,
                         ch2G : adoc.data().ch2G,
                         ch2H : adoc.data().ch2H,
                         ch2I : adoc.data().ch2I,
                         ch2J : adoc.data().ch2J,
                         ch2K : adoc.data().ch2K,
                         ch2L : adoc.data().ch2L,
                         ch2M : adoc.data().ch2M,
                         ch2N : adoc.data().ch2N,
                         ch2O : adoc.data().ch2O,
                         ch2P : adoc.data().ch2P,
                         ch2Q : adoc.data().ch2Q,
                         ch2R : adoc.data().ch2R,
                         ch2S : adoc.data().ch2S,
                         ch2T : adoc.data().ch2T,
                         ch2U : adoc.data().ch2U,
                         ch2V : adoc.data().ch2V,
                         ch2W : adoc.data().ch2W,
                         ch2X : adoc.data().ch2X,
                         ch2Y : adoc.data().ch2Y,
                         ch2Z : adoc.data().ch2Z,
                         ch2AA : adoc.data().ch2AA,
                         ch2AB : adoc.data().ch2AB,
                         ch2AC : adoc.data().ch2AC,
                         ch2AD : adoc.data().ch2AD,
                         ch2AE : adoc.data().ch2AE,
                         ch2AF : adoc.data().ch2AF,
                         ch2AG : adoc.data().ch2AG,
                         ch2AH : adoc.data().ch2AH,
                         ch2AI : adoc.data().ch2AI,
                         ch2AJ : adoc.data().ch2AJ,
                         ch2AK : adoc.data().ch2AK,
                         ch2AL : adoc.data().ch2AL,
                         ch2AM : adoc.data().ch2AM,
                         ch2AN : adoc.data().ch2AN,
                         ch2AO : adoc.data().ch2AO,

                         ch3A : adoc.data().ch3A,
                         ch3B : adoc.data().ch3B,
                         ch3C : adoc.data().ch3C,
                         ch3D : adoc.data().ch3D,
                         ch3E : adoc.data().ch3E,
                         ch3F : adoc.data().ch3F,
                         ch3G : adoc.data().ch3G,
                         ch3H : adoc.data().ch3H,
                         ch3I : adoc.data().ch3I,
                         ch3J : adoc.data().ch3J,
                         ch3K : adoc.data().ch3K,
                         ch3L : adoc.data().ch3L,
                         ch3M : adoc.data().ch3M,
                         ch3N : adoc.data().ch3N,
                         ch3O : adoc.data().ch3O,
                         ch3P : adoc.data().ch3P,
                         ch3Q : adoc.data().ch3Q,
                         ch3R : adoc.data().ch3R,
                         ch3S : adoc.data().ch3S,
                         ch3T : adoc.data().ch3T,
                         ch3U : adoc.data().ch3U,
                         ch3V : adoc.data().ch3V,
                         ch3W : adoc.data().ch3W,
                         ch3X : adoc.data().ch3X,
                         ch3Y : adoc.data().ch3Y,
                         ch3Z : adoc.data().ch3Z,
                         ch3AA : adoc.data().ch3AA,
                         ch3AB : adoc.data().ch3AB,
                         ch3AC : adoc.data().ch3AC,
                         ch3AD : adoc.data().ch3AD,
                         ch3AE : adoc.data().ch3AE,
                         ch3AF : adoc.data().ch3AF,
                         ch3AG : adoc.data().ch3AG,
                         ch3AH : adoc.data().ch3AH,
                         ch3AI : adoc.data().ch3AI,
                         ch3AJ : adoc.data().ch3AJ,
                         ch3AK : adoc.data().ch3AK,
                         ch3AL : adoc.data().ch3AL,
                         ch3AM : adoc.data().ch3AM,
                         ch3AN : adoc.data().ch3AN,
                         ch3AO : adoc.data().ch3AO,
             })
          })
        })
      })
      this.storage.get(`${this.pid}myAreaID`).then(myarea =>{
        if(myarea !== null){
         this.myAreaID = myarea
  
        }
      })
      this.loadingController.dismiss()
    })

}


addtoareaList(item){
if(this.myAreaID.includes(item)){
  const index = this.myAreaID.findIndex(x => x == item)
  this.myAreaID.splice(index, 1)
}else{
  this.myAreaID.push(item)
}

}

addtoitemsList(item){
  if(this.boqitem.includes(item)){
    const index = this.myAreaID.findIndex(x => x.id == item.id)
    this.boqitem.splice(index, 1)
  }else{
    this.boqitem.push(item)
  }
  
  }
selectallAreas(){
if(this.allareaflag){
  console.log("IF")

  this.myAreaID = [];
  this.myAreaList.forEach(element =>{
    element.flag = false;
  })
}else{
  console.log("ELSE")

  this.myAreaList.forEach(element =>{
    element.flag = true;
    this.myAreaID.push(element.buildingid+'/'+element.floorid+'/'+element.id)
  })
}
}

addtoitemList(item){
  if(this.myAreaID.includes(item)){
    const index = this.myAreaID.findIndex(x => x == item)
    this.myAreaID.splice(index, 1)
  }else{
    this.myAreaID.push(item)
  }
}

async editArea(item){
    const modal = await this.modalController.create({
    component: EditareasPage,
    componentProps: {
       area: item,
       pid : this.pid
       }
    });
  
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      this.myAreaList = [];
      this.refresharea()

    })
}


async editItem(item){
  const modal = await this.modalController.create({
    component: EdititemsPage,
    componentProps: {
       item: item,
       pid : this.pid
       }
    });
  
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      this.myItemsList = [];
      if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
        this.getAllItemsofBuilding()
      }
      else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
        this.getAllItemsofFloor()
      }
      else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
        this.getAllItemsofCat()
      }
      else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
        this.getAllItemsofSubcat()
      }
      else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
        this.getAllItemsofSubsubcat()
      }else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
        this.getAllItems()
      }

    })
}
async gototable(item){
  const modal = await this.modalController.create({
    component: FinalqtytablePage,
    componentProps: {
       item: item,
       pid : this.pid
       }
    });
  
    await modal.present();
}

async editVariation(item){
  const modal = await this.modalController.create({
    component: EditvaritiondetailsPage,
    componentProps: {
       item: item,
       pid : this.pid
       }
    });
  
    await modal.present();
    await modal.onDidDismiss().then(()=>{
     this.refreshVariation()

    })
}

async delItem(item){

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to delete is Item</strong>?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: async () => {
        
  const loading = await this.loadingController.create({
    message: 'Deleting...',
    duration: 20000,
    spinner: 'bubbles'
  });
  await loading.present();
this.afs.doc(`boq/boq/projects/${this.pid}/boqitems/${item.id}`).delete()
  .then(async ()=>{
    this.myItemsList = [];
    if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllItemsofBuilding()
    }
    else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllItemsofFloor()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllItemsofCat()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
      this.getAllItemsofSubcat()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
      this.getAllItemsofSubsubcat()
    }else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllItems()
    }
    loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Deleted Successfully!',
        buttons: ['OK']
      });
    
      await alert.present();

  })
        }
      }
    ]
  });

  await alert.present();

}
async delVariation(item){

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to delete is Variation</strong>?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: async () => {
        
  const loading = await this.loadingController.create({
    message: 'Deleting...',
    duration: 20000,
    spinner: 'bubbles'
  });
  await loading.present();
this.afs.doc(`boq/boq/projects/${this.pid}/variations/${item.id}`).delete()
  .then(async ()=>{
       this.refreshVariation()
    loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Deleted Successfully!',
        buttons: ['OK']
      });
    
      await alert.present();

  })
        }
      }
    ]
  });

  await alert.present();

}

async delOpen(item){

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to delete is Item</strong>?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: async () => {
        
  const loading = await this.loadingController.create({
    message: 'Deleting...',
    duration: 20000,
    spinner: 'bubbles'
  });
  await loading.present();
this.afs.doc(`boq/boq/projects/${this.pid}/openings/${item.id}`).delete()
  .then(async ()=>{
    this.myopeningsList = []
    if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllOpeningsofBuilding()
    }
    else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllOpensofFloor()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllOpeningofCat()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
      this.getAllOpeningofSubcat()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
      this.getAllOpeningofSubsubcat()
    }else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllOpenings()
    }
    loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Deleted Successfully!',
        buttons: ['OK']
      });
    
      await alert.present();

  })
        }
      }
    ]
  });

  await alert.present();

}

async delprojection(item){

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to delete is Item</strong>?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: async () => {
        
  const loading = await this.loadingController.create({
    message: 'Deleting...',
    duration: 20000,
    spinner: 'bubbles'
  });
  await loading.present();
this.afs.doc(`boq/boq/projects/${this.pid}/projections/${item.id}`).delete()
  .then(async ()=>{
    if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllprojectionsofBuilding()
    }
    else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllprojectionsofFloor()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllprojectionofCat()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
      this.getAllprojectionofSubcat()
    }
    else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
      this.getAllprojectionofSubsubcat()
    }else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
      this.getAllprojections()
    }
    loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Deleted Successfully!',
        buttons: ['OK']
      });
    
      await alert.present();

  })
        }
      }
    ]
  });

  await alert.present();

}

async delarea(aitem){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete is area</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
          
    const loading = await this.loadingController.create({
      message: 'Deleting...',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();
    this.afs.doc(`boq/boq/projects/${this.pid}/buildings/${aitem.BuildingID}/floors/${aitem.floorID}/cat/${aitem.catid}/subcat/${aitem.subcatid}/subsubcat/${aitem.subsubcatid}/areas/${aitem.id}`).delete()
    .then(()=>{
      this.afs.collection(`boq/boq/projects/${this.pid}/boqitems/`, ref => ref.where("areaID", "==", aitem.id)).get().subscribe(value=>{
        value.docs.forEach(element =>{
          this.afs.doc(`boq/boq/projects/${this.pid}/boqitems/${element.ref.id}`).delete()
        })
      })
    })
    .then(async ()=>{
      this.myAreaList = [];
      this.refresharea()
      loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Deleted Successfully!',
          buttons: ['OK']
        });
      
        await alert.present();

    })
          }
        }
      ]
    });
  
    await alert.present();

}


async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Please wait...',
    duration: 5000,
    spinner: 'bubbles'
  });
  await loading.present();
}

refresharea(){
  if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
    this.getAllAreasofBuildings()
  }
  else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
    this.getAllAreasofFloors()
  }
  else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
    this.getAllAreasofCat()
  }
  else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
    this.getAllAreasofSubcat()
  }
  else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
    this.getArea()
  }
}

checkOMM(){
  if(this.varexisting == "true"){
    this.varexisting1 = "false"
  }
}
checkOMM1(){
  if(this.varexisting1 == "true"){
    this.varexisting = "false"
  }
}

refreshVariation(){
  if(this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
    this.getAllVariationsofBuilding()
  }
  else if(this.myBuildingID && this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
    this.getAllVariationsofFloor()
  }
  else if(this.myBuildingID && this.myFloorID && this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
    this.getAllVariationsofCat()
  }
  else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && !this.mySubsubcatID){
    this.getAllVariationsofSubcat()
  }
  else if(this.myBuildingID && this.myFloorID && this.myCatID && this.mySubcatID && this.mySubsubcatID){
    this.getAllVariationsofSubsubcat()
  }else if(!this.myBuildingID && !this.myFloorID && !this.myCatID && !this.mySubcatID && !this.mySubsubcatID){
    this.getAllVariations()
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
  steelpercentage,QTY,ifactor){
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
  
}

calculateFill(L,W,H,EXTRA_FILL,N,FILL_PERCENTAGE){
   return (((L*W*H)+ EXTRA_FILL)*N*FILL_PERCENTAGE/100)
  }
calculateExcavation(L,W,H,N,EXTRA_EXC,E_PERCENTAGE){
     return (((L*W*H)+ EXTRA_EXC)*N*E_PERCENTAGE/100)
  }
  calculateFloor(L,W,N,R,RO,pww1,psw1,pww2,psw2,pwl1,psl1,pwl2,psl2,Sum_of_Areafloor_p,EXTRA_FLOOR_AREA,F_Percentage){
     return (((W*L+(R*R*RO*(22/7)/100)+(pww1*psw1)+(pww2*psw2)+(pwl1*psl1)+(pwl2*psl2))-(Sum_of_Areafloor_p/100)+EXTRA_FLOOR_AREA)*F_Percentage*N/100)
    }
    calculateBlockDPC(N,L1,L2,L3,L4,L5,L6,L7,L8,EXTRA_BLOCK_DPC,DPC_PERCENTAGE){
       return (((L1+L2+L3+L4+L5+L6+L7+L8+EXTRA_BLOCK_DPC)*N*DPC_PERCENTAGE)/100)
      }
      calculateCeiling(L,W,N,R,RO,pww1,psw1,pww2,psw2,pwl1,psl1,pwl2,psl2,SumofAreaCEILING_P,EXTRAceilingAREA,CPercentage){
         return ((((W*L+(R*R*RO*(22/7))/100+pww1*psw1+pww2*psw2+pwl1*psl1+pwl2*psl2)-(SumofAreaCEILING_P/100)+EXTRAceilingAREA)*CPercentage)*N/100)
        }
        calculateWall(H,N,L1,L2,L3,L4,L5,L6,L7,L8,PWLA,PWLB,PWLC,PWLD,PWLE,PWLF,PWLG,PWLH,SumofAreawallp,EXTRAWALLAREA,SUMOFOPENAREA,Wpercentage){
           return ((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD+L5*PWLE+L6*PWLF+L7*PWLG+L8*PWLH)*H/100)+(SumofAreawallp/100)+EXTRAWALLAREA-SUMOFOPENAREA)*Wpercentage*N/100)
          }
          calculateCornice(N,L1,L2,L3,L4,L5,L6,L7,L8,PCLA,PCLB,PCLC,PCLD,PCLE,PCLF,PCLG,PCLH,SumofLengthcornicep,EXTRACORNICELENGTH,CORpercentage){
             return ((((L1*PCLA+L2*PCLB+L3*PCLC+L4*PCLD+L5*PCLE+L6*PCLF+L7*PCLG+L8*PCLH)/100)+(SumofLengthcornicep/100)+EXTRACORNICELENGTH)*CORpercentage*N/100)
            }
            calculateSkirting(N,L1,L2,L3,L4,L5,L6,L7,L8,PSLA,PSLB,PSLC,PSLD,PSLE,PSLF,PSLG,PSLH,SumofLengthskirtingp,EXTRASKIRTINGLENGTH,sumofOpenwidthtotal,Spercentage){
               return ((((L1*PSLA+L2*PSLB+L3*PSLC+L4*PSLD+L5*PSLE+L6*PSLF+L7*PSLG+L8*PSLH)/100)+(SumofLengthskirtingp/100)+EXTRASKIRTINGLENGTH-sumofOpenwidthtotal)*Spercentage*N/100)
              }
              calculateBlock(H,N,L1,L2,L3,L4,L5,L6,L7,L8,PWLA,PWLB,PWLC,PWLD,PWLE,PWLF,PWLG,PWLH,SUMOFOPENAREA,EXTRABLOCKAREA,BPERCENTAGE){
                 return ((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD+L5*PWLE+L6*PWLF+L7*PWLG+L8*PWLH)*H/100)+EXTRABLOCKAREA-SUMOFOPENAREA)*N*BPERCENTAGE/100)
                }
                calculateBlockbitpaint(N,L1,L2,L3,L4,PWLA,PWLB,PWLC,PWLD,SUMOFOPENAREA,EXTRABIT,BBITPERCENTAGE){
                   return (((((L1*PWLA+L2*PWLB+L3*PWLC+L4*PWLD)+ EXTRABIT-SUMOFOPENAREA)*N*BBITPERCENTAGE/(0.5)))/100)
                  }
                  calculateConcrete(L,W,H,N,EXTRACONC,CONCPERCENTAGE){
                     return (((L*W*H)+EXTRACONC)*N*CONCPERCENTAGE/100)
                    }
                    calculateBlinding(L,W,N,EXTRACONCbO,EXTRACONCb,CONCbPERCENTAGE){
                       return (((L+2*EXTRACONCbO)*(W+2*EXTRACONCbO)+EXTRACONCb)*N*CONCbPERCENTAGE/100)
                      }
                      calculateFormwork(L,W,H,N,BSP,TSP,SSP3,SSP4,SSP2,EXTRASHUTT,w,SSP1,FORMPERCENTAGE){
                         return ((W*L*(BSP/100)+W*L*(TSP/100)+H*L*(SSP3/100)+H*L*(SSP4/100)+H*W*(SSP2/100)+ w*H*(SSP1/100)+ EXTRASHUTT)*N*FORMPERCENTAGE/100)
                        }
                        calculateBitpaint(L,W,H,N,EXTRABIT,w,TBP,BBP,SBP4,SBP3,SBP2,SBP1,BITPERCENTAGE){
                           return ((W*L*(TBP/100)+W*L*(BBP/100)+H*L*(SBP4/100)+H*L*(SBP3/100)+H*W*(SBP2/100)+ w*H*(SBP1/100)+ EXTRABIT)*N*BITPERCENTAGE/100)
                          }
                          calculateExpansionjoints(L,W,H,N,w,BEP,TEP,SEP3,SEP4,SEP2,EXTRAEXP,SEP1,EXPPERCENTAGE){
                             return ((W*L*(BEP/100)+W*L*(TEP/100)+H*L*(SEP3/100)+H*L*(SEP4/100)+H*W*(SEP2/100)+ w*H*(SEP1/100)+ EXTRAEXP)*N*EXPPERCENTAGE/100)
                            }
                            calculatePrecast(L,W,N,precastPercentage,EXTRAPRECAST){
                               return (((W*L)+ EXTRAPRECAST)*precastPercentage*N/100)
                              }
                              calculatePolythene(L,W,H,N,w,TpP,BpP,SpP4,SpP3,SpP1,EXTRAPOLYTH,SpP2,polyPERCENTAGE){
                                 return ((W*L*(TpP/100)+W*L*(BpP/100)+H*L*(SpP4/100)+H*L*(SpP3/100)+H*W*(SpP1/100)+ w*H*(SpP2/100)+ EXTRAPOLYTH)*N*polyPERCENTAGE/100 )
                                }
                                calculateSteel(Y8R,Y10R,Y12R,Y16R,Y20R,Y25R,Y32R,EXTRASTEEL,steelpercentage){
                                   return ((Y8R/2520)+(Y10R/1596)+(Y12R/1104)+(Y16R/624)+(Y20R/396)+(Y25R/252)+(Y32R/156)+(EXTRASTEEL))*(steelpercentage/100)
                                  }
                                  calculateIndividualqty(N,QTY,ifactor){
                                     return (QTY*N*ifactor/100)
                                    }
gotocostdetails(){
  this.router.navigate(['costdetails'])
                }
                async Uploadexcel(){
                  if(this.datatable.length >0){
                    const loading = await this.loadingController.create({
                      message: 'Adding...',
                      duration: 20000,
                      spinner: 'bubbles'
                    });
                    await loading.present();
                    this.datatable.forEach(ele =>{
                      const id = this.afs.createId()
                      this.afs.doc(`boq/boq/projects/${this.pid}/excelboqitems/${id}`).set({
                        id: id,
                        code : ele[0],
                        cat : ele[1].toUpperCase(),
                        subcat : ele[2].toUpperCase(),
                        subsubcat : ele[3].toUpperCase(),
                        des: ele[4],
                        qty: ele[5],
                        unit: ele[6],
                        rate: ele[7],
                        amount: ele[8],
                        material: ele[9],
                        labour: ele[10],
                        equipment: ele[11],
                        subcontractor: ele[12],
                        other: ele[13],
                        arate : 0,
                        aamount :0,
                        amaterial : 0,
                        alabour : 0,
                        aequipment : 0,
                        asubcontractor : 0,
                        aother : 0,
                        aqty : 0,
                      }).then((value)=>{
                        var cat = ele[1].toUpperCase();
                        this.afs.collection(`boq/boq/projects/${this.pid}/excelboqitemscat`, ref => ref.where("name","==", cat)).get().subscribe(value=>{
                          if(value.docs.length <= 0){
                            this.afs.collection(`boq/boq/projects/${this.pid}/excelboqitemscat`).add({
                              name : cat
                            })
                          }
                        })

                      }).then(()=>{
                        var subcat = ele[2].toUpperCase();
                        this.afs.collection(`boq/boq/projects/${this.pid}/excelboqitemssubcat`, ref => ref.where("name","==", subcat)).get().subscribe(value=>{
                          if(value.docs.length <= 0){
                            this.afs.collection(`boq/boq/projects/${this.pid}/excelboqitemssubcat`).add({
                              name : subcat,
                              cat : ele[1].toUpperCase()
                            })
                          }
                        })
                      }).then(()=>{
                        var subsubcat = ele[3].toUpperCase();
                        this.afs.collection(`boq/boq/projects/${this.pid}/excelboqitemssubsubcat`, ref => ref.where("name","==", subsubcat)).get().subscribe(value=>{
                          if(value.docs.length <= 0){
                            this.afs.collection(`boq/boq/projects/${this.pid}/excelboqitemssubsubcat`).add({
                              name : subsubcat,
                              cat : ele[1].toUpperCase(),
                              subcat : ele[2].toUpperCase()
                            })
                          }
                        })
                      }).catch(async err =>{
                        const alert = await this.alertController.create({
                          header: 'Error',
                          message: err,
                          buttons: ['OK']
                        });
                      
                        await alert.present();
                      })
                    }) 
                    loading.dismiss()
                      const alert = await this.alertController.create({
                        header: 'Added',
                        message: 'Successfully Added!.',
                        buttons: ['OK']
                      });
                    
                      await alert.present();
                     this.getexcelitems()
                  }else{
                    alert("No data to upload, Please add File to upload data.")
                  }
                }
              
              
                onFileChange(evt: any) {
                  const target : DataTransfer =  <DataTransfer>(evt.target);
                  
                  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
              
                  const reader: FileReader = new FileReader();
              
                  reader.onload = (e: any) => {
                    const bstr: string = e.target.result;
              
                    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
              
                    const wsname : string = wb.SheetNames[0];
              
                    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
              
                    console.log(ws);
              
                    this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
              
                    console.log(this.data);
              
                    this.datatable = this.data.slice(1);
                
              
                  };
              
                  reader.readAsBinaryString(target.files[0]);
              
                }

                getexcelitems(){
                  this.excelitemList = [];
                  this.afs.collection(`boq/boq/projects/${this.pid}/excelboqitems`).get().subscribe(value =>{
                     value.docs.forEach(element =>{
                       this.excelitemList.push({
                        id : element.data().id,
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
                       })
                     })
                  })
                }
async delexcelItem(item){

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to delete this Item</strong>?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: async () => {
        
  const loading = await this.loadingController.create({
    message: 'Deleting...',
    duration: 20000,
    spinner: 'bubbles'
  });
  await loading.present();
this.afs.doc(`boq/boq/projects/${this.pid}/excelboqitems/${item.id}`).delete()
  .then(async ()=>{
    this.getexcelitems();
    loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Deleted Successfully!',
        buttons: ['OK']
      });
    
      await alert.present();

  })
        }
      }
    ]
  });

  await alert.present();

}  
editexcelItem(item){
  
}

async opencalculator(variable){
  const modal = await this.modalController.create({
  component: CalculatorPage,
  componentProps: { usedvar: variable }
  });

  await modal.present();

  const data = await modal.onDidDismiss();
  console.log(data)
  if(data.data.value != 0){
    if(data.data.variable == "Unit_width"){
      this.Unit_width = data.data.value
    }
  }
}

async openShapePics(){
    const modal = await this.modalController.create({
    component: TypespicPage,
    });
  
    await modal.present();
  
}

async openRingShapePics(){
  const modal = await this.modalController.create({
  component: TypespicPage,
  componentProps: { segment: "ring" }
  });

  await modal.present();

}

calculationFloorBeam(){
  var shape1 = 0;
  var shape2 = 0;
  var shape3 = 0;
  var shape4 = 0;
  var shape5 = 0;
  var shape6 = 0;
  var shape7 = 0;
  var shape8 = 0;
  var Totallengthofrings = 0;
  var NoofringsMIDDLETHIRD = 0;
  var NoofringsOTHERTHIRDRIGHTLEFT = 0;
  var c19 = 0;
  var c21 = 0;
  var c27 = 0;
  var c29 = 0;
  var c31 = 0;
  var c33 = 0;
  var c35 = 0;
  var c37 = 0;
  var c39 = 0;
  var c41 = 0;
  var c43 = 0;
  var f27 = 0;
  var f29 = 0;
  var f31 = 0;
  var f33 = 0;
  var f35 = 0;
  var f37 = 0;
  var f39 = 0;
  var f41 = 0;
  var f43 = 0;
  var p1_1 = 0;
  var p1_2 = 0;
  var p1_3 = 0;
  var p1_4 = 0;
  var p1_5 = 0;
  var p1_6 = 0;
  var p1_7 = 0;
  var p1_8 = 0;
  var p1_9 = 0;
  var p1_10 = 0;
  var p1_11 = 0;
  var p1_12 = 0;
  var p1_13 = 0;
  var p1_14 = 0;
  var p1_15 = 0;
  var p1_16 = 0;
  var p1_17 = 0;
  var p1_18 = 0;
  var p1_19 = 0;
  var p1_20 = 0;
  var p1_21 = 0;
  var p1_22 = 0;
  var p1_23 = 0;
  var p1_24 = 0;
  var p1_25 = 0;

  var p2_1 = 0;
  var p2_2 = 0;
  var p2_3 = 0;
  var p2_4 = 0;
  var p2_5 = 0;
  var p2_6 = 0;
  var p2_7 = 0;
  var p2_8 = 0;
  var p2_9 = 0;
  var p2_10 = 0;
  var p2_11 = 0;
  var p2_12 = 0;
  var p2_13 = 0;
  var p2_14 = 0;
  var p2_15 = 0;
  var p2_16 = 0;
  var p2_17 = 0;
  var p2_18 = 0;
  var p2_19 = 0;
  var p2_20 = 0;
  var p2_21 = 0;
  var p2_22 = 0;
  var p2_23 = 0;
  var p2_24 = 0;
  var p2_25 = 0;

  var SteelringatcenterI19 = 0;
  var SteelringatcenterJ19 = 0;
  var SteelringatcenterK19 = 0;
  var SteelringatcenterL19 = 0;
  var SteelringatcenterM19 = 0;
  var SteelringatcenterN19 = 0;
  var SteelringatcenterO19 = 0;
  var SteelringatcenterP19 = 0;
  var SteelringatcenterQ19 = 0;
  var SteelringatcenterR19 = 0;
  var SteelringatcenterS19 = 0;
  var SteelringatcenterT19 = 0;
  var SteelringatcenterU19 = 0;

  var SteelringatthirdI21 = 0;
  var SteelringatthirdJ21 = 0;
  var SteelringatthirdK21 = 0;
  var SteelringatthirdL21 = 0;
  var SteelringatthirdM21 = 0;
  var SteelringatthirdN21 = 0;
  var SteelringatthirdO21 = 0;
  var SteelringatthirdP21 = 0;
  var SteelringatthirdQ21 = 0;
  var SteelringatthirdR21 = 0;
  var SteelringatthirdS21 = 0;
  var SteelringatthirdT21 = 0;
  var SteelringatthirdU21 = 0;

  var presumSteelringI = 0;
  var presumSteelringJ = 0;
  var presumSteelringK = 0;
  var presumSteelringL = 0;
  var presumSteelringM = 0;
  var presumSteelringN = 0;
  var presumSteelringO = 0;
  var presumSteelringP = 0;
  var presumSteelringQ = 0;
  var presumSteelringR = 0;
  var presumSteelringS = 0;
  var presumSteelringT = 0;
  var presumSteelringU = 0;
  var sumSteelring = 0;

  var pre6 = 0;
  var pre8 = 0;
  var pre10 = 0;
  var pre12 = 0;
  var pre14 = 0;
  var pre16 = 0;
  var pre18 = 0;
  var pre20 = 0;
  var pre22 = 0;
  var pre25 = 0;
  var pre28 = 0;
  var pre32 = 0;
  var pre40 = 0;

  var type1 = 0;
  var type2 = 0;
  var type3 = 0;
  var type4 = 0;

  var type1_6 = 0;
  var type1_8 = 0;
  var type1_10 = 0;
  var type1_12 = 0;
  var type1_14 = 0;
  var type1_16 = 0;
  var type1_18 = 0;
  var type1_20 = 0;
  var type1_22 = 0;
  var type1_25 = 0;
  var type1_28 = 0;
  var type1_32 = 0;
  var type1_40 = 0;

  var type2_6 = 0;
  var type2_8 = 0;
  var type2_10 = 0;
  var type2_12 = 0;
  var type2_14 = 0;
  var type2_16 = 0;
  var type2_18 = 0;
  var type2_20 = 0;
  var type2_22 = 0;
  var type2_25 = 0;
  var type2_28 = 0;
  var type2_32 = 0;
  var type2_40 = 0;

  var type3_6 = 0;
  var type3_8 = 0;
  var type3_10 = 0;
  var type3_12 = 0;
  var type3_14 = 0;
  var type3_16 = 0;
  var type3_18 = 0;
  var type3_20 = 0;
  var type3_22 = 0;
  var type3_25 = 0;
  var type3_28 = 0;
  var type3_32 = 0;
  var type3_40 = 0;

  var type4_6 = 0;
  var type4_8 = 0;
  var type4_10 = 0;
  var type4_12 = 0;
  var type4_14 = 0;
  var type4_16 = 0;
  var type4_18 = 0;
  var type4_20 = 0;
  var type4_22 = 0;
  var type4_25 = 0;
  var type4_28 = 0;
  var type4_32 = 0;
  var type4_40 = 0;



  var ExtraI = 0;
  var ExtraJ = 0;
  var ExtraK = 0;
  var ExtraL = 0;
  var ExtraM = 0;
  var ExtraN = 0;
  var ExtraO = 0;
  var ExtraP = 0;
  var ExtraQ = 0;
  var ExtraR = 0;
  var ExtraS = 0;
  var ExtraT = 0;
  var ExtraU = 0;


  var part2_type1_6 = 0;
  var part2_type1_8 = 0;
  var part2_type1_10 = 0;
  var part2_type1_12 = 0;
  var part2_type1_14 = 0;
  var part2_type1_16 = 0;
  var part2_type1_18 = 0;
  var part2_type1_20 = 0;
  var part2_type1_22 = 0;
  var part2_type1_25 = 0;
  var part2_type1_28 = 0;
  var part2_type1_32 = 0;
  var part2_type1_40 = 0;

  var part2_type2_6 = 0;
  var part2_type2_8 = 0;
  var part2_type2_10 = 0;
  var part2_type2_12 = 0;
  var part2_type2_14 = 0;
  var part2_type2_16 = 0;
  var part2_type2_18 = 0;
  var part2_type2_20 = 0;
  var part2_type2_22 = 0;
  var part2_type2_25 = 0;
  var part2_type2_28 = 0;
  var part2_type2_32 = 0;
  var part2_type2_40 = 0;

  var part2_type3_6 = 0;
  var part2_type3_8 = 0;
  var part2_type3_10 = 0;
  var part2_type3_12 = 0;
  var part2_type3_14 = 0;
  var part2_type3_16 = 0;
  var part2_type3_18 = 0;
  var part2_type3_20 = 0;
  var part2_type3_22 = 0;
  var part2_type3_25 = 0;
  var part2_type3_28 = 0;
  var part2_type3_32 = 0;
  var part2_type3_40 = 0;

  var part2_type4_6 = 0;
  var part2_type4_8 = 0;
  var part2_type4_10 = 0;
  var part2_type4_12 = 0;
  var part2_type4_14 = 0;
  var part2_type4_16 = 0;
  var part2_type4_18 = 0;
  var part2_type4_20 = 0;
  var part2_type4_22 = 0;
  var part2_type4_25 = 0;
  var part2_type4_28 = 0;
  var part2_type4_32 = 0;
  var part2_type4_40 = 0;



  var ExtraY = 0;
  var ExtraZ = 0;
  var ExtraAA = 0;
  var ExtraAB = 0;
  var ExtraAC = 0;
  var ExtraAD = 0;
  var ExtraAE = 0;
  var ExtraAF = 0;
  var ExtraAG = 0;
  var ExtraAH = 0;
  var ExtraAI = 0;
  var ExtraAJ = 0;
  var ExtraAK = 0;

  var I = 0.222;
  var J = 0.395;
  var K = 0.616;
  var L = 0.888;
  var M = 1.208;
  var N = 1.579;
  var O = 1.997;
  var P = 2.466;
  var Q = 2.984;
  var R = 3.854;
  var S = 4.833;
  var T = 6.313;
  var U = 9.864;


  if(this.Unit_width > 0 && this.Unit_height>0 && this.Unit_length && this.ch1C>0){
    shape1 = (this.Unit_width+this.Unit_height+this.Unit_width+this.Unit_height-0.15)*1
  }
  if(this.Unit_width > 0 && this.Unit_height>0 && this.Unit_length && this.ch1C>0){
    shape2 = (this.Unit_width+this.Unit_height+2*this.Unit_width+this.Unit_height-0.08)*1
  }
  if(this.Unit_width > 0 && this.Unit_height>0 && this.Unit_length && this.ch1C>0){
    shape3 = (1.7*this.Unit_height+4*this.Unit_width+this.Unit_height-0.15)*1
  }
  if(this.Unit_width > 0 && this.Unit_height>0 && this.Unit_length && this.ch1C>0){
    shape4 = (1.7*this.Unit_width+2*this.Unit_height+this.Unit_height-0.05)*1
  }
  if(this.Unit_width > 0 && this.Unit_height>0 && this.Unit_length && this.ch1C>0){
    shape5 = (5*this.Unit_width+4*this.Unit_height-0.08)*1
  }
  if(this.Unit_width > 0 && this.Unit_height>0 && this.Unit_length && this.ch1C>0){
    shape6 = (5*this.Unit_width+5*this.Unit_height-0.08)*1
  }
  if(this.Unit_width > 0 && this.Unit_height>0 && this.Unit_length && this.ch1C>0){
    shape7 = (6*this.Unit_width+5.6*this.Unit_height-0.08)*1
  }
  if(this.No_of_units > 0 && this.Unit_height>0 && this.Unit_width>0 && this.Unit_length && this.ch1H>0&&this.ch1I>0&&this.ch1J>0){
    shape8 = ((((this.No_of_units/this.ch1H) * (this.Unit_width-0.08))+ ((this.Unit_width/this.ch1I)+1)*(this.No_of_units-0.08))+0.08*this.ch1J)*1
  }
  if(this.ch1G == 1){
    Totallengthofrings =shape1
  }
  else if(this.ch1G == 2){
    Totallengthofrings =shape2
  }
  else if(this.ch1G == 3){
    Totallengthofrings =shape3
  }
  else if(this.ch1G == 4){
    Totallengthofrings =shape4
  }
  else if(this.ch1G == 5){
    Totallengthofrings =shape5
  }
  else if(this.ch1G == 6){
    Totallengthofrings =shape6
  }
  else if(this.ch1G == 7){
    Totallengthofrings =shape7
  }
  else if(this.ch1G == 8){
    Totallengthofrings =shape8
  }

  if(this.Unit_width>0&&this.Unit_length>0&&this.Unit_height>0&&this.ch1C>0){
    NoofringsMIDDLETHIRD = 1000/this.ch1C
  }
  if(this.Unit_width>0&&this.Unit_length>0&&this.Unit_height>0&&this.ch1E>0){
    NoofringsOTHERTHIRDRIGHTLEFT = 1000/this.ch1E
  }

  // ##############C19#############
  if(this.ch1D == 6){
    c19=0.222
  }
  else if(this.ch1D == 8){
   c19=0.395
  }
  else if(this.ch1D == 10){
    c19=0.617
   }
   else if(this.ch1D == 12){
    c19=0.858
   }
   else if(this.ch1D == 14){
    c19=1.209
   }
   else if(this.ch1D == 16){
    c19=1.579
   }
   else if(this.ch1D == 18){
    c19=1.998
   }
   else if(this.ch1D == 20){
    c19=2.467
   } 
   else if(this.ch1D == 22){
    c19=2.985
   }
   else if(this.ch1D == 25){
    c19=3.855
   }
   else if(this.ch1D == 28){
    c19=4.836
   }
   else if(this.ch1D == 32){
    c19=6.316
   }
   else if(this.ch1D == 40){
    c19=9.869
   }

     // ##############C21#############
  if(this.ch1F == 6){
    c21=0.222
  }
  else if(this.ch1F == 8){
   c21=0.395
  }
  else if(this.ch1F == 10){
    c21=0.617
   }
   else if(this.ch1F == 12){
    c21=0.858
   }
   else if(this.ch1F == 14){
    c21=1.209
   }
   else if(this.ch1F == 16){
    c21=1.579
   }
   else if(this.ch1F == 18){
    c21=1.998
   }
   else if(this.ch1F == 20){
    c21=2.467
   } 
   else if(this.ch1F == 22){
    c21=2.985
   }
   else if(this.ch1F == 25){
    c21=3.855
   }
   else if(this.ch1F == 28){
    c21=4.836
   }
   else if(this.ch1F == 32){
    c21=6.316
   }
   else if(this.ch1F == 40){
    c21=9.869
   }


        // ##############C27#############
  if(this.ch1L == 6){
    c27=0.222
  }
  else if(this.ch1L == 8){
   c27=0.395
  }
  else if(this.ch1L == 10){
    c27=0.617
   }
   else if(this.ch1L == 12){
    c27=0.858
   }
   else if(this.ch1L == 14){
    c27=1.209
   }
   else if(this.ch1L == 16){
    c27=1.579
   }
   else if(this.ch1L == 18){
    c27=1.998
   }
   else if(this.ch1L == 20){
    c27=2.467
   } 
   else if(this.ch1L == 22){
    c27=2.985
   }
   else if(this.ch1L == 25){
    c27=3.855
   }
   else if(this.ch1L == 28){
    c27=4.836
   }
   else if(this.ch1L == 32){
    c27=6.316
   }
   else if(this.ch1L == 40){
    c27=9.869
   }

   // ##############C29#############
  if(this.ch1N == 6){
    c29=0.222
  }
  else if(this.ch1N == 8){
   c29=0.395
  }
  else if(this.ch1N == 10){
    c29=0.617
   }
   else if(this.ch1N == 12){
    c29=0.858
   }
   else if(this.ch1N == 14){
    c29=1.209
   }
   else if(this.ch1N == 16){
    c29=1.579
   }
   else if(this.ch1N == 18){
    c29=1.998
   }
   else if(this.ch1N == 20){
    c29=2.467
   } 
   else if(this.ch1N == 22){
    c29=2.985
   }
   else if(this.ch1N == 25){
    c29=3.855
   }
   else if(this.ch1N == 28){
    c29=4.836
   }
   else if(this.ch1N == 32){
    c29=6.316
   }
   else if(this.ch1N == 40){
    c29=9.869
   }

      // ##############C31#############
  if(this.ch1P == 6){
    c31=0.222
  }
  else if(this.ch1P == 8){
   c31=0.395
  }
  else if(this.ch1P == 10){
    c31=0.617
   }
   else if(this.ch1P == 12){
    c31=0.858
   }
   else if(this.ch1P == 14){
    c31=1.209
   }
   else if(this.ch1P == 16){
    c31=1.579
   }
   else if(this.ch1P == 18){
    c31=1.998
   }
   else if(this.ch1P == 20){
    c31=2.467
   } 
   else if(this.ch1P == 22){
    c31=2.985
   }
   else if(this.ch1P == 25){
    c31=3.855
   }
   else if(this.ch1P == 28){
    c31=4.836
   }
   else if(this.ch1P == 32){
    c31=6.316
   }
   else if(this.ch1P == 40){
    c31=9.869
   }

   // ##############C33#############
  if(this.ch1R == 6){
    c33=0.222
  }
  else if(this.ch1R == 8){
   c33=0.395
  }
  else if(this.ch1R == 10){
    c33=0.617
   }
   else if(this.ch1R == 12){
    c33=0.858
   }
   else if(this.ch1R == 14){
    c33=1.209
   }
   else if(this.ch1R == 16){
    c33=1.579
   }
   else if(this.ch1R == 18){
    c33=1.998
   }
   else if(this.ch1R == 20){
    c33=2.467
   } 
   else if(this.ch1R == 22){
    c33=2.985
   }
   else if(this.ch1R == 25){
    c33=3.855
   }
   else if(this.ch1R == 28){
    c33=4.836
   }
   else if(this.ch1R == 32){
    c33=6.316
   }
   else if(this.ch1R == 40){
    c33=9.869
   }

      // ##############C35#############
  if(this.ch1T == 6){
    c35=0.222
  }
  else if(this.ch1T == 8){
   c35=0.395
  }
  else if(this.ch1T == 10){
    c35=0.617
   }
   else if(this.ch1T == 12){
    c35=0.858
   }
   else if(this.ch1T == 14){
    c35=1.209
   }
   else if(this.ch1T == 16){
    c35=1.579
   }
   else if(this.ch1T == 18){
    c35=1.998
   }
   else if(this.ch1T == 20){
    c35=2.467
   } 
   else if(this.ch1T == 22){
    c35=2.985
   }
   else if(this.ch1T == 25){
    c35=3.855
   }
   else if(this.ch1T == 28){
    c35=4.836
   }
   else if(this.ch1T == 32){
    c35=6.316
   }
   else if(this.ch1T == 40){
    c35=9.869
   }

// ##############C37#############
if(this.ch1V == 6){
  c37=0.222
}
else if(this.ch1V == 8){
 c37=0.395
}
else if(this.ch1V == 10){
  c37=0.617
 }
 else if(this.ch1V == 12){
  c37=0.858
 }
 else if(this.ch1V == 14){
  c37=1.209
 }
 else if(this.ch1V == 16){
  c37=1.579
 }
 else if(this.ch1V == 18){
  c37=1.998
 }
 else if(this.ch1V == 20){
  c37=2.467
 } 
 else if(this.ch1V == 22){
  c37=2.985
 }
 else if(this.ch1V == 25){
  c37=3.855
 }
 else if(this.ch1V == 28){
  c37=4.836
 }
 else if(this.ch1V == 32){
  c37=6.316
 }
 else if(this.ch1V == 40){
  c37=9.869
 }

 // ##############C39#############
if(this.ch1X == 6){
  c39=0.222
}
else if(this.ch1X == 8){
 c39=0.395
}
else if(this.ch1X == 10){
  c39=0.617
 }
 else if(this.ch1X == 12){
  c39=0.858
 }
 else if(this.ch1X == 14){
  c39=1.209
 }
 else if(this.ch1X == 16){
  c39=1.579
 }
 else if(this.ch1X == 18){
  c39=1.998
 }
 else if(this.ch1X == 20){
  c39=2.467
 } 
 else if(this.ch1X == 22){
  c39=2.985
 }
 else if(this.ch1X == 25){
  c39=3.855
 }
 else if(this.ch1X == 28){
  c39=4.836
 }
 else if(this.ch1X == 32){
  c39=6.316
 }
 else if(this.ch1X == 40){
  c39=9.869
 }

 // ##############C41#############
if(this.ch1Z == 6){
  c41=0.222
}
else if(this.ch1Z == 8){
 c41=0.395
}
else if(this.ch1Z == 10){
  c41=0.617
 }
 else if(this.ch1Z == 12){
  c41=0.858
 }
 else if(this.ch1Z == 14){
  c41=1.209
 }
 else if(this.ch1Z == 16){
  c41=1.579
 }
 else if(this.ch1Z == 18){
  c41=1.998
 }
 else if(this.ch1Z == 20){
  c41=2.467
 } 
 else if(this.ch1Z == 22){
  c41=2.985
 }
 else if(this.ch1Z == 25){
  c41=3.855
 }
 else if(this.ch1Z == 28){
  c41=4.836
 }
 else if(this.ch1Z == 32){
  c41=6.316
 }
 else if(this.ch1Z == 40){
  c41=9.869
 }

 // ##############C43#############
if(this.ch1AB == 6){
  c43=0.222
}
else if(this.ch1AB == 8){
 c43=0.395
}
else if(this.ch1AB == 10){
  c43=0.617
 }
 else if(this.ch1AB == 12){
  c43=0.858
 }
 else if(this.ch1AB == 14){
  c43=1.209
 }
 else if(this.ch1AB == 16){
  c43=1.579
 }
 else if(this.ch1AB == 18){
  c43=1.998
 }
 else if(this.ch1AB == 20){
  c43=2.467
 } 
 else if(this.ch1AB == 22){
  c43=2.985
 }
 else if(this.ch1AB == 25){
  c43=3.855
 }
 else if(this.ch1AB == 28){
  c43=4.836
 }
 else if(this.ch1AB == 32){
  c43=6.316
 }
 else if(this.ch1AB == 40){
  c43=9.869
 }


   // ##############C27#############
   if(this.ch2A == 6){
    f27=0.222
  }
  else if(this.ch2A == 8){
   f27=0.395
  }
  else if(this.ch2A == 10){
    f27=0.617
   }
   else if(this.ch2A == 12){
    f27=0.858
   }
   else if(this.ch2A == 14){
    f27=1.209
   }
   else if(this.ch2A == 16){
    f27=1.579
   }
   else if(this.ch2A == 18){
    f27=1.998
   }
   else if(this.ch2A == 20){
    f27=2.467
   } 
   else if(this.ch2A == 22){
    f27=2.985
   }
   else if(this.ch2A == 25){
    f27=3.855
   }
   else if(this.ch2A == 28){
    f27=4.836
   }
   else if(this.ch2A == 32){
    f27=6.316
   }
   else if(this.ch2A == 40){
    f27=9.869
   }

   // ##############C29#############
  if(this.ch2C == 6){
    f29=0.222
  }
  else if(this.ch2C == 8){
   f29=0.395
  }
  else if(this.ch2C == 10){
    f29=0.617
   }
   else if(this.ch2C == 12){
    f29=0.858
   }
   else if(this.ch2C == 14){
    f29=1.209
   }
   else if(this.ch2C == 16){
    f29=1.579
   }
   else if(this.ch2C == 18){
    f29=1.998
   }
   else if(this.ch2C == 20){
    f29=2.467
   } 
   else if(this.ch2C == 22){
    f29=2.985
   }
   else if(this.ch2C == 25){
    f29=3.855
   }
   else if(this.ch2C == 28){
    f29=4.836
   }
   else if(this.ch2C == 32){
    f29=6.316
   }
   else if(this.ch2C == 40){
    f29=9.869
   }

      // ##############C31#############
  if(this.ch2E == 6){
    f31=0.222
  }
  else if(this.ch2E == 8){
   f31=0.395
  }
  else if(this.ch2E == 10){
    f31=0.617
   }
   else if(this.ch2E == 12){
    f31=0.858
   }
   else if(this.ch2E == 14){
    f31=1.209
   }
   else if(this.ch2E == 16){
    f31=1.579
   }
   else if(this.ch2E == 18){
    f31=1.998
   }
   else if(this.ch2E == 20){
    f31=2.467
   } 
   else if(this.ch2E == 22){
    f31=2.985
   }
   else if(this.ch2E == 25){
    f31=3.855
   }
   else if(this.ch2E == 28){
    f31=4.836
   }
   else if(this.ch2E == 32){
    f31=6.316
   }
   else if(this.ch2E == 40){
    f31=9.869
   }

   // ##############C33#############
  if(this.ch2G == 6){
    f33=0.222
  }
  else if(this.ch2G == 8){
   f33=0.395
  }
  else if(this.ch2G == 10){
    f33=0.617
   }
   else if(this.ch2G == 12){
    f33=0.858
   }
   else if(this.ch2G == 14){
    f33=1.209
   }
   else if(this.ch2G == 16){
    f33=1.579
   }
   else if(this.ch2G == 18){
    f33=1.998
   }
   else if(this.ch2G == 20){
    f33=2.467
   } 
   else if(this.ch2G == 22){
    f33=2.985
   }
   else if(this.ch2G == 25){
    f33=3.855
   }
   else if(this.ch2G == 28){
    f33=4.836
   }
   else if(this.ch2G == 32){
    f33=6.316
   }
   else if(this.ch2G == 40){
    f33=9.869
   }

      // ##############C35#############
  if(this.ch2I == 6){
    f35=0.222
  }
  else if(this.ch2I == 8){
   f35=0.395
  }
  else if(this.ch2I == 10){
    f35=0.617
   }
   else if(this.ch2I == 12){
    f35=0.858
   }
   else if(this.ch2I == 14){
    f35=1.209
   }
   else if(this.ch2I == 16){
    f35=1.579
   }
   else if(this.ch2I == 18){
    f35=1.998
   }
   else if(this.ch2I == 20){
    f35=2.467
   } 
   else if(this.ch2I == 22){
    f35=2.985
   }
   else if(this.ch2I == 25){
    f35=3.855
   }
   else if(this.ch2I == 28){
    f35=4.836
   }
   else if(this.ch2I == 32){
    f35=6.316
   }
   else if(this.ch2I == 40){
    f35=9.869
   }

// ##############C37#############
if(this.ch2K == 6){
  f37=0.222
}
else if(this.ch2K == 8){
 f37=0.395
}
else if(this.ch2K == 10){
  f37=0.617
 }
 else if(this.ch2K == 12){
  f37=0.858
 }
 else if(this.ch2K == 14){
  f37=1.209
 }
 else if(this.ch2K == 16){
  f37=1.579
 }
 else if(this.ch2K == 18){
  f37=1.998
 }
 else if(this.ch2K == 20){
  f37=2.467
 } 
 else if(this.ch2K == 22){
  f37=2.985
 }
 else if(this.ch2K == 25){
  f37=3.855
 }
 else if(this.ch2K == 28){
  f37=4.836
 }
 else if(this.ch2K == 32){
  f37=6.316
 }
 else if(this.ch2K == 40){
  f37=9.869
 }

 // ##############C39#############
if(this.ch2M == 6){
  f39=0.222
}
else if(this.ch2M == 8){
 f39=0.395
}
else if(this.ch2M == 10){
  f39=0.617
 }
 else if(this.ch2M == 12){
  f39=0.858
 }
 else if(this.ch2M == 14){
  f39=1.209
 }
 else if(this.ch2M == 16){
  f39=1.579
 }
 else if(this.ch2M == 18){
  f39=1.998
 }
 else if(this.ch2M == 20){
  f39=2.467
 } 
 else if(this.ch2M == 22){
  f39=2.985
 }
 else if(this.ch2M == 25){
  f39=3.855
 }
 else if(this.ch2M == 28){
  f39=4.836
 }
 else if(this.ch2M == 32){
  f39=6.316
 }
 else if(this.ch2M == 40){
  f39=9.869
 }

 // ##############C41#############
if(this.ch2O == 6){
  f41=0.222
}
else if(this.ch2O == 8){
 f41=0.395
}
else if(this.ch2O == 10){
  f41=0.617
 }
 else if(this.ch2O == 12){
  f41=0.858
 }
 else if(this.ch2O == 14){
  f41=1.209
 }
 else if(this.ch2O == 16){
  f41=1.579
 }
 else if(this.ch2O == 18){
  f41=1.998
 }
 else if(this.ch2O == 20){
  f41=2.467
 } 
 else if(this.ch2O == 22){
  f41=2.985
 }
 else if(this.ch2O == 25){
  f41=3.855
 }
 else if(this.ch2O == 28){
  f41=4.836
 }
 else if(this.ch2O == 32){
  f41=6.316
 }
 else if(this.ch2O == 40){
  f41=9.869
 }

 // ##############C43#############
if(this.ch2Q == 6){
  f43=0.222
}
else if(this.ch2Q == 8){
 f43=0.395
}
else if(this.ch2Q == 10){
  f43=0.617
 }
 else if(this.ch2Q == 12){
  f43=0.858
 }
 else if(this.ch2Q == 14){
  f43=1.209
 }
 else if(this.ch2Q == 16){
  f43=1.579
 }
 else if(this.ch2Q == 18){
  f43=1.998
 }
 else if(this.ch2Q == 20){
  f43=2.467
 } 
 else if(this.ch2Q == 22){
  f43=2.985
 }
 else if(this.ch2Q == 25){
  f43=3.855
 }
 else if(this.ch2Q == 28){
  f43=4.836
 }
 else if(this.ch2Q == 32){
  f43=6.316
 }
 else if(this.ch2Q == 40){
  f43=9.869
 }

 p1_1 = (0.33*this.Unit_length+this.ch1A+this.Unit_height+0.35)* this.ch1M*c27;
 p1_2 =(0.33*this.Unit_length+this.ch1B+this.Unit_height+0.35)*this.ch1Q*c31;
 p1_3=(0.8+0.67*this.Unit_length)*this.ch1U*c35;
 p1_4 =(this.Unit_length+this.ch1A+this.ch1B-0.2+2*this.Unit_height)*this.ch1W*c37;
 p1_5 =(0.84*this.Unit_length+0.1)*this.ch1Y*c39;
 p1_6 =this.Unit_length*this.ch1AA*c41;
 p1_7 =this.ch1M*(0.4+this.Unit_height+this.ch1A-0.05+this.Unit_length+(50*this.ch1L*this.ch1L*3.14/4000))*c27;
 p1_8 =this.ch1O*(0.33*this.Unit_length+this.ch1A+this.Unit_height+0.35)*c29;
 p1_9 =this.ch1Q*(0.4+this.Unit_height+this.ch1A-0.05+this.Unit_length+(50*this.ch1L*this.ch1L*3.14/4000))*c31;
 p1_10 =((this.ch1S)*1*1*(0.67*this.Unit_length+this.ch1B))*c33;
 p1_11 =((this.ch1W)*1*1*(this.Unit_length+this.ch1A+this.Unit_height+this.ch1B-0.1))*c37;
 p1_12 =((this.ch1Y)*1*1*(0.6*this.Unit_length+0.1))*c39;
 p1_13 =this.Unit_length*this.ch1AA*c41;
 p1_14 =this.ch1M*(this.Unit_length+0.5*this.ch1A+0.5*this.ch1B+(100*this.ch1L*this.ch1L*3.14/4000))*c27;
 p1_15 =(this.ch1O*(0.05+0.5*this.ch1A+0.33*this.Unit_length))*c29;
 p1_16 =this.ch1Q*(this.Unit_length+0.5*this.ch1A+0.5*this.ch1B+(100*this.ch1L*this.ch1L*3.14/4000))*c31;
 p1_17 =(this.ch1O*(0.05+0.5*this.ch1B+0.33*this.Unit_length))*c33;
 p1_18 =(this.ch1W*(this.ch1A+this.Unit_length+this.ch1B))*c37;
 p1_19 =(this.ch1Y*(0.6*this.Unit_length+0.1))*c39;
 p1_20 =this.Unit_length*this.ch1AA*c41;
 p1_21 =(this.ch1M*(this.Unit_length+this.Unit_height+this.ch1A))*c27;
 p1_22 =(this.ch1O*(2.5*this.Unit_length+this.ch1A+this.Unit_height))*c29;
 p1_23 =(this.ch1W*(this.Unit_height+this.ch1A+this.Unit_length))*c37;
 p1_24 =this.Unit_length*this.ch1AA*c41;
 p1_25 =this.ch1AC*c43;

 p2_1 =(0.33*this.Unit_length+this.ch1A+this.Unit_height+0.35)*this.ch2B*f27;
 p2_2 =(0.33*this.Unit_length+this.ch1B+this.Unit_height+0.35)*this.ch2F*f31;
 p2_3 =(0.8+0.67*this.Unit_length)*this.ch2J*f35;
 p2_4 =(this.Unit_length+this.ch1A+this.ch1B-0.2+2*this.Unit_height)*this.ch2L*f37;
 p2_5 =(0.84*this.Unit_length+0.1)*this.ch2N*f39;
 p2_6 =this.Unit_length*this.ch2P*f41;
 p2_7 =this.ch2B*(0.4+this.Unit_height+this.ch1A-0.05+this.Unit_length+(50*this.ch2A*this.ch2A*3.14/4000))*f27;
 p2_8 =this.ch2D*(0.33*this.Unit_length+this.ch1A+this.Unit_height+0.35)*f29;
 p2_9 =this.ch2F*(0.4+this.Unit_height+this.ch1A-0.05+this.Unit_length+(50*this.ch2A*this.ch2A*3.14/4000))*f31;
 p2_10 =((this.ch2H)*1*1*(0.67*this.Unit_length+this.ch1B))*f33;
 p2_11 =((this.ch2L)*1*1*(this.Unit_length+this.ch1A+this.Unit_height+this.ch1B-0.1))*f37;
 p2_12 =((this.ch2N)*1*1*(0.6*this.Unit_length+0.1))*f39;
 p2_13 =this.Unit_length*this.ch2P*f41;
 p2_14 =this.ch2B*(this.Unit_length+0.5*this.ch1A+0.5*this.ch1B+(100*this.ch2A*this.ch2A*3.14/4000))*f27;
 p2_15 =(this.ch2D*(0.05+0.5*this.ch1A+0.33*this.Unit_length))*f29;
 p2_16 =this.ch2F*(this.Unit_length+0.5*this.ch1A+0.5*this.ch1B+(100*this.ch2A*this.ch2A*3.14/4000))*f31;
 p2_17 =(this.ch2D*(0.05+0.5*this.ch1B+0.33*this.Unit_length))*f33;
 p2_18 =(this.ch2L*(this.ch1A+this.Unit_length+this.ch1B))*f37;
 p2_19 =(this.ch2N*(0.6*this.Unit_length+0.1))*f39;
 p2_20 =this.Unit_length*this.ch2P*f41;
 p2_21 =(this.ch2B*(this.Unit_length+this.Unit_height+this.ch1A))*f27;
 p2_22 =(this.ch2D*(2.5*this.Unit_length+this.ch1A+this.Unit_height))*f29;
 p2_23 =(this.ch2L*(this.Unit_height+this.ch1A+this.Unit_length))*f37;
 p2_24 =this.Unit_length*this.ch2P*f41;
 p2_25 =this.ch2R*f43;

 if(c19 == 0.222){
  SteelringatcenterI19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 0.395){
  SteelringatcenterJ19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 0.616){
  SteelringatcenterK19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 0.888){
  SteelringatcenterL19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 1.208){
  SteelringatcenterM19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 1.579){
  SteelringatcenterN19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 1.997){
  SteelringatcenterO19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 2.466){
  SteelringatcenterP19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 2.984){
  SteelringatcenterQ19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 3.854){
  SteelringatcenterR19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 4.833){
  SteelringatcenterS19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 6.313){
  SteelringatcenterT19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }
 if(c19 == 9.864){
  SteelringatcenterU19 =(NoofringsMIDDLETHIRD*this.Unit_length*0.33)*Totallengthofrings*c19
 }



 if(c21 == 0.222){
  SteelringatthirdI21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 0.395){
  SteelringatthirdJ21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 0.616){
  SteelringatthirdK21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 0.888){
  SteelringatthirdL21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 1.208){
  SteelringatthirdM21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 1.579){
  SteelringatthirdN21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 1.997){
  SteelringatthirdO21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 2.466){
  SteelringatthirdP21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 2.984){
  SteelringatthirdQ21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 3.854){
  SteelringatthirdR21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 4.833){
  SteelringatthirdS21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 6.313){
  SteelringatthirdT21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }
 if(c21 == 9.864){
  SteelringatthirdU21 =(NoofringsOTHERTHIRDRIGHTLEFT*this.Unit_length*0.67*1)*c21*Totallengthofrings
 }

 presumSteelringI = SteelringatcenterI19+SteelringatthirdI21;
 presumSteelringJ = SteelringatcenterJ19+SteelringatthirdJ21;
 presumSteelringK = SteelringatcenterK19+SteelringatthirdK21;
 presumSteelringL = SteelringatcenterL19+SteelringatthirdL21;
 presumSteelringM = SteelringatcenterM19+SteelringatthirdM21;
 presumSteelringN = SteelringatcenterN19+SteelringatthirdN21;
 presumSteelringO = SteelringatcenterO19+SteelringatthirdO21;
 presumSteelringP = SteelringatcenterP19+SteelringatthirdP21;
 presumSteelringQ = SteelringatcenterQ19+SteelringatthirdQ21;
 presumSteelringR = SteelringatcenterR19+SteelringatthirdR21;
 presumSteelringS = SteelringatcenterS19+SteelringatthirdS21;
 presumSteelringT = SteelringatcenterT19+SteelringatthirdT21;
 presumSteelringU = SteelringatcenterU19+SteelringatthirdU21;
 sumSteelring = presumSteelringI+presumSteelringJ+presumSteelringK+presumSteelringL+presumSteelringM+presumSteelringN+presumSteelringO+presumSteelringP+presumSteelringQ+presumSteelringR+presumSteelringS+presumSteelringT+presumSteelringU;


 pre6 = presumSteelringI*this.No_of_units;
 pre8 = presumSteelringJ*this.No_of_units;
 pre10 = presumSteelringK*this.No_of_units;
 pre12 = presumSteelringL*this.No_of_units;
 pre14 = presumSteelringM*this.No_of_units;
 pre16 = presumSteelringN*this.No_of_units;
 pre18 = presumSteelringO*this.No_of_units;
 pre20 = presumSteelringP*this.No_of_units;
 pre22 = presumSteelringQ*this.No_of_units;
 pre25 = presumSteelringR*this.No_of_units;
 pre28 = presumSteelringS*this.No_of_units;
 pre32 = presumSteelringT*this.No_of_units;
 pre40 = presumSteelringU*this.No_of_units;


  if(this.ch1K == 1){
    type1 = 1
  }

  if(this.ch1K == 2){
    type2 = 1
  }

  if(this.ch1K == 3){
    type3 = 1
  }

  if(this.ch1K == 4){
    type4 = 1
  }

  if(type1 > 0){
    var I46 = 0;
    var I47= 0;
    var I48= 0;
    var I49= 0;
    var I50= 0;
    var I51= 0;

    if(c27 == 0.222){
      I46 = p1_1
    }
    if(c31 == 0.222){
      I47 = p1_2
    }
    if(c35 == 0.222){
      I48 = p1_3
    }
    if(c37 == 0.222){
      I49 = p1_4
    }
    if(c39 == 0.222){
      I50 = p1_5
    }
    if(c41 == 0.222){
      I51 = p1_6
    }
   type1_6 = (I46+I47+I48+I49+I50+I51)*type1



    var J46 = 0;
    var J47= 0;
    var J48= 0;
    var J49= 0;
    var J50= 0;
    var J51= 0;

    if(c27 == 0.395){
      J46 = p1_1
    }
    if(c31 == 0.395){
      J47 = p1_2
    }
    if(c35 == 0.395){
      J48 = p1_3
    }
    if(c37 == 0.395){
      J49 = p1_4
    }
    if(c39 == 0.395){
      J50 = p1_5
    }
    if(c41 == 0.395){
      J51 = p1_6
    }
   type1_8 = (J46+J47+J48+J49+J50+J51)*type1





    var K46 = 0;
    var K47= 0;
    var K48= 0;
    var K49= 0;
    var K50= 0;
    var K51= 0;

    if(c27 == 0.616){
      K46 = p1_1
    }
    if(c31 == 0.616){
      K47 = p1_2
    }
    if(c35 == 0.616){
      K48 = p1_3
    }
    if(c37 == 0.616){
      K49 = p1_4
    }
    if(c39 == 0.616){
      K50 = p1_5
    }
    if(c41 == 0.616){
      K51 = p1_6
    }
   type1_10 = (K46+K47+K48+K49+K50+K51)*type1


    var L46 = 0;
    var L47= 0;
    var L48= 0;
    var L49= 0;
    var L50= 0;
    var L51= 0;

    if(c27 == 0.888){
      L46 = p1_1
    }
    if(c31 == 0.888){
      L47 = p1_2
    }
    if(c35 == 0.888){
      L48 = p1_3
    }
    if(c37 == 0.888){
      L49 = p1_4
    }
    if(c39 == 0.888){
      L50 = p1_5
    }
    if(c41 == 0.888){
      L51 = p1_6
    }
   type1_12 = (L46+L47+L48+L49+L50+L51)*type1



    var M46 = 0;
    var M47= 0;
    var M48= 0;
    var M49= 0;
    var M50= 0;
    var M51= 0;

    if(c27 == 1.208){
      M46 = p1_1
    }
    if(c31 == 1.208){
      M47 = p1_2
    }
    if(c35 == 1.208){
      M48 = p1_3
    }
    if(c37 == 1.208){
      M49 = p1_4
    }
    if(c39 == 1.208){
      M50 = p1_5
    }
    if(c41 == 1.208){
      M51 = p1_6
    }
   type1_14 = (M46+M47+M48+M49+M50+M51)*type1


    var N46 = 0;
    var N47= 0;
    var N48= 0;
    var N49= 0;
    var N50= 0;
    var N51= 0;

    if(c27 == 1.579){
      N46 = p1_1
    }
    if(c31 == 1.579){
      N47 = p1_2
    }
    if(c35 == 1.579){
      N48 = p1_3
    }
    if(c37 == 1.579){
      N49 = p1_4
    }
    if(c39 == 1.579){
      N50 = p1_5
    }
    if(c41 == 1.579){
      N51 = p1_6
    }
   type1_16 = (N46+N47+N48+N49+N50+N51)*type1


    var O46 = 0;
    var O47= 0;
    var O48= 0;
    var O49= 0;
    var O50= 0;
    var O51= 0;

    if(c27 == 1.997){
      O46 = p1_1
    }
    if(c31 == 1.997){
      O47 = p1_2
    }
    if(c35 == 1.997){
      O48 = p1_3
    }
    if(c37 == 1.997){
      O49 = p1_4
    }
    if(c39 == 1.997){
      O50 = p1_5
    }
    if(c41 == 1.997){
      O51 = p1_6
    }
   type1_18 = (O46+O47+O48+O49+O50+O51)*type1



    var P46 = 0;
    var P47= 0;
    var P48= 0;
    var P49= 0;
    var P50= 0;
    var P51= 0;

    if(c27 == 2.466){
      P46 = p1_1
    }
    if(c31 == 2.466){
      P47 = p1_2
    }
    if(c35 == 2.466){
      P48 = p1_3
    }
    if(c37 == 2.466){
      P49 = p1_4
    }
    if(c39 == 2.466){
      P50 = p1_5
    }
    if(c41 == 2.466){
      P51 = p1_6
    }
   type1_20 = (P46+P47+P48+P49+P50+P51)*type1


    var Q46 = 0;
    var Q47= 0;
    var Q48= 0;
    var Q49= 0;
    var Q50= 0;
    var Q51= 0;

    if(c27 == 2.984){
      Q46 = p1_1
    }
    if(c31 == 2.984){
      Q47 = p1_2
    }
    if(c35 == 2.984){
      Q48 = p1_3
    }
    if(c37 == 2.984){
      Q49 = p1_4
    }
    if(c39 == 2.984){
      Q50 = p1_5
    }
    if(c41 == 2.984){
      Q51 = p1_6
    }
   type1_22 = (Q46+Q47+Q48+Q49+Q50+Q51)*type1


    var R46 = 0;
    var R47= 0;
    var R48= 0;
    var R49= 0;
    var R50= 0;
    var R51= 0;

    if(c27 == 3.854){
      R46 = p1_1
    }
    if(c31 == 3.854){
      R47 = p1_2
    }
    if(c35 == 3.854){
      R48 = p1_3
    }
    if(c37 == 3.854){
      R49 = p1_4
    }
    if(c39 == 3.854){
      R50 = p1_5
    }
    if(c41 == 3.854){
      R51 = p1_6
    }
   type1_25 = (R46+R47+R48+R49+R50+R51)*type1


   var S46 = 0;
    var S47= 0;
    var S48= 0;
    var S49= 0;
    var S50= 0;
    var S51= 0;

    if(c27 == 4.833){
      S46 = p1_1
    }
    if(c31 == 4.833){
      S47 = p1_2
    }
    if(c35 == 4.833){
      S48 = p1_3
    }
    if(c37 == 4.833){
      S49 = p1_4
    }
    if(c39 == 4.833){
      S50 = p1_5
    }
    if(c41 == 4.833){
      S51 = p1_6
    }
   type1_28 = (S46+S47+S48+S49+S50+S51)*type1



    var T46 = 0;
    var T47= 0;
    var T48= 0;
    var T49= 0;
    var T50= 0;
    var T51= 0;

    if(c27 == 6.313){
      T46 = p1_1
    }
    if(c31 == 6.313){
      T47 = p1_2
    }
    if(c35 == 6.313){
      T48 = p1_3
    }
    if(c37 == 6.313){
      T49 = p1_4
    }
    if(c39 == 6.313){
      T50 = p1_5
    }
    if(c41 == 6.313){
      T51 = p1_6
    }
   type1_32 = (T46+T47+T48+T49+T50+T51)*type1


    var U46 = 0;
    var U47= 0;
    var U48= 0;
    var U49= 0;
    var U50= 0;
    var U51= 0;

    if(c27 == 9.864){
      U46 = p1_1
    }
    if(c31 == 9.864){
      U47 = p1_2
    }
    if(c35 == 9.864){
      U48 = p1_3
    }
    if(c37 == 9.864){
      U49 = p1_4
    }
    if(c39 == 9.864){
      U50 = p1_5
    }
    if(c41 == 9.864){
      U51 = p1_6
    }
   type1_40 = (U46+U47+U48+U49+U50+U51)*type1

  }

  if(type2 > 0){
    var I52 = 0;
    var I53= 0;
    var I54= 0;
    var I55= 0;
    var I56= 0;
    var I57= 0;
    var I58= 0;

    if(c27 == 0.222){
      I52 = p1_7
    }
    if(c29 == 0.222){
      I53 = p1_8
    }
    if(c31 == 0.222){
      I54 = p1_9
    }
    if(c33 == 0.222){
      I55 = p1_10
    }
    if(c37 == 0.222){
      I56 = p1_11
    }
    if(c39 == 0.222){
      I57 = p1_12
    }
    if(c41 == 0.222){
      I58 = p1_13
    }
    type2_6 =(I52+I53+I54+I55+I56+I57+I58)*type2


    var J52 = 0;
    var J53= 0;
    var J54= 0;
    var J55= 0;
    var J56= 0;
    var J57= 0;
    var J58= 0;

    if(c27 == 0.395){
      J52 = p1_7
    }
    if(c29 == 0.395){
      J53 = p1_8
    }
    if(c31 == 0.395){
      J54 = p1_9
    }
    if(c33 == 0.395){
      J55 = p1_10
    }
    if(c37 == 0.395){
      J56 = p1_11
    }
    if(c39 == 0.395){
      J57 = p1_12
    }
    if(c41 == 0.395){
      J58 = p1_13
    }
    type2_8 =(J52+J53+J54+J55+J56+J57+J58)*type2


    var K52 = 0;
    var K53= 0;
    var K54= 0;
    var K55= 0;
    var K56= 0;
    var K57= 0;
    var K58= 0;

    if(c27 == 0.616){
      K52 = p1_7
    }
    if(c29 == 0.616){
      K53 = p1_8
    }
    if(c31 == 0.616){
      K54 = p1_9
    }
    if(c33 == 0.616){
      K55 = p1_10
    }
    if(c37 == 0.616){
      K56 = p1_11
    }
    if(c39 == 0.616){
      K57 = p1_12
    }
    if(c41 == 0.616){
      K58 = p1_13
    }
    type2_10 =(K52+K53+K54+K55+K56+K57+K58)*type2



    var L52 = 0;
    var L53= 0;
    var L54= 0;
    var L55= 0;
    var L56= 0;
    var L57= 0;
    var L58= 0;

    if(c27 == 0.888){
      L52 = p1_7
    }
    if(c29 == 0.888){
      L53 = p1_8
    }
    if(c31 == 0.888){
      L54 = p1_9
    }
    if(c33 == 0.888){
      L55 = p1_10
    }
    if(c37 == 0.888){
      L56 = p1_11
    }
    if(c39 == 0.888){
      L57 = p1_12
    }
    if(c41 == 0.888){
      L58 = p1_13
    }
    type2_12 =(L52+L53+L54+L55+L56+L57+L58)*type2


    var M52 = 0;
    var M53= 0;
    var M54= 0;
    var M55= 0;
    var M56= 0;
    var M57= 0;
    var M58= 0;

    if(c27 == 1.208){
      M52 = p1_7
    }
    if(c29 == 1.208){
      M53 = p1_8
    }
    if(c31 == 1.208){
      M54 = p1_9
    }
    if(c33 == 1.208){
      M55 = p1_10
    }
    if(c37 == 1.208){
      M56 = p1_11
    }
    if(c39 == 1.208){
      M57 = p1_12
    }
    if(c41 == 1.208){
      M58 = p1_13
    }
    type2_14 =(M52+M53+M54+M55+M56+M57+M58)*type2


    var N52 = 0;
    var N53= 0;
    var N54= 0;
    var N55= 0;
    var N56= 0;
    var N57= 0;
    var N58= 0;

    if(c27 == 1.579){
      N52 = p1_7
    }
    if(c29 == 1.579){
      N53 = p1_8
    }
    if(c31 == 1.579){
      N54 = p1_9
    }
    if(c33 == 1.579){
      N55 = p1_10
    }
    if(c37 == 1.579){
      N56 = p1_11
    }
    if(c39 == 1.579){
      N57 = p1_12
    }
    if(c41 == 1.579){
      N58 = p1_13
    }
    type2_16 =(N52+N53+N54+N55+N56+N57+N58)*type2


    var O52 = 0;
    var O53= 0;
    var O54= 0;
    var O55= 0;
    var O56= 0;
    var O57= 0;
    var O58= 0;

    if(c27 == 1.997){
      O52 = p1_7
    }
    if(c29 == 1.997){
      O53 = p1_8
    }
    if(c31 == 1.997){
      O54 = p1_9
    }
    if(c33 == 1.997){
      O55 = p1_10
    }
    if(c37 == 1.997){
      O56 = p1_11
    }
    if(c39 == 1.997){
      O57 = p1_12
    }
    if(c41 == 1.997){
      O58 = p1_13
    }
    type2_18 =(O52+O53+O54+O55+O56+O57+O58)*type2



    var P52 = 0;
    var P53= 0;
    var P54= 0;
    var P55= 0;
    var P56= 0;
    var P57= 0;
    var P58= 0;

    if(c27 == 2.466){
      P52 = p1_7
    }
    if(c29 == 2.466){
      P53 = p1_8
    }
    if(c31 == 2.466){
      P54 = p1_9
    }
    if(c33 == 2.466){
      P55 = p1_10
    }
    if(c37 == 2.466){
      P56 = p1_11
    }
    if(c39 == 2.466){
      P57 = p1_12
    }
    if(c41 == 2.466){
      P58 = p1_13
    }
    type2_20 =(P52+P53+P54+P55+P56+P57+P58)*type2


    var Q52 = 0;
    var Q53= 0;
    var Q54= 0;
    var Q55= 0;
    var Q56= 0;
    var Q57= 0;
    var Q58= 0;

    if(c27 == 2.984){
      Q52 = p1_7
    }
    if(c29 == 2.984){
      Q53 = p1_8
    }
    if(c31 == 2.984){
      Q54 = p1_9
    }
    if(c33 == 2.984){
      Q55 = p1_10
    }
    if(c37 == 2.984){
      Q56 = p1_11
    }
    if(c39 == 2.984){
      Q57 = p1_12
    }
    if(c41 == 2.984){
      Q58 = p1_13
    }
    type2_22 =(Q52+Q53+Q54+Q55+Q56+Q57+Q58)*type2


    var R52 = 0;
    var R53= 0;
    var R54= 0;
    var R55= 0;
    var R56= 0;
    var R57= 0;
    var R58= 0;

    if(c27 == 3.854){
      R52 = p1_7
    }
    if(c29 == 3.854){
      R53 = p1_8
    }
    if(c31 == 3.854){
      R54 = p1_9
    }
    if(c33 == 3.854){
      R55 = p1_10
    }
    if(c37 == 3.854){
      R56 = p1_11
    }
    if(c39 == 3.854){
      R57 = p1_12
    }
    if(c41 == 3.854){
      R58 = p1_13
    }
    type2_25 =(R52+R53+R54+R55+R56+R57+R58)*type2


    var S52 = 0;
    var S53= 0;
    var S54= 0;
    var S55= 0;
    var S56= 0;
    var S57= 0;
    var S58= 0;

    if(c27 == 4.833){
      S52 = p1_7
    }
    if(c29 == 4.833){
      S53 = p1_8
    }
    if(c31 == 4.833){
      S54 = p1_9
    }
    if(c33 == 4.833){
      S55 = p1_10
    }
    if(c37 == 4.833){
      S56 = p1_11
    }
    if(c39 == 4.833){
      S57 = p1_12
    }
    if(c41 == 4.833){
      S58 = p1_13
    }
    type2_28 =(S52+S53+S54+S55+S56+S57+S58)*type2


    var T52 = 0;
    var T53= 0;
    var T54= 0;
    var T55= 0;
    var T56= 0;
    var T57= 0;
    var T58= 0;

    if(c27 == 6.313){
      T52 = p1_7
    }
    if(c29 == 6.313){
      T53 = p1_8
    }
    if(c31 == 6.313){
      T54 = p1_9
    }
    if(c33 == 6.313){
      T55 = p1_10
    }
    if(c37 == 6.313){
      T56 = p1_11
    }
    if(c39 == 6.313){
      T57 = p1_12
    }
    if(c41 == 6.313){
      T58 = p1_13
    }
    type2_32 =(T52+T53+T54+T55+T56+T57+T58)*type2



    var U52 = 0;
    var U53= 0;
    var U54= 0;
    var U55= 0;
    var U56= 0;
    var U57= 0;
    var U58= 0;

    if(c27 == 9.864){
      U52 = p1_7
    }
    if(c29 == 9.864){
      U53 = p1_8
    }
    if(c31 == 9.864){
      U54 = p1_9
    }
    if(c33 == 9.864){
      U55 = p1_10
    }
    if(c37 == 9.864){
      U56 = p1_11
    }
    if(c39 == 9.864){
      U57 = p1_12
    }
    if(c41 == 9.864){
      U58 = p1_13
    }
    type2_40 =(U52+U53+U54+U55+U56+U57+U58)*type2

  }


  if(type3 > 0){
    var I59 = 0;
    var I60 = 0;
    var I61 = 0;
    var I62 = 0;
    var I63 = 0;
    var I64 = 0;
    var I65 = 0;
    
    if(c27 == 0.222){
      I59 = p1_14;
    }
    if(c29 == 0.222){
      I60 = p1_15;
    }
    if(c31 == 0.222){
      I61 = p1_16;
    }
    if(c33 == 0.222){
      I62 = p1_17;
    }
    if(c37 == 0.222){
      I63 = p1_18;
    }
    if(c39 == 0.222){
      I64 = p1_19;
    }
    if(c41 == 0.222){
      I65 = p1_20;
    }
    type3_6 =(I59+I60+I61+I62+I63+I64+I65)*type3




    var J59 = 0;
    var J60 = 0;
    var J61 = 0;
    var J62 = 0;
    var J63 = 0;
    var J64 = 0;
    var J65 = 0;
    
    if(c27 == 0.395){
      J59 = p1_14;
    }
    if(c29 == 0.395){
      J60 = p1_15;
    }
    if(c31 == 0.395){
      J61 = p1_16;
    }
    if(c33 == 0.395){
      J62 = p1_17;
    }
    if(c37 == 0.395){
      J63 = p1_18;
    }
    if(c39 == 0.395){
      J64 = p1_19;
    }
    if(c41 == 0.395){
      J65 = p1_20;
    }
    type3_8 =(J59+J60+J61+J62+J63+J64+J65)*type3



    var K59 = 0;
    var K60 = 0;
    var K61 = 0;
    var K62 = 0;
    var K63 = 0;
    var K64 = 0;
    var K65 = 0;
    
    if(c27 == 0.616){
      K59 = p1_14;
    }
    if(c29 == 0.616){
      K60 = p1_15;
    }
    if(c31 == 0.616){
      K61 = p1_16;
    }
    if(c33 == 0.616){
      K62 = p1_17;
    }
    if(c37 == 0.616){
      K63 = p1_18;
    }
    if(c39 == 0.616){
      K64 = p1_19;
    }
    if(c41 == 0.616){
      K65 = p1_20;
    }
    type3_10 =(K59+K60+K61+K62+K63+K64+K65)*type3



    var L59 = 0;
    var L60 = 0;
    var L61 = 0;
    var L62 = 0;
    var L63 = 0;
    var L64 = 0;
    var L65 = 0;
    
    if(c27 == 0.888){
      L59 = p1_14;
    }
    if(c29 == 0.888){
      L60 = p1_15;
    }
    if(c31 == 0.888){
      L61 = p1_16;
    }
    if(c33 == 0.888){
      L62 = p1_17;
    }
    if(c37 == 0.888){
      L63 = p1_18;
    }
    if(c39 == 0.888){
      L64 = p1_19;
    }
    if(c41 == 0.888){
      L65 = p1_20;
    }
    type3_12 =(L59+L60+L61+L62+L63+L64+L65)*type3

     var M59 = 0;
    var M60 = 0;
    var M61 = 0;
    var M62 = 0;
    var M63 = 0;
    var M64 = 0;
    var M65 = 0;
    
    if(c27 == 1.208){
      M59 = p1_14;
    }
    if(c29 == 1.208){
      M60 = p1_15;
    }
    if(c31 == 1.208){
      M61 = p1_16;
    }
    if(c33 == 1.208){
      M62 = p1_17;
    }
    if(c37 == 1.208){
      M63 = p1_18;
    }
    if(c39 == 1.208){
      M64 = p1_19;
    }
    if(c41 == 1.208){
      M65 = p1_20;
    }
    type3_14 =(M59+M60+M61+M62+M63+M64+M65)*type3



    var N59 = 0;
    var N60 = 0;
    var N61 = 0;
    var N62 = 0;
    var N63 = 0;
    var N64 = 0;
    var N65 = 0;
    
    if(c27 == 1.579){
      N59 = p1_14;
    }
    if(c29 == 1.579){
      N60 = p1_15;
    }
    if(c31 == 1.579){
      N61 = p1_16;
    }
    if(c33 == 1.579){
      N62 = p1_17;
    }
    if(c37 == 1.579){
      N63 = p1_18;
    }
    if(c39 == 1.579){
      N64 = p1_19;
    }
    if(c41 == 1.579){
      N65 = p1_20;
    }
    type3_16 =(N59+N60+N61+N62+N63+N64+N65)*type3



    var O59 = 0;
    var O60 = 0;
    var O61 = 0;
    var O62 = 0;
    var O63 = 0;
    var O64 = 0;
    var O65 = 0;
    
    if(c27 == 1.997){
      O59 = p1_14;
    }
    if(c29 == 1.997){
      O60 = p1_15;
    }
    if(c31 == 1.997){
      O61 = p1_16;
    }
    if(c33 == 1.997){
      O62 = p1_17;
    }
    if(c37 == 1.997){
      O63 = p1_18;
    }
    if(c39 == 1.997){
      O64 = p1_19;
    }
    if(c41 == 1.997){
      O65 = p1_20;
    }
    type3_18 =(O59+O60+O61+O62+O63+O64+O65)*type3



    var P59 = 0;
    var P60 = 0;
    var P61 = 0;
    var P62 = 0;
    var P63 = 0;
    var P64 = 0;
    var P65 = 0;
    
    if(c27 == 2.466){
      P59 = p1_14;
    }
    if(c29 == 2.466){
      P60 = p1_15;
    }
    if(c31 == 2.466){
      P61 = p1_16;
    }
    if(c33 == 2.466){
      P62 = p1_17;
    }
    if(c37 == 2.466){
      P63 = p1_18;
    }
    if(c39 == 2.466){
      P64 = p1_19;
    }
    if(c41 == 2.466){
      P65 = p1_20;
    }
    type3_20 =(P59+P60+P61+P62+P63+P64+P65)*type3


    var Q59 = 0;
    var Q60 = 0;
    var Q61 = 0;
    var Q62 = 0;
    var Q63 = 0;
    var Q64 = 0;
    var Q65 = 0;
    
    if(c27 == 2.984){
      Q59 = p1_14;
    }
    if(c29 == 2.984){
      Q60 = p1_15;
    }
    if(c31 == 2.984){
      Q61 = p1_16;
    }
    if(c33 == 2.984){
      Q62 = p1_17;
    }
    if(c37 == 2.984){
      Q63 = p1_18;
    }
    if(c39 == 2.984){
      Q64 = p1_19;
    }
    if(c41 == 2.984){
      Q65 = p1_20;
    }
    type3_22 =(Q59+Q60+Q61+Q62+Q63+Q64+Q65)*type3


    var R59 = 0;
    var R60 = 0;
    var R61 = 0;
    var R62 = 0;
    var R63 = 0;
    var R64 = 0;
    var R65 = 0;
    
    if(c27 == 3.854){
      R59 = p1_14;
    }
    if(c29 == 3.854){
      R60 = p1_15;
    }
    if(c31 == 3.854){
      R61 = p1_16;
    }
    if(c33 == 3.854){
      R62 = p1_17;
    }
    if(c37 == 3.854){
      R63 = p1_18;
    }
    if(c39 == 3.854){
      R64 = p1_19;
    }
    if(c41 == 3.854){
      R65 = p1_20;
    }
    type3_25 =(R59+R60+R61+R62+R63+R64+R65)*type3



    var S59 = 0;
    var S60 = 0;
    var S61 = 0;
    var S62 = 0;
    var S63 = 0;
    var S64 = 0;
    var S65 = 0;
    
    if(c27 == 4.833){
      S59 = p1_14;
    }
    if(c29 == 4.833){
      S60 = p1_15;
    }
    if(c31 == 4.833){
      S61 = p1_16;
    }
    if(c33 == 4.833){
      S62 = p1_17;
    }
    if(c37 == 4.833){
      S63 = p1_18;
    }
    if(c39 == 4.833){
      S64 = p1_19;
    }
    if(c41 == 4.833){
      S65 = p1_20;
    }
    type3_28 =(S59+S60+S61+S62+S63+S64+S65)*type3

    var T59 = 0;
    var T60 = 0;
    var T61 = 0;
    var T62 = 0;
    var T63 = 0;
    var T64 = 0;
    var T65 = 0;
    
    if(c27 == 6.313){
      T59 = p1_14;
    }
    if(c29 == 6.313){
      T60 = p1_15;
    }
    if(c31 == 6.313){
      T61 = p1_16;
    }
    if(c33 == 6.313){
      T62 = p1_17;
    }
    if(c37 == 6.313){
      T63 = p1_18;
    }
    if(c39 == 6.313){
      T64 = p1_19;
    }
    if(c41 == 6.313){
      T65 = p1_20;
    }
    type3_32 =(T59+T60+T61+T62+T63+T64+T65)*type3

    var U59 = 0;
    var U60 = 0;
    var U61 = 0;
    var U62 = 0;
    var U63 = 0;
    var U64 = 0;
    var U65 = 0;
    
    if(c27 == 9.864){
      U59 = p1_14;
    }
    if(c29 == 9.864){
      U60 = p1_15;
    }
    if(c31 == 9.864){
      U61 = p1_16;
    }
    if(c33 == 9.864){
      U62 = p1_17;
    }
    if(c37 == 9.864){
      U63 = p1_18;
    }
    if(c39 == 9.864){
      U64 = p1_19;
    }
    if(c41 == 9.864){
      U65 = p1_20;
    }
    type3_40 =(U59+U60+U61+U62+U63+U64+U65)*type3
    

  }


  if(type4 > 0){
   var I66 = 0;
   var I67 = 0;
   var I68 = 0;
   var I69 = 0;

   if(c27 == 0.222){
     I66 = p1_21;
   }
   if(c29 == 0.222){
     I67 = p1_22;
   }
   if(c37 == 0.222){
     I68 = p1_23;
   }
   if(c41 == 0.222){
     I69 = p1_24;
   }
   type4_6 =(I66+I67+I68+I69)*type4



   var J66 = 0;
   var J67 = 0;
   var J68 = 0;
   var J69 = 0;

   if(c27 == 0.395){
     J66 = p1_21;
   }
   if(c29 == 0.395){
     J67 = p1_22;
   }
   if(c37 == 0.395){
     J68 = p1_23;
   }
   if(c41 == 0.395){
     J69 = p1_24;
   }
   type4_8 =(J66+J67+J68+J69)*type4

   var K66 = 0;
   var K67 = 0;
   var K68 = 0;
   var K69 = 0;

   if(c27 == 0.616){
     K66 = p1_21;
   }
   if(c29 == 0.616){
     K67 = p1_22;
   }
   if(c37 == 0.616){
     K68 = p1_23;
   }
   if(c41 == 0.616){
     K69 = p1_24;
   }
   type4_10 =(K66+K67+K68+K69)*type4


   var L66 = 0;
   var L67 = 0;
   var L68 = 0;
   var L69 = 0;

   if(c27 == 0.888){
     L66 = p1_21;
   }
   if(c29 == 0.888){
     L67 = p1_22;
   }
   if(c37 == 0.888){
     L68 = p1_23;
   }
   if(c41 == 0.888){
     L69 = p1_24;
   }
   type4_12 =(L66+L67+L68+L69)*type4

   var M66 = 0;
   var M67 = 0;
   var M68 = 0;
   var M69 = 0;

   if(c27 == 1.208){
     M66 = p1_21;
   }
   if(c29 == 1.208){
     M67 = p1_22;
   }
   if(c37 == 1.208){
     M68 = p1_23;
   }
   if(c41 == 1.208){
     M69 = p1_24;
   }
   type4_14 =(M66+M67+M68+M69)*type4


   var N66 = 0; 
   var N67 = 0;
   var N68 = 0;
   var N69 = 0;

   if(c27 == 1.579){
     N66 = p1_21;
   }
   if(c29 == 1.579){
     N67 = p1_22;
   }
   if(c37 == 1.579){
     N68 = p1_23;
   }
   if(c41 == 1.579){
     N69 = p1_24;
   }
   type4_16 =(N66+N67+N68+N69)*type4


   var O66 = 0; 
   var O67 = 0;
   var O68 = 0;
   var O69 = 0;

   if(c27 == 1.997){
     O66 = p1_21;
   }
   if(c29 == 1.997){
     O67 = p1_22;
   }
   if(c37 == 1.997){
     O68 = p1_23;
   }
   if(c41 == 1.997){
     O69 = p1_24;
   }
   type4_18 =(O66+O67+O68+O69)*type4


   var P66 = 0; 
   var P67 = 0;
   var P68 = 0;
   var P69 = 0;

   if(c27 == 2.466){
     P66 = p1_21;
   }
   if(c29 == 2.466){
     P67 = p1_22;
   }
   if(c37 == 2.466){
     P68 = p1_23;
   }
   if(c41 == 2.466){
     P69 = p1_24;
   }
   type4_20 =(P66+P67+P68+P69)*type4



   var Q66 = 0; 
   var Q67 = 0;
   var Q68 = 0;
   var Q69 = 0;

   if(c27 == 2.984){
     Q66 = p1_21;
   }
   if(c29 == 2.984){
     Q67 = p1_22;
   }
   if(c37 == 2.984){
     Q68 = p1_23;
   }
   if(c41 == 2.984){
     Q69 = p1_24;
   }
   type4_22 =(Q66+Q67+Q68+Q69)*type4

   var R66 = 0; 
   var R67 = 0;
   var R68 = 0;
   var R69 = 0;

   if(c27 == 3.854){
     R66 = p1_21;
   }
   if(c29 == 3.854){
     R67 = p1_22;
   }
   if(c37 == 3.854){
     R68 = p1_23;
   }
   if(c41 == 3.854){
     R69 = p1_24;
   }
   type4_25 =(R66+R67+R68+R69)*type4


   var S66 = 0; 
   var S67 = 0;
   var S68 = 0;
   var S69 = 0;

   if(c27 == 4.833){
     S66 = p1_21;
   }
   if(c29 == 4.833){
     S67 = p1_22;
   }
   if(c37 == 4.833){
     S68 = p1_23;
   }
   if(c41 == 4.833){
     S69 = p1_24;
   }
   type4_28 =(S66+S67+S68+S69)*type4


   var T66 = 0; 
   var T67 = 0;
   var T68 = 0;
   var T69 = 0;

   if(c27 == 6.313){
     T66 = p1_21;
   }
   if(c29 == 6.313){
     T67 = p1_22;
   }
   if(c37 == 6.313){
     T68 = p1_23;
   }
   if(c41 == 6.313){
     T69 = p1_24;
   }
   type4_32 =(T66+T67+T68+T69)*type4


   var U66 = 0; 
   var U67 = 0;
   var U68 = 0;
   var U69 = 0;

   if(c27 == 9.864){
     U66 = p1_21;
   }
   if(c29 == 9.864){
     U67 = p1_22;
   }
   if(c37 == 9.864){
     U68 = p1_23;
   }
   if(c41 == 9.864){
     U69 = p1_24;
   }
   type4_40 =(U66+U67+U68+U69)*type4

  }
  
  if(c43 == 0.222){
   ExtraI = p1_25 *this.No_of_units;
  }
  if(c43 == J){
   ExtraJ = p1_25 *this.No_of_units;
  }
  if(c43 == K){
   ExtraK = p1_25 *this.No_of_units;
  }
  if(c43 == L){
   ExtraL = p1_25 *this.No_of_units;
  }
  if(c43 == M){
   ExtraM = p1_25 *this.No_of_units;
  }
  if(c43 == N){
   ExtraN = p1_25 *this.No_of_units;
  }
  if(c43 == O){
   ExtraO = p1_25 *this.No_of_units;
  }
  if(c43 == P){
   ExtraP = p1_25 *this.No_of_units;
  }
  if(c43 == Q){
   ExtraQ = p1_25 *this.No_of_units;
  }
  if(c43 == R){
   ExtraR = p1_25 *this.No_of_units;
  }
  if(c43 == S){
   ExtraS = p1_25 *this.No_of_units;
  }
  if(c43 == T){
   ExtraT = p1_25 *this.No_of_units;
  }
  if(c43 == U){
   ExtraU = p1_25 *this.No_of_units;
  }



  if(type1 > 0){
    var Y46 = 0;
    var Y47= 0;
    var Y48= 0;
    var Y49= 0;
    var Y50= 0;
    var Y51= 0;

    if(f27 == 0.222){
      Y46 = p2_1
    }
    if(f31 == 0.222){
      Y47 = p2_2
    }
    if(f35 == 0.222){
      Y48 = p2_3
    }
    if(f37 == 0.222){
      Y49 = p2_4
    }
    if(f39 == 0.222){
      Y50 = p2_5
    }
    if(f41 == 0.222){
      Y51 = p2_6
    }
   part2_type1_6 = (Y46+Y47+Y48+Y49+Y50+Y51)*type1



    var Z46 = 0;
    var Z47= 0;
    var Z48= 0;
    var Z49= 0;
    var Z50= 0;
    var Z51= 0;

    if(f27 == 0.395){
      Z46 = p2_1
    }
    if(f31 == 0.395){
      Z47 = p2_2
    }
    if(f35 == 0.395){
      Z48 = p2_3
    }
    if(f37 == 0.395){
      Z49 = p2_4
    }
    if(f39 == 0.395){
      Z50 = p2_5
    }
    if(f41 == 0.395){
      Z51 = p2_6
    }
   part2_type1_8 = (Z46+Z47+Z48+Z49+Z50+Z51)*type1





    var AA46 = 0;
    var AA47= 0;
    var AA48= 0;
    var AA49= 0;
    var AA50= 0;
    var AA51= 0;

    if(f27 == 0.616){
      AA46 = p2_1
    }
    if(f31 == 0.616){
      AA47 = p2_2
    }
    if(f35 == 0.616){
      AA48 = p2_3
    }
    if(f37 == 0.616){
      AA49 = p2_4
    }
    if(f39 == 0.616){
      AA50 = p2_5
    }
    if(f41 == 0.616){
      AA51 = p2_6
    }
   part2_type1_10 = (AA46+AA47+AA48+AA49+AA50+AA51)*type1


    var AB46 = 0;
    var AB47= 0;
    var AB48= 0;
    var AB49= 0;
    var AB50= 0;
    var AB51= 0;

    if(f27 == 0.888){
      AB46 = p2_1
    }
    if(f31 == 0.888){
      AB47 = p2_2
    }
    if(f35 == 0.888){
      AB48 = p2_3
    }
    if(f37 == 0.888){
      AB49 = p2_4
    }
    if(f39 == 0.888){
      AB50 = p2_5
    }
    if(f41 == 0.888){
      AB51 = p2_6
    }
   part2_type1_12 = (AB46+AB47+AB48+AB49+AB50+AB51)*type1



    var AC46 = 0;
    var AC47= 0;
    var AC48= 0;
    var AC49= 0;
    var AC50= 0;
    var AC51= 0;

    if(f27 == 1.208){
      AC46 = p2_1
    }
    if(f31 == 1.208){
      AC47 = p2_2
    }
    if(f35 == 1.208){
      AC48 = p2_3
    }
    if(f37 == 1.208){
      AC49 = p2_4
    }
    if(f39 == 1.208){
      AC50 = p2_5
    }
    if(f41 == 1.208){
      AC51 = p2_6
    }
   part2_type1_14 = (AC46+AC47+AC48+AC49+AC50+AC51)*type1


    var AD46 = 0;
    var AD47= 0;
    var AD48= 0;
    var AD49= 0;
    var AD50= 0;
    var AD51= 0;

    if(f27 == 1.579){
      AD46 = p2_1
    }
    if(f31 == 1.579){
      AD47 = p2_2
    }
    if(f35 == 1.579){
      AD48 = p2_3
    }
    if(f37 == 1.579){
      AD49 = p2_4
    }
    if(f39 == 1.579){
      AD50 = p2_5
    }
    if(f41 == 1.579){
      AD51 = p2_6
    }
   part2_type1_16 = (AD46+AD47+AD48+AD49+AD50+AD51)*type1


    var AE46 = 0;
    var AE47= 0;
    var AE48= 0;
    var AE49= 0;
    var AE50= 0;
    var AE51= 0;

    if(f27 == 1.997){
      AE46 = p2_1
    }
    if(f31 == 1.997){
      AE47 = p2_2
    }
    if(f35 == 1.997){
      AE48 = p2_3
    }
    if(f37 == 1.997){
      AE49 = p2_4
    }
    if(f39 == 1.997){
      AE50 = p2_5
    }
    if(f41 == 1.997){
      AE51 = p2_6
    }
   part2_type1_18 = (AE46+AE47+AE48+AE49+AE50+AE51)*type1



    var AF46 = 0;
    var AF47= 0;
    var AF48= 0;
    var AF49= 0;
    var AF50= 0;
    var AF51= 0;

    if(f27 == 2.466){
      AF46 = p2_1
    }
    if(f31 == 2.466){
      AF47 = p2_2
    }
    if(f35 == 2.466){
      AF48 = p2_3
    }
    if(f37 == 2.466){
      AF49 = p2_4
    }
    if(f39 == 2.466){
      AF50 = p2_5
    }
    if(f41 == 2.466){
      AF51 = p2_6
    }
   part2_type1_20 = (AF46+AF47+AF48+AF49+AF50+AF51)*type1


    var AG46 = 0;
    var AG47= 0;
    var AG48= 0;
    var AG49= 0;
    var AG50= 0;
    var AG51= 0;

    if(f27 == 2.984){
      AG46 = p2_1
    }
    if(f31 == 2.984){
      AG47 = p2_2
    }
    if(f35 == 2.984){
      AG48 = p2_3
    }
    if(f37 == 2.984){
      AG49 = p2_4
    }
    if(f39 == 2.984){
      AG50 = p2_5
    }
    if(f41 == 2.984){
      AG51 = p2_6
    }
   part2_type1_22 = (AG46+AG47+AG48+AG49+AG50+AG51)*type1


    var AH46 = 0;
    var AH47= 0;
    var AH48= 0;
    var AH49= 0;
    var AH50= 0;
    var AH51= 0;

    if(f27 == 3.854){
      AH46 = p2_1
    }
    if(f31 == 3.854){
      AH47 = p2_2
    }
    if(f35 == 3.854){
      AH48 = p2_3
    }
    if(f37 == 3.854){
      AH49 = p2_4
    }
    if(f39 == 3.854){
      AH50 = p2_5
    }
    if(f41 == 3.854){
      AH51 = p2_6
    }
   part2_type1_25 = (AH46+AH47+AH48+AH49+AH50+AH51)*type1


   var AI46 = 0;
    var AI47= 0;
    var AI48= 0;
    var AI49= 0;
    var AI50= 0;
    var AI51= 0;

    if(f27 == 4.833){
      AI46 = p2_1
    }
    if(f31 == 4.833){
      AI47 = p2_2
    }
    if(f35 == 4.833){
      AI48 = p2_3
    }
    if(f37 == 4.833){
      AI49 = p2_4
    }
    if(f39 == 4.833){
      AI50 = p2_5
    }
    if(f41 == 4.833){
      AI51 = p2_6
    }
   part2_type1_28 = (AI46+AI47+AI48+AI49+AI50+AI51)*type1



    var AJ46 = 0;
    var AJ47= 0;
    var AJ48= 0;
    var AJ49= 0;
    var AJ50= 0;
    var AJ51= 0;

    if(f27 == 6.313){
      AJ46 = p2_1
    }
    if(f31 == 6.313){
      AJ47 = p2_2
    }
    if(f35 == 6.313){
      AJ48 = p2_3
    }
    if(f37 == 6.313){
      AJ49 = p2_4
    }
    if(f39 == 6.313){
      AJ50 = p2_5
    }
    if(f41 == 6.313){
      AJ51 = p2_6
    }
   part2_type1_32 = (AJ46+AJ47+AJ48+AJ49+AJ50+AJ51)*type1


    var AK46 = 0;
    var AK47= 0;
    var AK48= 0;
    var AK49= 0;
    var AK50= 0;
    var AK51= 0;

    if(f27 == 9.864){
      AK46 = p2_1
    }
    if(f31 == 9.864){
      AK47 = p2_2
    }
    if(f35 == 9.864){
      AK48 = p2_3
    }
    if(f37 == 9.864){
      AK49 = p2_4
    }
    if(f39 == 9.864){
      AK50 = p2_5
    }
    if(f41 == 9.864){
      AK51 = p2_6
    }
   part2_type1_40 = (AK46+AK47+AK48+AK49+AK50+AK51)*type1

  }

  if(type2 > 0){
    var Y52 = 0;
    var Y53= 0;
    var Y54= 0;
    var Y55= 0;
    var Y56= 0;
    var Y57= 0;
    var Y58= 0;

    if(f27 == 0.222){
      Y52 = p2_7
    }
    if(f29 == 0.222){
      Y53 = p2_8
    }
    if(f31 == 0.222){
      Y54 = p2_9
    }
    if(f33 == 0.222){
      Y55 = p2_10
    }
    if(f37 == 0.222){
      Y56 = p2_11
    }
    if(f39 == 0.222){
      Y57 = p2_12
    }
    if(f41 == 0.222){
      Y58 = p2_13
    }
    part2_type2_6 =(Y52+Y53+Y54+Y55+Y56+Y57+Y58)*type2


    var Z52 = 0;
    var Z53= 0;
    var Z54= 0;
    var Z55= 0;
    var Z56= 0;
    var Z57= 0;
    var Z58= 0;

    if(f27 == 0.395){
      Z52 = p2_7
    }
    if(f29 == 0.395){
      Z53 = p2_8
    }
    if(f31 == 0.395){
      Z54 = p2_9
    }
    if(f33 == 0.395){
      Z55 = p2_10
    }
    if(f37 == 0.395){
      Z56 = p2_11
    }
    if(f39 == 0.395){
      Z57 = p2_12
    }
    if(f41 == 0.395){
      Z58 = p2_13
    }
    part2_type2_8 =(Z52+Z53+Z54+Z55+Z56+Z57+Z58)*type2


    var AA52 = 0;
    var AA53= 0;
    var AA54= 0;
    var AA55= 0;
    var AA56= 0;
    var AA57= 0;
    var AA58= 0;

    if(f27 == 0.616){
      AA52 = p2_7
    }
    if(f29 == 0.616){
      AA53 = p2_8
    }
    if(f31 == 0.616){
      AA54 = p2_9
    }
    if(f33 == 0.616){
      AA55 = p2_10
    }
    if(f37 == 0.616){
      AA56 = p2_11
    }
    if(f39 == 0.616){
      AA57 = p2_12
    }
    if(f41 == 0.616){
      AA58 = p2_13
    }
    part2_type2_10 =(AA52+AA53+AA54+AA55+AA56+AA57+AA58)*type2



    var AB52 = 0;
    var AB53= 0;
    var AB54= 0;
    var AB55= 0;
    var AB56= 0;
    var AB57= 0;
    var AB58= 0;

    if(f27 == 0.888){
      AB52 = p2_7
    }
    if(f29 == 0.888){
      AB53 = p2_8
    }
    if(f31 == 0.888){
      AB54 = p2_9
    }
    if(f33 == 0.888){
      AB55 = p2_10
    }
    if(f37 == 0.888){
      AB56 = p2_11
    }
    if(f39 == 0.888){
      AB57 = p2_12
    }
    if(f41 == 0.888){
      AB58 = p2_13
    }
    part2_type2_12 =(AB52+AB53+AB54+AB55+AB56+AB57+AB58)*type2


    var AC52 = 0;
    var AC53= 0;
    var AC54= 0;
    var AC55= 0;
    var AC56= 0;
    var AC57= 0;
    var AC58= 0;

    if(f27 == 1.208){
      AC52 = p2_7
    }
    if(f29 == 1.208){
      AC53 = p2_8
    }
    if(f31 == 1.208){
      AC54 = p2_9
    }
    if(f33 == 1.208){
      AC55 = p2_10
    }
    if(f37 == 1.208){
      AC56 = p2_11
    }
    if(f39 == 1.208){
      AC57 = p2_12
    }
    if(f41 == 1.208){
      AC58 = p2_13
    }
    part2_type2_14 =(AC52+AC53+AC54+AC55+AC56+AC57+AC58)*type2


    var AD52 = 0;
    var AD53= 0;
    var AD54= 0;
    var AD55= 0;
    var AD56= 0;
    var AD57= 0;
    var AD58= 0;

    if(f27 == 1.579){
      AD52 = p2_7
    }
    if(f29 == 1.579){
      AD53 = p2_8
    }
    if(f31 == 1.579){
      AD54 = p2_9
    }
    if(f33 == 1.579){
      AD55 = p2_10
    }
    if(f37 == 1.579){
      AD56 = p2_11
    }
    if(f39 == 1.579){
      AD57 = p2_12
    }
    if(f41 == 1.579){
      AD58 = p2_13
    }
    part2_type2_16 =(AD52+AD53+AD54+AD55+AD56+AD57+AD58)*type2


    var AE52 = 0;
    var AE53= 0;
    var AE54= 0;
    var AE55= 0;
    var AE56= 0;
    var AE57= 0;
    var AE58= 0;

    if(f27 == 1.997){
      AE52 = p2_7
    }
    if(f29 == 1.997){
      AE53 = p2_8
    }
    if(f31 == 1.997){
      AE54 = p2_9
    }
    if(f33 == 1.997){
      AE55 = p2_10
    }
    if(f37 == 1.997){
      AE56 = p2_11
    }
    if(f39 == 1.997){
      AE57 = p2_12
    }
    if(f41 == 1.997){
      AE58 = p2_13
    }
    part2_type2_18 =(AE52+AE53+AE54+AE55+AE56+AE57+AE58)*type2



    var AF52 = 0;
    var AF53= 0;
    var AF54= 0;
    var AF55= 0;
    var AF56= 0;
    var AF57= 0;
    var AF58= 0;

    if(f27 == 2.466){
      AF52 = p2_7
    }
    if(f29 == 2.466){
      AF53 = p2_8
    }
    if(f31 == 2.466){
      AF54 = p2_9
    }
    if(f33 == 2.466){
      AF55 = p2_10
    }
    if(f37 == 2.466){
      AF56 = p2_11
    }
    if(f39 == 2.466){
      AF57 = p2_12
    }
    if(f41 == 2.466){
      AF58 = p2_13
    }
    part2_type2_20 =(AF52+AF53+AF54+AF55+AF56+AF57+AF58)*type2


    var AG52 = 0;
    var AG53= 0;
    var AG54= 0;
    var AG55= 0;
    var AG56= 0;
    var AG57= 0;
    var AG58= 0;

    if(f27 == 2.984){
      AG52 = p2_7
    }
    if(f29 == 2.984){
      AG53 = p2_8
    }
    if(f31 == 2.984){
      AG54 = p2_9
    }
    if(f33 == 2.984){
      AG55 = p2_10
    }
    if(f37 == 2.984){
      AG56 = p2_11
    }
    if(f39 == 2.984){
      AG57 = p2_12
    }
    if(f41 == 2.984){
      AG58 = p2_13
    }
    part2_type2_22 =(AG52+AG53+AG54+AG55+AG56+AG57+AG58)*type2


    var AH52 = 0;
    var AH53= 0;
    var AH54= 0;
    var AH55= 0;
    var AH56= 0;
    var AH57= 0;
    var AH58= 0;

    if(f27 == 3.854){
      AH52 = p2_7
    }
    if(f29 == 3.854){
      AH53 = p2_8
    }
    if(f31 == 3.854){
      AH54 = p2_9
    }
    if(f33 == 3.854){
      AH55 = p2_10
    }
    if(f37 == 3.854){
      AH56 = p2_11
    }
    if(f39 == 3.854){
      AH57 = p2_12
    }
    if(f41 == 3.854){
      AH58 = p2_13
    }
    part2_type2_25 =(AH52+AH53+AH54+AH55+AH56+AH57+AH58)*type2


    var AI52 = 0;
    var AI53= 0;
    var AI54= 0;
    var AI55= 0;
    var AI56= 0;
    var AI57= 0;
    var AI58= 0;

    if(f27 == 4.833){
      AI52 = p2_7
    }
    if(f29 == 4.833){
      AI53 = p2_8
    }
    if(f31 == 4.833){
      AI54 = p2_9
    }
    if(f33 == 4.833){
      AI55 = p2_10
    }
    if(f37 == 4.833){
      AI56 = p2_11
    }
    if(f39 == 4.833){
      AI57 = p2_12
    }
    if(f41 == 4.833){
      AI58 = p2_13
    }
    part2_type2_28 =(AI52+AI53+AI54+AI55+AI56+AI57+AI58)*type2


    var AJ52 = 0;
    var AJ53= 0;
    var AJ54= 0;
    var AJ55= 0;
    var AJ56= 0;
    var AJ57= 0;
    var AJ58= 0;

    if(f27 == 6.313){
      AJ52 = p2_7
    }
    if(f29 == 6.313){
      AJ53 = p2_8
    }
    if(f31 == 6.313){
      AJ54 = p2_9
    }
    if(f33 == 6.313){
      AJ55 = p2_10
    }
    if(f37 == 6.313){
      AJ56 = p2_11
    }
    if(f39 == 6.313){
      AJ57 = p2_12
    }
    if(f41 == 6.313){
      AJ58 = p2_13
    }
    part2_type2_32 =(AJ52+AJ53+AJ54+AJ55+AJ56+AJ57+AJ58)*type2



    var AK52 = 0;
    var AK53= 0;
    var AK54= 0;
    var AK55= 0;
    var AK56= 0;
    var AK57= 0;
    var AK58= 0;

    if(f27 == 9.864){
      AK52 = p2_7
    }
    if(f29 == 9.864){
      AK53 = p2_8
    }
    if(f31 == 9.864){
      AK54 = p2_9
    }
    if(f33 == 9.864){
      AK55 = p2_10
    }
    if(f37 == 9.864){
      AK56 = p2_11
    }
    if(f39 == 9.864){
      AK57 = p2_12
    }
    if(f41 == 9.864){
      AK58 = p2_13
    }
    part2_type2_40 =(AK52+AK53+AK54+AK55+AK56+AK57+AK58)*type2

  }


  if(type3 > 0){
    var Y59 = 0;
    var Y60 = 0;
    var Y61 = 0;
    var Y62 = 0;
    var Y63 = 0;
    var Y64 = 0;
    var Y65 = 0;
    
    if(f27 == 0.222){
      Y59 = p2_14;
    }
    if(f29 == 0.222){
      Y60 = p2_15;
    }
    if(f31 == 0.222){
      Y61 = p2_16;
    }
    if(f33 == 0.222){
      Y62 = p2_17;
    }
    if(f37 == 0.222){
      Y63 = p2_18;
    }
    if(f39 == 0.222){
      Y64 = p2_19;
    }
    if(f41 == 0.222){
      Y65 = p2_20;
    }
    part2_type3_6 =(Y59+Y60+Y61+Y62+Y63+Y64+Y65)*type3




    var Z59 = 0;
    var Z60 = 0;
    var Z61 = 0;
    var Z62 = 0;
    var Z63 = 0;
    var Z64 = 0;
    var Z65 = 0;
    
    if(f27 == 0.395){
      Z59 = p2_14;
    }
    if(f29 == 0.395){
      Z60 = p2_15;
    }
    if(f31 == 0.395){
      Z61 = p2_16;
    }
    if(f33 == 0.395){
      Z62 = p2_17;
    }
    if(f37 == 0.395){
      Z63 = p2_18;
    }
    if(f39 == 0.395){
      Z64 = p2_19;
    }
    if(f41 == 0.395){
      Z65 = p2_20;
    }
    part2_type3_8 =(Z59+Z60+Z61+Z62+Z63+Z64+Z65)*type3



    var AA59 = 0;
    var AA60 = 0;
    var AA61 = 0;
    var AA62 = 0;
    var AA63 = 0;
    var AA64 = 0;
    var AA65 = 0;
    
    if(f27 == 0.616){
      AA59 = p2_14;
    }
    if(f29 == 0.616){
      AA60 = p2_15;
    }
    if(f31 == 0.616){
      AA61 = p2_16;
    }
    if(f33 == 0.616){
      AA62 = p2_17;
    }
    if(f37 == 0.616){
      AA63 = p2_18;
    }
    if(f39 == 0.616){
      AA64 = p2_19;
    }
    if(f41 == 0.616){
      AA65 = p2_20;
    }
    part2_type3_10 =(AA59+AA60+AA61+AA62+AA63+AA64+AA65)*type3



    var AB59 = 0;
    var AB60 = 0;
    var AB61 = 0;
    var AB62 = 0;
    var AB63 = 0;
    var AB64 = 0;
    var AB65 = 0;
    
    if(f27 == 0.888){
      AB59 = p2_14;
    }
    if(f29 == 0.888){
      AB60 = p2_15;
    }
    if(f31 == 0.888){
      AB61 = p2_16;
    }
    if(f33 == 0.888){
      AB62 = p2_17;
    }
    if(f37 == 0.888){
      AB63 = p2_18;
    }
    if(f39 == 0.888){
      AB64 = p2_19;
    }
    if(f41 == 0.888){
      AB65 = p2_20;
    }
    part2_type3_12 =(AB59+AB60+AB61+AB62+AB63+AB64+AB65)*type3

     var AC59 = 0;
    var AC60 = 0;
    var AC61 = 0;
    var AC62 = 0;
    var AC63 = 0;
    var AC64 = 0;
    var AC65 = 0;
    
    if(f27 == 1.208){
      AC59 = p2_14;
    }
    if(f29 == 1.208){
      AC60 = p2_15;
    }
    if(f31 == 1.208){
      AC61 = p2_16;
    }
    if(f33 == 1.208){
      AC62 = p2_17;
    }
    if(f37 == 1.208){
      AC63 = p2_18;
    }
    if(f39 == 1.208){
      AC64 = p2_19;
    }
    if(f41 == 1.208){
      AC65 = p2_20;
    }
    part2_type3_14 =(AC59+AC60+AC61+AC62+AC63+AC64+AC65)*type3



    var AD59 = 0;
    var AD60 = 0;
    var AD61 = 0;
    var AD62 = 0;
    var AD63 = 0;
    var AD64 = 0;
    var AD65 = 0;
    
    if(f27 == 1.579){
      AD59 = p2_14;
    }
    if(f29 == 1.579){
      AD60 = p2_15;
    }
    if(f31 == 1.579){
      AD61 = p2_16;
    }
    if(f33 == 1.579){
      AD62 = p2_17;
    }
    if(f37 == 1.579){
      AD63 = p2_18;
    }
    if(f39 == 1.579){
      AD64 = p2_19;
    }
    if(f41 == 1.579){
      AD65 = p2_20;
    }
    part2_type3_16 =(AD59+AD60+AD61+AD62+AD63+AD64+AD65)*type3



    var AE59 = 0;
    var AE60 = 0;
    var AE61 = 0;
    var AE62 = 0;
    var AE63 = 0;
    var AE64 = 0;
    var AE65 = 0;
    
    if(f27 == 1.997){
      AE59 = p2_14;
    }
    if(f29 == 1.997){
      AE60 = p2_15;
    }
    if(f31 == 1.997){
      AE61 = p2_16;
    }
    if(f33 == 1.997){
      AE62 = p2_17;
    }
    if(f37 == 1.997){
      AE63 = p2_18;
    }
    if(f39 == 1.997){
      AE64 = p2_19;
    }
    if(f41 == 1.997){
      AE65 = p2_20;
    }
    part2_type3_18 =(AE59+AE60+AE61+AE62+AE63+AE64+AE65)*type3



    var AF59 = 0;
    var AF60 = 0;
    var AF61 = 0;
    var AF62 = 0;
    var AF63 = 0;
    var AF64 = 0;
    var AF65 = 0;
    
    if(f27 == 2.466){
      AF59 = p2_14;
    }
    if(f29 == 2.466){
      AF60 = p2_15;
    }
    if(f31 == 2.466){
      AF61 = p2_16;
    }
    if(f33 == 2.466){
      AF62 = p2_17;
    }
    if(f37 == 2.466){
      AF63 = p2_18;
    }
    if(f39 == 2.466){
      AF64 = p2_19;
    }
    if(f41 == 2.466){
      AF65 = p2_20;
    }
    part2_type3_20 =(AF59+AF60+AF61+AF62+AF63+AF64+AF65)*type3


    var AG59 = 0;
    var AG60 = 0;
    var AG61 = 0;
    var AG62 = 0;
    var AG63 = 0;
    var AG64 = 0;
    var AG65 = 0;
    
    if(f27 == 2.984){
      AG59 = p2_14;
    }
    if(f29 == 2.984){
      AG60 = p2_15;
    }
    if(f31 == 2.984){
      AG61 = p2_16;
    }
    if(f33 == 2.984){
      AG62 = p2_17;
    }
    if(f37 == 2.984){
      AG63 = p2_18;
    }
    if(f39 == 2.984){
      AG64 = p2_19;
    }
    if(f41 == 2.984){
      AG65 = p2_20;
    }
    part2_type3_22 =(AG59+AG60+AG61+AG62+AG63+AG64+AG65)*type3


    var AH59 = 0;
    var AH60 = 0;
    var AH61 = 0;
    var AH62 = 0;
    var AH63 = 0;
    var AH64 = 0;
    var AH65 = 0;
    
    if(f27 == 3.854){
      AH59 = p2_14;
    }
    if(f29 == 3.854){
      AH60 = p2_15;
    }
    if(f31 == 3.854){
      AH61 = p2_16;
    }
    if(f33 == 3.854){
      AH62 = p2_17;
    }
    if(f37 == 3.854){
      AH63 = p2_18;
    }
    if(f39 == 3.854){
      AH64 = p2_19;
    }
    if(f41 == 3.854){
      AH65 = p2_20;
    }
    part2_type3_25 =(AH59+AH60+AH61+AH62+AH63+AH64+AH65)*type3



    var AI59 = 0;
    var AI60 = 0;
    var AI61 = 0;
    var AI62 = 0;
    var AI63 = 0;
    var AI64 = 0;
    var AI65 = 0;
    
    if(f27 == 4.833){
      AI59 = p2_14;
    }
    if(f29 == 4.833){
      AI60 = p2_15;
    }
    if(f31 == 4.833){
      AI61 = p2_16;
    }
    if(f33 == 4.833){
      AI62 = p2_17;
    }
    if(f37 == 4.833){
      AI63 = p2_18;
    }
    if(f39 == 4.833){
      AI64 = p2_19;
    }
    if(f41 == 4.833){
      AI65 = p2_20;
    }
    part2_type3_28 =(AI59+AI60+AI61+AI62+AI63+AI64+AI65)*type3

    var AJ59 = 0;
    var AJ60 = 0;
    var AJ61 = 0;
    var AJ62 = 0;
    var AJ63 = 0;
    var AJ64 = 0;
    var AJ65 = 0;
    
    if(f27 == 6.313){
      AJ59 = p2_14;
    }
    if(f29 == 6.313){
      AJ60 = p2_15;
    }
    if(f31 == 6.313){
      AJ61 = p2_16;
    }
    if(f33 == 6.313){
      AJ62 = p2_17;
    }
    if(f37 == 6.313){
      AJ63 = p2_18;
    }
    if(f39 == 6.313){
      AJ64 = p2_19;
    }
    if(f41 == 6.313){
      AJ65 = p2_20;
    }
    part2_type3_32 =(AJ59+AJ60+AJ61+AJ62+AJ63+AJ64+AJ65)*type3

    var AK59 = 0;
    var AK60 = 0;
    var AK61 = 0;
    var AK62 = 0;
    var AK63 = 0;
    var AK64 = 0;
    var AK65 = 0;
    
    if(f27 == 9.864){
      AK59 = p2_14;
    }
    if(f29 == 9.864){
      AK60 = p2_15;
    }
    if(f31 == 9.864){
      AK61 = p2_16;
    }
    if(f33 == 9.864){
      AK62 = p2_17;
    }
    if(f37 == 9.864){
      AK63 = p2_18;
    }
    if(f39 == 9.864){
      AK64 = p2_19;
    }
    if(f41 == 9.864){
      AK65 = p2_20;
    }
    part2_type3_40 =(AK59+AK60+AK61+AK62+AK63+AK64+AK65)*type3
    

  }


  if(type4 > 0){
   var Y66 = 0;
   var Y67 = 0;
   var Y68 = 0;
   var Y69 = 0;

   if(f27 == 0.222){
     Y66 = p2_21;
   }
   if(f29 == 0.222){
     Y67 = p2_22;
   }
   if(f37 == 0.222){
     Y68 = p2_23;
   }
   if(f41 == 0.222){
     Y69 = p2_24;
   }
   part2_type4_6 =(Y66+Y67+Y68+Y69)*type4



   var Z66 = 0;
   var Z67 = 0;
   var Z68 = 0;
   var Z69 = 0;

   if(f27 == 0.395){
     Z66 = p2_21;
   }
   if(f29 == 0.395){
     Z67 = p2_22;
   }
   if(f37 == 0.395){
     Z68 = p2_23;
   }
   if(f41 == 0.395){
     Z69 = p2_24;
   }
   part2_type4_8 =(Z66+Z67+Z68+Z69)*type4

   var AA66 = 0;
   var AA67 = 0;
   var AA68 = 0;
   var AA69 = 0;

   if(f27 == 0.616){
     AA66 = p2_21;
   }
   if(f29 == 0.616){
     AA67 = p2_22;
   }
   if(f37 == 0.616){
     AA68 = p2_23;
   }
   if(f41 == 0.616){
     AA69 = p2_24;
   }
   part2_type4_10 =(AA66+AA67+AA68+AA69)*type4


   var AB66 = 0;
   var AB67 = 0;
   var AB68 = 0;
   var AB69 = 0;

   if(f27 == 0.888){
     AB66 = p2_21;
   }
   if(f29 == 0.888){
     AB67 = p2_22;
   }
   if(f37 == 0.888){
     AB68 = p2_23;
   }
   if(f41 == 0.888){
     AB69 = p2_24;
   }
   part2_type4_12 =(AB66+AB67+AB68+AB69)*type4

   var AC66 = 0;
   var AC67 = 0;
   var AC68 = 0;
   var AC69 = 0;

   if(f27 == 1.208){
     AC66 = p2_21;
   }
   if(f29 == 1.208){
     AC67 = p2_22;
   }
   if(f37 == 1.208){
     AC68 = p2_23;
   }
   if(f41 == 1.208){
     AC69 = p2_24;
   }
   part2_type4_14 =(AC66+AC67+AC68+AC69)*type4


   var AD66 = 0; 
   var AD67 = 0;
   var AD68 = 0;
   var AD69 = 0;

   if(f27 == 1.579){
     AD66 = p2_21;
   }
   if(f29 == 1.579){
     AD67 = p2_22;
   }
   if(f37 == 1.579){
     AD68 = p2_23;
   }
   if(f41 == 1.579){
     AD69 = p2_24;
   }
   part2_type4_16 =(AD66+AD67+AD68+AD69)*type4


   var AE66 = 0; 
   var AE67 = 0;
   var AE68 = 0;
   var AE69 = 0;

   if(f27 == 1.997){
     AE66 = p2_21;
   }
   if(f29 == 1.997){
     AE67 = p2_22;
   }
   if(f37 == 1.997){
     AE68 = p2_23;
   }
   if(f41 == 1.997){
     AE69 = p2_24;
   }
   part2_type4_18 =(AE66+AE67+AE68+AE69)*type4


   var AF66 = 0; 
   var AF67 = 0;
   var AF68 = 0;
   var AF69 = 0;

   if(f27 == 2.466){
     AF66 = p2_21;
   }
   if(f29 == 2.466){
     AF67 = p2_22;
   }
   if(f37 == 2.466){
     AF68 = p2_23;
   }
   if(f41 == 2.466){
     AF69 = p2_24;
   }
   part2_type4_20 =(AF66+AF67+AF68+AF69)*type4



   var AG66 = 0; 
   var AG67 = 0;
   var AG68 = 0;
   var AG69 = 0;

   if(f27 == 2.984){
     AG66 = p2_21;
   }
   if(f29 == 2.984){
     AG67 = p2_22;
   }
   if(f37 == 2.984){
     AG68 = p2_23;
   }
   if(f41 == 2.984){
     AG69 = p2_24;
   }
   part2_type4_22 =(AG66+AG67+AG68+AG69)*type4

   var AH66 = 0; 
   var AH67 = 0;
   var AH68 = 0;
   var AH69 = 0;

   if(f27 == 3.854){
     AH66 = p2_21;
   }
   if(f29 == 3.854){
     AH67 = p2_22;
   }
   if(f37 == 3.854){
     AH68 = p2_23;
   }
   if(f41 == 3.854){
     AH69 = p2_24;
   }
   part2_type4_25 =(AH66+AH67+AH68+AH69)*type4


   var AI66 = 0; 
   var AI67 = 0;
   var AI68 = 0;
   var AI69 = 0;

   if(f27 == 4.833){
     AI66 = p2_21;
   }
   if(f29 == 4.833){
     AI67 = p2_22;
   }
   if(f37 == 4.833){
     AI68 = p2_23;
   }
   if(f41 == 4.833){
     AI69 = p2_24;
   }
   part2_type4_28 =(AI66+AI67+AI68+AI69)*type4


   var AJ66 = 0; 
   var AJ67 = 0;
   var AJ68 = 0;
   var AJ69 = 0;

   if(f27 == 6.313){
     AJ66 = p2_21;
   }
   if(f29 == 6.313){
     AJ67 = p2_22;
   }
   if(f37 == 6.313){
     AJ68 = p2_23;
   }
   if(f41 == 6.313){
     AJ69 = p2_24;
   }
   part2_type4_32 =(AJ66+AJ67+AJ68+AJ69)*type4


   var AK66 = 0; 
   var AK67 = 0;
   var AK68 = 0;
   var AK69 = 0;

   if(f27 == 9.864){
     AK66 = p2_21;
   }
   if(f29 == 9.864){
     AK67 = p2_22;
   }
   if(f37 == 9.864){
     AK68 = p2_23;
   }
   if(f41 == 9.864){
     AK69 = p2_24;
   }
   part2_type4_40 =(AK66+AK67+AK68+AK69)*type4

  }

  if(f43 == 0.222){
    ExtraY = p2_25*this.No_of_units;
   }
   if(f43 == J){
    ExtraZ = p2_25*this.No_of_units;
   }
   if(f43 == K){
    ExtraAA = p2_25*this.No_of_units;
   }
   if(f43 == L){
    ExtraAB = p2_25*this.No_of_units;
   }
   if(f43 == M){
    ExtraAC = p2_25*this.No_of_units;
   }
   if(f43 == N){
    ExtraAD = p2_25*this.No_of_units;
   }
   if(f43 == O){
    ExtraAE = p2_25*this.No_of_units;
   }
   if(f43 == P){
    ExtraAF = p2_25*this.No_of_units;
   }
   if(f43 == Q){
    ExtraAG = p2_25*this.No_of_units;
   }
   if(f43 == R){
    ExtraAH = p2_25*this.No_of_units;
   }
   if(f43 == S){
    ExtraAI = p2_25*this.No_of_units;
   }
   if(f43 == T){
    ExtraAJ = p2_25*this.No_of_units;
   }
   if(f43 == U){
    ExtraAK = p2_25*this.No_of_units;
   }


  let pt1_ringSum =  pre6 +pre8 +pre10 +pre12 +pre14 +pre16 +pre18 +pre20 +pre22 +pre25 +pre28 +pre32 +pre40;
  let mainsteelI = ((type1_6+type2_6+type3_6+type4_6)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelJ = ((type1_8+type2_8+type3_8+type4_8)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelK = ((type1_10+type2_10+type3_10+type4_10)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelL = ((type1_12+type2_12+type3_12+type4_12)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelM = ((type1_14+type2_14+type3_14+type4_14)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelN = ((type1_16+type2_16+type3_16+type4_16)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelO = ((type1_18+type2_18+type3_18+type4_18)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelP = ((type1_20+type2_20+type3_20+type4_20)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelQ = ((type1_22+type2_22+type3_22+type4_22)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelR = ((type1_25+type2_25+type3_25+type4_25)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelS = ((type1_28+type2_28+type3_28+type4_28)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelT = ((type1_32+type2_32+type3_32+type4_32)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelU = ((type1_40+type2_40+type3_40+type4_40)*(1+this.ch1AD))*this.No_of_units;


  let mainsteelY = ((part2_type1_6+part2_type2_6+part2_type3_6+part2_type4_6)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelZ = ((part2_type1_8+part2_type2_8+part2_type3_8+part2_type4_8)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAA = ((part2_type1_10+part2_type2_10+part2_type3_10+part2_type4_10)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAB = ((part2_type1_12+part2_type2_12+part2_type3_12+part2_type4_12)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAC = ((part2_type1_14+part2_type2_14+part2_type3_14+part2_type4_14)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAD = ((part2_type1_16+part2_type2_16+part2_type3_16+part2_type4_16)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAE = ((part2_type1_18+part2_type2_18+part2_type3_18+part2_type4_18)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAF = ((part2_type1_20+part2_type2_20+part2_type3_20+part2_type4_20)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAG = ((part2_type1_22+part2_type2_22+part2_type3_22+part2_type4_22)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAH = ((part2_type1_25+part2_type2_25+part2_type3_25+part2_type4_25)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAI = ((part2_type1_28+part2_type2_28+part2_type3_28+part2_type4_28)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAJ = ((part2_type1_32+part2_type2_32+part2_type3_32+part2_type4_32)*(1+this.ch1AD))*this.No_of_units;
  let mainsteelAK = ((part2_type1_40+part2_type2_40+part2_type3_40+part2_type4_40)*(1+this.ch1AD))*this.No_of_units;

  let orderI = pre6+ExtraI+mainsteelI;
  let orderJ = pre8+ExtraJ+mainsteelJ;
  let orderK = pre10+ExtraK+mainsteelK;
  let orderL = pre12+ExtraL+mainsteelL;
  let orderM = pre14+ExtraM+mainsteelM;
  let orderN = pre16+ExtraN+mainsteelN;
  let orderO = pre18+ExtraO+mainsteelO;
  let orderP = pre20+ExtraP+mainsteelP;
  let orderQ = pre22+ExtraQ+mainsteelQ;
  let orderR = pre25+ExtraR+mainsteelR;
  let orderS = pre28+ExtraS+mainsteelS;
  let orderT = pre32+ExtraT+mainsteelT;
  let orderU = pre40+ExtraU+mainsteelU;


  let orderY  = ExtraY+mainsteelY;
  let orderZ  = ExtraZ+mainsteelZ;
  let orderAA = ExtraAA+mainsteelAA;
  let orderAB = ExtraAB+mainsteelAB;
  let orderAC = ExtraAC+mainsteelAC;
  let orderAD = ExtraAD+mainsteelAD;
  let orderAE = ExtraAE+mainsteelAE;
  let orderAF = ExtraAF+mainsteelAF;
  let orderAG = ExtraAG+mainsteelAG;
  let orderAH = ExtraAH+mainsteelAH;
  let orderAI = ExtraAI+mainsteelAI;
  let orderAJ = ExtraAJ+mainsteelAJ;
  let orderAK = ExtraAK+mainsteelAK;

  this.Y6  = orderI+orderY;
  this.Y8  = orderJ+orderZ;
  this.Y10 = orderK+orderAA;
  this.Y12 = orderL+orderAB;
  this.Y14 = orderM+orderAC;
  this.Y16 = orderN+orderAD;
  this.Y18 = orderO+orderAE;
  this.Y20 = orderP+orderAF;
  this.Y22 = orderQ+orderAG;
  this.Y25 = orderR+orderAH;
  this.Y28 = orderS+orderAI;
  this.Y32 = orderT+orderAJ;
  this.Y40 = orderU+orderAK;

  this.totalfinalorderinKg = this.Y6+this.Y8 +this.Y10+this.Y12+this.Y14+this.Y16+this.Y18+this.Y20+this.Y22+this.Y25+this.Y28+this.Y32+this.Y40;
  this.totalfinalorderinTon = (this.Y6/1000)+(this.Y8/1000) +(this.Y10/1000)+(this.Y12/1000)+(this.Y14/1000)+(this.Y16/1000)+(this.Y18/1000)+(this.Y20/1000)+(this.Y22/1000)+(this.Y25/1000)+(this.Y28/1000)+(this.Y32/1000)+(this.Y40/1000);

    this.ConcQtym3 =this.Unit_width*this.Unit_length*this.Unit_height*this.No_of_units;
    this.Steelringonlykg = pt1_ringSum;
    this.Mainsteelonlykg = this.totalfinalorderinKg-this.Steelringonlykg;
    if(this.ConcQtym3 > 0){
      this.persteelkgm3 = this.totalfinalorderinKg-this.ConcQtym3;
    }
    if(Totallengthofrings>0){
      this.persteelringkgm3 = this.Steelringonlykg-this.ConcQtym3;
    }   
    this.permainsteelkgm3 = this.Mainsteelonlykg/this.ConcQtym3;

}





}

