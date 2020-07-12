import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddContractorPage } from '../add-contractor/add-contractor.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/firebase.service';
import { ContractorCatPage } from './contractor-cat/contractor-cat.page';

@Component({
  selector: 'app-constractor',
  templateUrl: './constractor.page.html',
  styleUrls: ['./constractor.page.scss'],
})
export class ConstractorPage implements OnInit {
contractorList;
term;
  constructor(private router : Router,
     public modalController: ModalController,
      private afs : AngularFirestore,
      private fs : FirebaseService) {
    
    this.fs.read_contractors().subscribe(value =>{
this.contractorList = value
    })
  }

  ngOnInit() {
  }


  async addcont(){
    const modal = await this.modalController.create({
      component: AddContractorPage,
    });
    return await modal.present();

  }

  async addcat(){
    const modal = await this.modalController.create({
      component: ContractorCatPage,
      componentProps: {
        items : this.contractorList
      }
    });
    return await modal.present();

  }
}
