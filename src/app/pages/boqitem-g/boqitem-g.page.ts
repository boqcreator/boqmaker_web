import { Component, OnInit } from '@angular/core';
import { AddboqitemGPage } from '../addboqitem-g/addboqitem-g.page';
import { ModalController, MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-boqitem-g',
  templateUrl: './boqitem-g.page.html',
  styleUrls: ['./boqitem-g.page.scss'],
})
export class BoqitemGPage implements OnInit {
  itemList = [];
  term;
  constructor(private modalController: ModalController,
     private menu : MenuController,
     private afs : AngularFirestore
     ) {
    this.menu.enable(false)
    this.afs.collection(`boq/boq/generalboqitems`).get().subscribe(value =>{
      value.docs.forEach(doc =>{
      this.itemList.push({
        id :doc.data().id ,
        name : doc.data().name ,
        code : doc.data().code,
        unit : doc.data().unit,
        price : doc.data().price 
      })
      })
    })
   }

  ngOnInit() {
  }

  Del(item){
    
  }
  edit(item){
    
  }

  async addnew(){
      const modal = await this.modalController.create({
      component: AddboqitemGPage,
      });
    
      await modal.present();
    
 
  }

}
