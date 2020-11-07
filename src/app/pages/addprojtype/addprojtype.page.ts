import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addprojtype',
  templateUrl: './addprojtype.page.html',
  styleUrls: ['./addprojtype.page.scss'],
})
export class AddprojtypePage implements OnInit {
  name;

  constructor(private afs : AngularFirestore,
    private loadingController: LoadingController,
    private modalController: ModalController) { }

  ngOnInit() {
  }

  async add(){
      const loading = await this.loadingController.create({
        message: 'Hellooo',
        duration: 2000,
        spinner: 'bubbles'
      });
      await loading.present();

       this.afs.collection(`boq/boq/projecttypes`).add({
         name : this.name
       }).then(()=>{
         loading.dismiss();
         alert("Added successfully!")
       })
      
  }
  close(){
  this.modalController.dismiss()
  }

}
