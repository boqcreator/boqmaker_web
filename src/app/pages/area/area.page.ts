import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddareaPage } from './addarea/addarea.page';

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
})
export class AreaPage implements OnInit {

  category;
  subcat = [];
  subsubcat = [];
  areas = [];

  SelCat;
  SsubCat;
  SsubsubCat;

  term1;
  term2;
  term3;
  term4;
  constructor(private menu : MenuController, private afs : AngularFirestore,
    public modalController: ModalController) {
    menu.enable(false)

    this.afs.collection(`boq/boq/Areas`).snapshotChanges().subscribe(value =>{
      this.category = value
    })
   }

  ngOnInit() {
  }

  getsubcat(item){
this.afs.collection(`boq/boq/Areas/${item.payload.doc.id}/cat`).get().subscribe(value =>{
  this.subcat = value.docs
})
this.subsubcat = [];
this.areas = [];
  }

  getsubsubcat(item){
    this.afs.collection(`boq/boq/Areas/${this.SelCat.payload.doc.id}/cat/${item.ref.id}/subcat`).get().subscribe(value =>{
      this.subsubcat = value.docs
    })
    this.areas = [];
  }
  getareas(item){
    this.afs.collection(`boq/boq/Areas/${this.SelCat.payload.doc.id}/cat/${this.SsubCat.ref.id}/subcat/${item.ref.id}/items`).get().subscribe(value =>{
      this.areas = value.docs
    })
  }

  async gotoaddarea(){

    const modal = await this.modalController.create({
      component: AddareaPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();

  }

  addtolist(item){
    
  }

}
