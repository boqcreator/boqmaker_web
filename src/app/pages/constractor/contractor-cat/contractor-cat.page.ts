import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contractor-cat',
  templateUrl: './contractor-cat.page.html',
  styleUrls: ['./contractor-cat.page.scss'],
})
export class ContractorCatPage implements OnInit {
items;
contractor;
name = "";
email = "";
address = "";
tel = "";
mob = "";
  constructor(private afs :AngularFirestore, 
    public loadingController: LoadingController,
    private modal : ModalController) { 
      this.afs.collection(`boq/boq/contractors`).get().subscribe(value =>{
        this.items = value.docs
      })
    }

  ngOnInit() {
  }

  async addcat(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 20000
    });
    await loading.present();
    this.afs.collection(`boq/boq/contractors/${this.contractor.ref.id}/items`).add({
   name : this.name,
   email : this.email,
    address : this.address,
    tel :  this.tel,
    mob :  this.mob,
    }).then(()=>{
      this.loadingController.dismiss();
      alert("Successfully Added!")
      this.modal.dismiss();
    })
  }

}
