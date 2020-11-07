import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-manageboq',
  templateUrl: './manageboq.page.html',
  styleUrls: ['./manageboq.page.scss'],
})
export class ManageboqPage implements OnInit {
 catlist;
 subcatlist;
 subsubcatlist
 segment = "cat";
  constructor(private modalController: ModalController,
     private afs : AngularFirestore,
     private alertController: AlertController) {
   this.catlist = this.afs.collection(`/boq/boq/boqitemscat`,ref => ref.orderBy("name", "asc")).snapshotChanges()
   this.subcatlist = this.afs.collection(`/boq/boq/boqitemssubcat`,ref => ref.orderBy("name", "asc")).snapshotChanges()
   this.subsubcatlist = this.afs.collection(`/boq/boq/boqitemssubsubcat`,ref => ref.orderBy("name", "asc")).snapshotChanges()
   }

  ngOnInit() {
  }

  update(item,event,table){
    this.afs.doc(`/boq/boq/${table}/${item.payload.doc.ref.id}`).update({
      name : event.detail.value
    })
  }
  async delete(id,table){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure you want to delete this Category?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            handler: () => {          
    this.afs.doc(`/boq/boq/${table}/${id}`).delete().then(async ()=>{
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Successfully deleted!',
          buttons: ['OK']
        });
      
        await alert.present();

    }).catch(async err=>{
      const alert = await this.alertController.create({
        header: 'Error',
        message: err,
        buttons: ['OK']
      });
    
      await alert.present();
    })
            }
          }
        ]
      });
    
      await alert.present();
  }
  close(){
    this.modalController.dismiss()
      }

}
