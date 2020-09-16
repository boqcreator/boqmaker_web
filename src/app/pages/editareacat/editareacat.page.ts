import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editareacat',
  templateUrl: './editareacat.page.html',
  styleUrls: ['./editareacat.page.scss'],
})
export class EditareacatPage implements OnInit {
  item;

  constructor(private afs: AngularFirestore,
    private loadingController: LoadingController,
    private modalController: ModalController) { }

  ngOnInit() {
  }

  async updatecat(){
      const loading = await this.loadingController.create({
        message: 'Updating',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();

      this.afs.doc(`boq/boq/Areas/${this.item.id}`).update({
        name : this.item.name,
        des : this.item.des
      }).then(()=>{
        loading.dismiss();
        alert("Updated");
      })
    }

    close(){
     this.modalController.dismiss()
    }

}
