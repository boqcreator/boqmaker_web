import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editvaritiondetails',
  templateUrl: './editvaritiondetails.page.html',
  styleUrls: ['./editvaritiondetails.page.scss'],
})
export class EditvaritiondetailsPage implements OnInit {
  item;
  pid;
  segment = "d"
  itemsegment = "finish"
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
  constructor(private afs : AngularFirestore,
    private loadingController: LoadingController,
    private modalController: ModalController
    ) { }

  ngOnInit() {

this.ceiling= this.item.variation.ceiling;
this.floor= this.item.variation.floor;
this.walls= this.item.variation.walls;
this.cornice= this.item.variation.cornice;
this.skirting= this.item.variation.skirting;
this.shuttering= this.item.variation.shuttering;
this.block= this.item.variation.block;
this.blockdpc= this.item.variation.blockdpc;
this.concrete= this.item.variation.concrete;
this.polythene= this.item.variation.polythene;
this.bitumin= this.item.variation.bitumin;
this.itemsteel= this.item.variation.itemsteel;
this.blockbitumin= this.item.variation.blockbitumin;
this.FILL_Percentage= this.item.variation.FILL_Percentage;
this.E_Percentage= this.item.variation.E_Percentage;
this.I_DIS= this.item.variation.I_DIS;
this.I_FACTOR= this.item.variation.I_FACTOR;
this.Exp_Percentage= this.item.variation.Exp_Percentage;
this.Concb_Percentage= this.item.variation.Concb_Percentage;
this.iqty= this.item.variation.iqty;
this.itempercentage= this.item.variation.itempercentage;
this.completion= this.item.variation.completion;
this.itemprecast= this.item.variation.itemprecast;
this.existing=this.item.variation.existing;
this.existing1= this.item.variation.existing1;
this.existing2=this.item.variation.existing2;
this.tsp= this.item.variation.tsp;
this.bpp= this.item.variation.bpp;
this.spp1= this.item.variation.spp1;
this.spp2= this.item.variation.spp2;
this.spp3= this.item.variation.spp3
this.spp4= this.item.variation.spp4
this.tpp= this.item.variation.tpp
this.bbp= this.item.variation.bbp
this.sbp1= this.item.variation.sbp1
this.sbp2= this.item.variation.sbp2
this.sbp3= this.item.variation.sbp3
this.sbp4= this.item.variation.sbp4
this.tep= this.item.variation.tep
this.tbp= this.item.variation.tbp
this.bep= this.item.variation.bep
this.sep1= this.item.variation.sep1
this.sep2= this.item.variation.sep2
this.sep3= this.item.variation.sep3
this.sep4= this.item.variation.sep4
this.bsp= this.item.variation.bsp
this.ssp1= this.item.variation.ssp1
this.ssp2= this.item.variation.ssp2
this.ssp3= this.item.variation.ssp3
this.ssp4= this.item.variation.ssp4
this.ich1A =  this.item.variation.ich1A 
this.ich1B =  this.item.variation.ich1B 
this.ich1C =  this.item.variation.ich1C 
this.ich1D =  this.item.variation.ich1D 
this.ich1E =  this.item.variation.ich1E 
this.ich1F =  this.item.variation.ich1F 
this.ich1G =  this.item.variation.ich1G 
this.ich1H =  this.item.variation.ich1H 
this.ich1I =  this.item.variation.ich1I 
this.ich1J =  this.item.variation.ich1J 
this.ich1K =  this.item.variation.ich1K 
this.ich1L =  this.item.variation.ich1L 
this.ich1M =  this.item.variation.ich1M 
this.ich1N =  this.item.variation.ich1N 
this.ich1O =  this.item.variation.ich1O 
this.ich1P =  this.item.variation.ich1P 
this.ich1Q =  this.item.variation.ich1Q 
this.ich1R =  this.item.variation.ich1R 
this.ich1S =  this.item.variation.ich1S 
this.ich1T =  this.item.variation.ich1T 
this.ich1U = this.item.variation.ich1U 
this.ich1V = this.item.variation.ich1V 
this.ich1W = this.item.variation.ich1W 
this.ich1X = this.item.variation.ich1X 
this.ich1Y = this.item.variation.ich1Y 
this.ich1Z = this.item.variation.ich1Z 
this.ich1AA = this.item.variation.ich1AA 
this.ich1AB = this.item.variation.ich1AB 
this.ich1AC = this.item.variation.ich1AC 
this.ich1AD = this.item.variation.ich1AD 
this.ich1AE = this.item.variation.ich1AE 
this.ich1AF = this.item.variation.ich1AF 
this.ich1AG = this.item.variation.ich1AG 
this.ich1AH = this.item.variation.ich1AH 
this.ich1AI = this.item.variation.ich1AI 
this.ich1AJ = this.item.variation.ich1AJ 
this.ich1AK = this.item.variation.ich1AK 
this.ich1AL = this.item.variation.ich1AL 
this.ich1AM = this.item.variation.ich1AM 
this.ich1AN = this.item.variation.ich1AN 
this.ich1AO = this.item.variation.ich1AO 
this.ich2A =  this.item.variation.ich2A 
this.ich2B =  this.item.variation.ich2B 
this.ich2C =  this.item.variation.ich2C 
this.ich2D =  this.item.variation.ich2D 
this.ich2E =  this.item.variation.ich2E 
this.ich2F =  this.item.variation.ich2F 
this.ich2G =  this.item.variation.ich2G 
this.ich2H =  this.item.variation.ich2H 
this.ich2I =  this.item.variation.ich2I 
this.ich2J =  this.item.variation.ich2J 
this.ich2K =  this.item.variation.ich2K 
this.ich2L =  this.item.variation.ich2L 
this.ich2M =  this.item.variation.ich2M 
this.ich2N =  this.item.variation.ich2N 
this.ich2O =  this.item.variation.ich2O 
this.ich2P =  this.item.variation.ich2P 
this.ich2Q =  this.item.variation.ich2Q 
this.ich2R =  this.item.variation.ich2R 
this.ich2S =  this.item.variation.ich2S 
this.ich2T =  this.item.variation.ich2T 
this.ich2U = this.item.variation.ich2U 
this.ich2V = this.item.variation.ich2V 
this.ich2W = this.item.variation.ich2W 
this.ich2X = this.item.variation.ich2X 
this.ich2Y = this.item.variation.ich2Y 
this.ich2Z = this.item.variation.ich2Z 
this.ich2AA = this.item.variation.ich2AA 
this.ich2AB = this.item.variation.ich2AB 
this.ich2AC = this.item.variation.ich2AC 
this.ich2AD = this.item.variation.ich2AD 
this.ich2AE = this.item.variation.ich2AE 
this.ich2AF = this.item.variation.ich2AF 
this.ich2AG = this.item.variation.ich2AG 
this.ich2AH = this.item.variation.ich2AH 
this.ich2AI = this.item.variation.ich2AI 
this.ich2AJ = this.item.variation.ich2AJ 
this.ich2AK = this.item.variation.ich2AK 
this.ich2AL = this.item.variation.ich2AL 
this.ich2AM = this.item.variation.ich2AM 
this.ich2AN = this.item.variation.ich2AN 
this.ich2AO = this.item.variation.ich2AO 
this.ich3A =  this.item.variation.ich3A 
this.ich3B =  this.item.variation.ich3B 
this.ich3C =  this.item.variation.ich3C 
this.ich3D =  this.item.variation.ich3D 
this.ich3E =  this.item.variation.ich3E 
this.ich3F =  this.item.variation.ich3F 
this.ich3G =  this.item.variation.ich3G 
this.ich3H =  this.item.variation.ich3H 
this.ich3I =  this.item.variation.ich3I 
this.ich3J =  this.item.variation.ich3J 
this.ich3K =  this.item.variation.ich3K 
this.ich3L =  this.item.variation.ich3L 
this.ich3M =  this.item.variation.ich3M 
this.ich3N =  this.item.variation.ich3N 
this.ich3O =  this.item.variation.ich3O 
this.ich3P =  this.item.variation.ich3P 
this.ich3Q =  this.item.variation.ich3Q 
this.ich3R =  this.item.variation.ich3R 
this.ich3S =  this.item.variation.ich3S 
this.ich3T =  this.item.variation.ich3T 
this.ich3U = this.item.variation.ich3U 
this.ich3V = this.item.variation.ich3V 
this.ich3W = this.item.variation.ich3W 
this.ich3X = this.item.variation.ich3X 
this.ich3Y = this.item.variation.ich3Y 
this.ich3Z = this.item.variation.ich3Z 
this.ich3AA = this.item.variation.ich3AA 
this.ich3AB = this.item.variation.ich3AB 
this.ich3AC = this.item.variation.ich3AC 
this.ich3AD = this.item.variation.ich3AD 
this.ich3AE = this.item.variation.ich3AE 
this.ich3AF = this.item.variation.ich3AF 
this.ich3AG = this.item.variation.ich3AG 
this.ich3AH = this.item.variation.ich3AH 
this.ich3AI = this.item.variation.ich3AI 
this.ich3AJ = this.item.variation.ich3AJ 
this.ich3AK = this.item.variation.ich3AK 
this.ich3AL = this.item.variation.ich3AL 
this.ich3AM = this.item.variation.ich3AM 
this.ich3AN = this.item.variation.ich3AN 
this.ich3AO = this.item.variation.ich3AO 
  }

