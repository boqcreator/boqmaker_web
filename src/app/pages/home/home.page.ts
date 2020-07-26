import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public menu :  MenuController,
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

}
