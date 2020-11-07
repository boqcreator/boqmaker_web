import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-boqitemlib',
  templateUrl: './boqitemlib.page.html',
  styleUrls: ['./boqitemlib.page.scss'],
})
export class BoqitemlibPage implements OnInit {

  Selecteditem;
  itemList = [];
  term;
  library ="";
  constructor(private modalController: ModalController,
    private afs : AngularFirestore) {
   }

   getLibrary(){
     this.itemList = [];
    this.afs.collection(`boq/boq/${this.library}`).get().subscribe(value =>{
      value.docs.forEach(doc =>{
      this.itemList.push({
        id :doc.data().id,
        name : doc.data().name,
        code : doc.data().code,
        unit : doc.data().unit,
        price : doc.data().price,
        mprice : doc.data().mprice,
        lprice : doc.data().lprice,
        eprice : doc.data().eprice,  
        sprice : doc.data().sprice,
        oprice : doc.data().oprice,
      })
      })
    })
   }

  ngOnInit() {
  }
  sendbackitem(){
    this.modalController.dismiss(this.Selecteditem)
  }
  close(){
this.modalController.dismiss()
  }

}