  checkOMM(){
    if(this.existing == "true"){
      this.existing1 = "false"
    }
  }
  checkOMM1(){
    if(this.existing1 == "true"){
      this.existing = "false"
    }
  }

  async updataedetails(){
    const loading = await this.loadingController.create({
      message: 'Updating details...',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();

  this.afs.doc<any>(`boq/boq/projects/${this.pid}/variations/${this.item.id}`).update({
  "variation.ceiling" : this.ceiling,
  "variation.floor": this.floor,
  "variation.walls": this.walls,
  "variation.cornice": this.cornice,
  "variation.skirting": this.skirting,
  "variation.shuttering": this.shuttering,
  "variation.block": this.block,
  "variation.blockdpc": this.blockdpc,
  "variation.concrete": this.concrete,
  "variation.polythene": this.polythene,
  "variation.bitumin": this.bitumin,
  "variation.itemsteel": this.itemsteel,
  "variation.blockbitumin": this.blockbitumin,
  "variation.iqty": this.iqty,
  "variation.itempercentage": this.itempercentage,
  "variation.completion": this.completion,
  "variation.itemprecast": this.itemprecast,
  "variation.existing": this.existing,
  "variation.existing1": this.existing1,
  "variation.existing2": this.existing2,
  "variation.tsp": this.tsp,
  "variation.bpp": this.bpp,
  "variation.spp1": this.spp1,
  "variation.spp2": this.spp2,
  "variation.spp3": this.spp3,
  "variation.spp4": this.spp4,
  "variation.tpp": this.tpp,
  "variation.bbp": this.bbp,
  "variation.sbp1": this.sbp1,
  "variation.sbp2": this.sbp2,
  "variation.sbp3": this.sbp3,
  "variation.sbp4": this.sbp4,
  "variation.tep": this.tep,
  "variation.tbp": this.tbp,
  "variation.bep": this.bep,
  "variation.sep1": this.sep1,
  "variation.sep2": this.sep2,
  "variation.sep3": this.sep3,
  "variation.sep4": this.sep4,
  "variation.bsp": this.bsp,
  "variation.ssp1": this.ssp1,
  "variation.ssp2": this.ssp2,
  "variation.ssp3": this.ssp3,
  "variation.ssp4": this.ssp4,
  "variation.FILL_Percentage": this.FILL_Percentage,
  "variation.E_Percentage": this.E_Percentage,
  "variation.I_DIS": this.I_DIS,
  "variation.I_FACTOR": this.I_FACTOR,
  "variation.Exp_Percentage": this.Exp_Percentage,
  "variation.Concb_Percentage": this.Concb_Percentage,
  "variation.ich1A": this.ich1A,
  "variation.ich1B": this.ich1B,
  "variation.ich1C": this.ich1C,
  "variation.ich1D": this.ich1D,
  "variation.ich1E": this.ich1E,
  "variation.ich1F": this.ich1F,
  "variation.ich1G": this.ich1G,
  "variation.ich1H": this.ich1H,
  "variation.ich1I": this.ich1I,
  "variation.ich1J": this.ich1J,
  "variation.ich1K": this.ich1K,
  "variation.ich1L": this.ich1L,
  "variation.ich1M": this.ich1M,
  "variation.ich1N": this.ich1N,
  "variation.ich1O": this.ich1O,
  "variation.ich1P": this.ich1P,
  "variation.ich1Q": this.ich1Q,
  "variation.ich1R": this.ich1R,
  "variation.ich1S": this.ich1S,
  "variation.ich1T": this.ich1T,
  "variation.ich1U": this.ich1U,
  "variation.ich1V": this.ich1V,
  "variation.ich1W": this.ich1W,
  "variation.ich1X": this.ich1X,
  "variation.ich1Y": this.ich1Y,
  "variation.ich1Z": this.ich1Z,
  "variation.ich1AA": this.ich1AA,
  "variation.ich1AB": this.ich1AB,
  "variation.ich1AC": this.ich1AC,
  "variation.ich1AD": this.ich1AD,
  "variation.ich1AE": this.ich1AE,
  "variation.ich1AF": this.ich1AF,
  "variation.ich1AG": this.ich1AG,
  "variation.ich1AH": this.ich1AH,
  "variation.ich1AI": this.ich1AI,
  "variation.ich1AJ": this.ich1AJ,
  "variation.ich1AK": this.ich1AK,
  "variation.ich1AL": this.ich1AL,
  "variation.ich1AM": this.ich1AM,
  "variation.ich1AN": this.ich1AN,
  "variation.ich1AO": this.ich1AO,
  "variation.ich2A": this.ich2A,
  "variation.ich2B": this.ich2B,
  "variation.ich2C": this.ich2C,
  "variation.ich2D": this.ich2D,
  "variation.ich2E": this.ich2E,
  "variation.ich2F": this.ich2F,
  "variation.ich2G": this.ich2G,
  "variation.ich2H": this.ich2H,
  "variation.ich2I": this.ich2I,
  "variation.ich2J": this.ich2J,
  "variation.ich2K": this.ich2K,
  "variation.ich2L": this.ich2L,
  "variation.ich2M": this.ich2M,
  "variation.ich2N": this.ich2N,
  "variation.ich2O": this.ich2O,
  "variation.ich2P": this.ich2P,
  "variation.ich2Q": this.ich2Q,
  "variation.ich2R": this.ich2R,
  "variation.ich2S": this.ich2S,
  "variation.ich2T": this.ich2T,
  "variation.ich2U": this.ich2U,
  "variation.ich2V": this.ich2V,
  "variation.ich2W": this.ich2W,
  "variation.ich2X": this.ich2X,
  "variation.ich2Y": this.ich2Y,
  "variation.ich2Z": this.ich2Z,
  "variation.ich2AA": this.ich2AA,
  "variation.ich2AB": this.ich2AB,
  "variation.ich2AC": this.ich2AC,
  "variation.ich2AD": this.ich2AD,
  "variation.ich2AE": this.ich2AE,
  "variation.ich2AF": this.ich2AF,
  "variation.ich2AG": this.ich2AG,
  "variation.ich2AH": this.ich2AH,
  "variation.ich2AI": this.ich2AI,
  "variation.ich2AJ": this.ich2AJ,
  "variation.ich2AK": this.ich2AK,
  "variation.ich2AL": this.ich2AL,
  "variation.ich2AM": this.ich2AM,
  "variation.ich2AN": this.ich2AN,
  "variation.ich2AO": this.ich2AO,
  "variation.ich3A": this.ich3A,
  "variation.ich3B": this.ich3B,
  "variation.ich3C": this.ich3C,
  "variation.ich3D": this.ich3D,
  "variation.ich3E": this.ich3E,
  "variation.ich3F": this.ich3F,
  "variation.ich3G": this.ich3G,
  "variation.ich3H": this.ich3H,
  "variation.ich3I": this.ich3I,
  "variation.ich3J": this.ich3J,
  "variation.ich3K": this.ich3K,
  "variation.ich3L": this.ich3L,
  "variation.ich3M": this.ich3M,
  "variation.ich3N": this.ich3N,
  "variation.ich3O": this.ich3O,
  "variation.ich3P": this.ich3P,
  "variation.ich3Q": this.ich3Q,
  "variation.ich3R": this.ich3R,
  "variation.ich3S": this.ich3S,
  "variation.ich3T": this.ich3T,
  "variation.ich3U": this.ich3U,
  "variation.ich3V": this.ich3V,
  "variation.ich3W": this.ich3W,
  "variation.ich3X": this.ich3X,
  "variation.ich3Y": this.ich3Y,
  "variation.ich3Z": this.ich3Z,
  "variation.ich3AA": this.ich3AA,
  "variation.ich3AB": this.ich3AB,
  "variation.ich3AC": this.ich3AC,
  "variation.ich3AD": this.ich3AD,
  "variation.ich3AE": this.ich3AE,
  "variation.ich3AF": this.ich3AF,
  "variation.ich3AG": this.ich3AG,
  "variation.ich3AH": this.ich3AH,
  "variation.ich3AI": this.ich3AI,
  "variation.ich3AJ": this.ich3AJ,
  "variation.ich3AK": this.ich3AK,
  "variation.ich3AL": this.ich3AL,
  "variation.ich3AM": this.ich3AM,
  "variation.ich3AN": this.ich3AN,
  "variation.ich3AO": this.ich3AO,
 }).then(()=>{
   loading.dismiss().then(()=>{
     alert("Successfully updated!")
   })
 })

}

close(){
  this.modalController.dismiss()
 }
}
