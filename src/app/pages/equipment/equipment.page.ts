import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddequipmentPage } from '../addequipment/addequipment.page';
import { UpdatesupplierPage } from '../updatesupplier/updatesupplier.page';
import { EditequipmentPage } from '../editequipment/editequipment.page';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss'],
})
export class EquipmentPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  equipmentList=[]
  equipmentID = ""
  term1
  term2
  term3
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
    private alertController: AlertController,
    private loadingController: LoadingController,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('equipmentcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('equipmentsubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/equipmentscat/`).snapshotChanges().subscribe(value =>{
        this.catList = []
        value.forEach(doc =>{
          this.catList.push({
            name : doc.payload.doc.data().name,
            id : doc.payload.doc.id
          })
        })
       })

      }

  ngOnInit() {
  }


  getsubcat(){
    this.storage.set("equipmentcat", this.CatID);
    this.storage.remove('equipmentsubcat')
    this.storage.remove('equipmentsubcatList')
    this.equipmentList = [];
     this.afs.collection<any>(`boq/boq/equipmentscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getequipments(){
     this.storage.set("equipmentsubcat", this.SubcatID);
     this.storage.set("equipmentsubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/equipmentscat/${this.CatID}/subcat/${this.SubcatID}/equipments`).snapshotChanges().subscribe(value =>{
       this.equipmentList = [];
       value.forEach(doc =>{
         this.equipmentList.push({
          name : doc.payload.doc.data().name, 
          id : doc.payload.doc.id,
          des : doc.payload.doc.data().des,
          unit : doc.payload.doc.data().unit,
         price : doc.payload.doc.data().price, 
         LEXISTING : doc.payload.doc.data().LEXISTING,
         catid : doc.payload.doc.data().catid,
         subcatid : doc.payload.doc.data().subcatid,
 
       })
       })
       
     })
 
   }
 


   async editCat(item){
    const modal = await this.modalController.create({
      component: UpdatesupplierPage,
      componentProps: { firelink: `boq/boq/equipmentscat/${item.id}`}
      });
    
      await modal.present();
   }

   async delCat(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Category?</strong>',
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
                duration: 2000,
                spinner: 'bubbles'
              });
              await loading.present();
  
              this.afs.doc(`boq/boq/equipmentscat/${item.id}`).delete().then(async()=>{
             loading.dismiss();
               const alert = await this.alertController.create({
                 header: 'Success',
                 message: 'Deleted successfully!',
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
 

   async editSubcat(item){
    const modal = await this.modalController.create({
      component: UpdatesupplierPage,
      componentProps: { firelink: `boq/boq/equipmentscat/${this.CatID}/subcat/${item.id}`}
      });
    
      await modal.present();
   }

   async delSubcat(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Subcategory?</strong>',
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
                duration: 2000,
                spinner: 'bubbles'
              });
              await loading.present();
  
              this.afs.doc(`boq/boq/equipmentscat/${this.CatID}/subcat/${item.id}`).delete().then(async()=>{
             loading.dismiss();
               const alert = await this.alertController.create({
                 header: 'Success',
                 message: 'Deleted successfully!',
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

   async edit(item){
    const modal = await this.modalController.create({
      component: EditequipmentPage,
      componentProps: { item: item }
      });
    
      await modal.present();
   }
   async del(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Equipment?</strong>',
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
                duration: 2000,
                spinner: 'bubbles'
              });
              await loading.present();
  
              this.afs.doc(`boq/boq/equipmentscat/${item.catid}/subcat/${item.subcatid}/equipments/${item.id}`).delete().then(async()=>{
             loading.dismiss();
               const alert = await this.alertController.create({
                 header: 'Success',
                 message: 'Deleted successfully!',
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
 
 
 
 
 
   async addnew(){
       const modal = await this.modalController.create({
       component: AddequipmentPage,
       });
     
       await modal.present();
     
     
   }

}

