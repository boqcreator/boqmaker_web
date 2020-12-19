import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.page.html',
  styleUrls: ['./unit.page.scss'],
})
export class UnitPage implements OnInit {
  toAdd = "";
  listOfUnits;
  constructor(private modalController: ModalController , private afs : AngularFirestore) {
   this.listOfUnits =  this.afs.collection(`boq/boq/units`, ref => ref.orderBy("name" , "asc")).snapshotChanges()
   }

  ngOnInit() {
  }


  add(){
    if(this.toAdd.trim().length > 0)
    this.afs.collection(`boq/boq/units`).add({
      name : this.toAdd
    }).then(()=>{
      this.toAdd = "";
      alert("Added successfully!")
    })
  }

  delete(item){
    this.afs.doc(`boq/boq/units/${item.id}`).delete().then(()=>alert("Deleted"))
  }
  

  close(){
    this.modalController.dismiss()
  }

}
