import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.page.html',
  styleUrls: ['./consultant.page.scss'],
})
export class ConsultantPage implements OnInit {
  toAdd = "";
  listOfConsultants;
  constructor(private modalController: ModalController , private afs : AngularFirestore) {
   this.listOfConsultants =  this.afs.collection(`boq/boq/consultants`, ref => ref.orderBy("name" , "asc")).snapshotChanges()
   }

  ngOnInit() {
  }


  add(){
    if(this.toAdd.trim().length > 0)
    this.afs.collection(`boq/boq/consultants`).add({
      name : this.toAdd
    }).then(()=>{
      this.toAdd = "";
      alert("Added successfully!")
    })
  }

  delete(item){
    this.afs.doc(`boq/boq/consultants/${item.id}`).delete().then(()=>alert("Deleted"))
  }
  

  close(){
    this.modalController.dismiss()
  }

}
