import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReportFinalPricedBillPage } from '../report-final-priced-bill/report-final-priced-bill.page';

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
  gotoReport(){
    this.presentModal()
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

  async presentModal() {
    const modal = await this.modalController.create({
      cssClass: 'modal1',
    component: ReportFinalPricedBillPage,
    });
  
    await modal.present();
  
  }

}
