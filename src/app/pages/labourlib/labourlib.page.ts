import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-labourlib',
  templateUrl: './labourlib.page.html',
  styleUrls: ['./labourlib.page.scss'],
})
export class LabourlibPage implements OnInit {

  Selecteditem;
  itemList = [];
  term;
  constructor(private modalController: ModalController,
    private afs : AngularFirestore) {
    this.afs.collection(`boq/boq/generallabours`).get().subscribe(value =>{
      value.docs.forEach(doc =>{
      this.itemList.push({
        id :doc.data().id ,
        name : doc.data().name,
        des : doc.data().des,
        unit : doc.data().unit,
        price : doc.data().price,
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
