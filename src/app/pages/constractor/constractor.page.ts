import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, MenuController } from '@ionic/angular';
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
contractorList =[];
term;
  constructor(private router : Router,
    private menu : MenuController,
     public modalController: ModalController,
      private afs : AngularFirestore,
      private fs : FirebaseService) {
    this.menu.enable(false)
    this.getdata();
  }

  ngOnInit() {
  }

  getdata(){
    this.contractorList = []
    this.fs.read_contractors().subscribe(value =>{
      value.forEach(doc =>{
        this.afs.collection(`boq/boq/contractors/${doc.payload.doc.id}/items`).get().subscribe(data =>{
             data.docs.forEach(ele =>{
               this.contractorList.push({
                 cat : doc.payload.doc.data().name,
                 name : ele.data().name,
                 address  :ele.data().address,
                 tel :  ele.data().tel,
                 mob : ele.data().mob,
                 email : ele.data().email
              })
             })
        })
      })
        
    })
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


    });
    await modal.present();

    await modal.onWillDismiss().then(() =>{
      this.getdata()
    })

  }
}
