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

  gotocons(){
   this.router.navigate(['constractor'])
  }

  gotoproj(){
    this.router.navigate(['projects'])
  }
  gotohome(){
    this.router.navigate(['home'])
  }

  ionViewDidEnter(){
    this.menu.enable(false)
  }

}
