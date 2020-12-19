import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReportFinalPricedBillPage } from '../report-final-priced-bill/report-final-priced-bill.page';
import { UnitPage } from '../unit/unit.page';
import { ConsultantPage } from '../consultant/consultant.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public menu :  MenuController,
    private modalController: ModalController,
    private router : Router) {
    this.menu.enable(false)
   
   }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.menu.enable(false)
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
  gotoReport(type){
    this.presentModal(type)
  }

  gotolabour(){
    this.router.navigate(['labour'])
  }
  gotoequipment(){
    this.router.navigate(['equipment'])
  }
  gotoother(){
    this.router.navigate(['other'])
  }
  gotosubcontractor(){
    this.router.navigate(['subcontractor'])
  }
  gotogbi(){
    this.router.navigate(['boqitem-g'])
  }
  gotogbi1(){
    this.router.navigate(['boqitem-g1'])
  }
  gotogbi2(){
    this.router.navigate(['boqitem-g2'])
  }
  gotogbi3(){
    this.router.navigate(['boqitem-g3'])
  }
  gotogbi4(){
    this.router.navigate(['boqitem-g4'])
  }
  gotogbi5(){
    this.router.navigate(['boqitem-g5'])
  }
  gotogal(){
    this.router.navigate(['area-g'])
  }
  gotogal1(){
    this.router.navigate(['area-g1'])
  }
  gotogal2(){
    this.router.navigate(['area-g2'])
  }
  gotogal3(){
    this.router.navigate(['area-g3'])
  }
  gotogal4(){
    this.router.navigate(['area-g4'])
  }
  gotogal5(){
    this.router.navigate(['area-g5'])
  }
  gotocastdetails(){
    this.router.navigate(['costdetails'])
  }
  gotoprojtype(){
    this.router.navigate(['projecttypes'])
  }
  gotoopen(){
    this.router.navigate(['opening'])
  }
  gotoprojection(){
    this.router.navigate(['projection'])
  }
  gotovariationreport(){
    this.router.navigate(['report-variation'])
  }
  gotomateriallib(){
    this.router.navigate(['material-g'])
  }
  gotolabourib(){
    this.router.navigate(['labour-g'])
  }
  gotoequipmentlib(){
    this.router.navigate(['equipment-g'])
  }
  addProj(){
    this.router.navigate(['addproject'])
   }
   gotoclient(){
    this.router.navigate(['client'])
   }

   async gotounit(){
       const modal = await this.modalController.create({
       component: UnitPage,
       });
     
       await modal.present();
  
      
   }

   async gotoconsultant(){
    const modal = await this.modalController.create({
    component: ConsultantPage,
    });
  
    await modal.present();

   
}

  async presentModal(type) {
    const modal = await this.modalController.create({
      cssClass: 'modal1',
    component: ReportFinalPricedBillPage,
    componentProps: { type: type }
    });
  
    await modal.present();
  
  }

}
