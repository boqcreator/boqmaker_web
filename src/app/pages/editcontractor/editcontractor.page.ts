import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editcontractor',
  templateUrl: './editcontractor.page.html',
  styleUrls: ['./editcontractor.page.scss'],
})
export class EditcontractorPage implements OnInit {

  constructor(private modalController: ModalController, private afs :  AngularFirestore,
     private loadingController: LoadingController, private alertController: AlertController) { }
item;
  ngOnInit() {
  }

  async update(){
     const loading = await this.loadingController.create({
       message: 'Updating...',
       duration: 20000,
       spinner: 'bubbles'
     });
     await loading.present();

    this.afs.doc(`boq/boq/contractors/${this.item.catId}/items/${this.item.id}`).update({
      name : this.item.name,
      address  :this.item.address,
      tel :  this.item.tel,
      mob : this.item.mob,
      email : this.item.email
 }).then(async ()=>{
   loading.dismiss();
     const alert = await this.alertController.create({
       header: 'Success',
       message: 'Contractor updated successfully!',
       buttons: ['OK']
     });
   
     await alert.present();

 }).catch(async (error) =>{
  loading.dismiss();
  const alert = await this.alertController.create({
    header: 'Error',
    message: 'Cannot update contractor, try again later.',
    buttons: ['OK']
  });

  await alert.present();
 })
  }
  close(){
this.modalController.dismiss();
  }

}
