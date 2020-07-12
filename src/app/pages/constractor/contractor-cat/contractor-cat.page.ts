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
name;
  constructor(private afs :AngularFirestore, 
    public loadingController: LoadingController,
    private modal : ModalController) { }

  ngOnInit() {
  }

  async addcat(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 20000
    });
    await loading.present();
    this.afs.collection(`boq/boq/contractors/${this.contractor.id}/cat`).add({
   name : this.name
    }).then(()=>{
      this.loadingController.dismiss();
      alert("Successfully Added!")
      this.modal.dismiss();
    })
  }

}
