import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';
import * as firebase from "firebase"

@Component({
  selector: 'app-edit-labour',
  templateUrl: './edit-labour.page.html',
  styleUrls: ['./edit-labour.page.scss'],
})
export class EditLabourPage implements OnInit {
  item;
units;
  constructor(private afs : AngularFirestore,
    private modalController: ModalController,
    private loadingController: LoadingController) { 
    this.units =  this.afs.collection(`boq/boq/units`, ref => ref.orderBy("name" , "asc")).snapshotChanges()
  }

  async update(){

    const loading = await this.loadingController.create({
      message: 'Updating',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();
    this.afs.doc(`boq/boq/labourscat/${this.item.catid}/subcat/${this.item.subcatid}/labours/${this.item.id}`).update({
      name: this.item.name,
      des: this.item.des,
      unit : this.item.unit,
      price : this.item.price,
      LEXISTING : this.item.LEXISTING,
          }).then(()=>{
            loading.dismiss();
            alert("Updated")
          }).catch(err =>{
            loading.dismiss();
            alert(err)
          })
  }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }

}
