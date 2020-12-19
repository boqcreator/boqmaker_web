import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editequipment',
  templateUrl: './editequipment.page.html',
  styleUrls: ['./editequipment.page.scss'],
})
export class EditequipmentPage implements OnInit {
item;
units
constructor(private afs : AngularFirestore,
  private modalController: ModalController,
  private loadingController: LoadingController) { 
  this.units =  this.afs.collection(`boq/boq/units`, ref => ref.orderBy("name" , "asc")).snapshotChanges()
}

  ngOnInit() {
  }

  async update(){

    const loading = await this.loadingController.create({
      message: 'Updating',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();
    this.afs.doc(`boq/boq/equipmentscat/${this.item.catid}/subcat/${this.item.subcatid}/equipments/${this.item.id}`).update({
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

  close(){
    this.modalController.dismiss();
  }

}
