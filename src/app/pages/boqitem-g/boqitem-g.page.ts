import { Component, OnInit } from '@angular/core';
import { AddboqitemGPage } from '../addboqitem-g/addboqitem-g.page';
import { ModalController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-boqitem-g',
  templateUrl: './boqitem-g.page.html',
  styleUrls: ['./boqitem-g.page.scss'],
})
export class BoqitemGPage implements OnInit {
  itemList = [];
  term;
  constructor(private modalController: ModalController,
     private menu : MenuController,
     private alertController: AlertController,
     private afs : AngularFirestore,
     private loadingController: LoadingController
     ) {
    this.menu.enable(false)
    this.presentLoading()
    this.afs.collection(`boq/boq/generalboqitems`, ref => ref.orderBy("id", "asc")).get().subscribe(value =>{
      value.docs.forEach(doc =>{
      this.itemList.push({
        id :doc.data().id ,
        name : doc.data().name ,
        code : doc.data().code,
        unit : doc.data().unit,
        price : doc.data().price 
      })
      })
      this.loadingController.dismiss()
    })
   }

  ngOnInit() {
  }

  Del(item){
    
  }
  edit(item){

  }
  async delall(){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: ' <strong>Are you sure you want to delete all boqitems</strong>?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Delete',
            handler: async () => {
              
                  
      const loading = await this.loadingController.create({
        message: 'Deleting...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();

    this.afs.collection(`boq/boq/generalboqitems`).get().subscribe(value=>{

      value.docs.forEach(doc =>{
        this.afs.doc(`boq/boq/generalboqitems/${doc.ref.id}`).delete()
      })
      this.loadingController.dismiss()
      this.itemList = [];
    })
            }
          }
        ]
      });
    
      await alert.present();

  }

  async addnew(){
      const modal = await this.modalController.create({
      component: AddboqitemGPage,
      });
    
      await modal.present();
    
 
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading data',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

}
