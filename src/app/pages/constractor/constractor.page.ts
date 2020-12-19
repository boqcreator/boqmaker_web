import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { AddContractorPage } from '../add-contractor/add-contractor.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/firebase.service';
import { ContractorCatPage } from './contractor-cat/contractor-cat.page';
import { EditcontractorPage } from '../editcontractor/editcontractor.page';

@Component({
  selector: 'app-constractor',
  templateUrl: './constractor.page.html',
  styleUrls: ['./constractor.page.scss'],
})
export class ConstractorPage implements OnInit {
contractorList =[];
term;
  constructor(private router : Router,
    private menu : MenuController,
     public modalController: ModalController,
      private afs : AngularFirestore,
      private alertController: AlertController,
      private loadingController: LoadingController,
      private fs : FirebaseService) {
    this.menu.enable(false)
    this.getdata();
  }

  ngOnInit() {
  }

  getdata(){
    this.fs.read_contractors().subscribe(value =>{
      this.contractorList = []
      value.forEach(doc =>{
        this.afs.collection(`boq/boq/contractors/${doc.payload.doc.id}/items`).get().subscribe(data =>{
             data.docs.forEach(ele =>{
               this.contractorList.push({
                 cat : doc.payload.doc.data().name,
                 catId :doc.payload.doc.id,
                 name : ele.data().name,
                 address  :ele.data().address,
                 tel :  ele.data().tel,
                 mob : ele.data().mob,
                 email : ele.data().email,
                 id : ele.id
              })
             })
        })
      })
        
    })
  }

  async edit(item){
      const modal = await this.modalController.create({
      component: EditcontractorPage,
      componentProps: { item: item }
      });
    
      await modal.present();
    
  }


  async del(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this contractor?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
              const loading = await this.loadingController.create({
                message: 'Deleting',
                duration: 20000,
                spinner: 'bubbles'
              });
              await loading.present();
  this.getdata();
              this.afs.doc(`boq/boq/contractors/${item.catId}/items/${item.id}`).delete().then(async()=>{
             loading.dismiss();
               const alert = await this.alertController.create({
                 header: 'Success',
                 message: 'Deleted successfully!',
                 buttons: ['OK']
               })
             
               await alert.present();

            }).catch(error=>{
              console.error(error)
            })
          }
        }
      ]
    });
  
    await alert.present();
   }

  async addcont(){
    const modal = await this.modalController.create({
      component: AddContractorPage,
    });
    return await modal.present();

  }

  async addcat(){
    const modal = await this.modalController.create({
      component: ContractorCatPage,


    });
    await modal.present();

    await modal.onWillDismiss().then(() =>{
      this.getdata()
    })

  }
}
