import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-arealib',
  templateUrl: './arealib.page.html',
  styleUrls: ['./arealib.page.scss'],
})
export class ArealibPage implements OnInit {

  Selecteditem;
  itemList = [];
  term;
  constructor(private modalController: ModalController,
    private afs : AngularFirestore) {
    this.afs.collection(`boq/boq/generalareas`).get().subscribe(value =>{
      value.docs.forEach(doc =>{
      this.itemList.push({
        id :doc.data().id ,
        name : doc.data().name ,
        code : doc.data().code,
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
