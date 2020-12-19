import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddlabourPage } from '../addlabour/addlabour.page';
import { UpdatesupplierPage } from '../updatesupplier/updatesupplier.page';
import { EditLabourPage } from '../edit-labour/edit-labour.page';

@Component({
  selector: 'app-labour',
  templateUrl: './labour.page.html',
  styleUrls: ['./labour.page.scss'],
})
export class LabourPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  labourList=[]
  labourID = ""
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

      this.storage.get('labourcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('laboursubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/labourscat/`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("labourcat", this.CatID);
    this.storage.remove('laboursubcat')
    this.storage.remove('laboursubcatList')
    this.labourList = [];
     this.afs.collection<any>(`boq/boq/labourscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getlabours(){
     this.storage.set("laboursubcat", this.SubcatID);
     this.storage.set("laboursubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/labourscat/${this.CatID}/subcat/${this.SubcatID}/labours`).snapshotChanges().subscribe(value =>{
       this.labourList = [];
       value.forEach(doc =>{
         this.labourList.push({
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
      componentProps: { firelink: `boq/boq/labourscat/${item.id}`}
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
  
              this.afs.doc(`boq/boq/labourscat/${item.id}`).delete().then(async()=>{
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
      componentProps: { firelink: `boq/boq/labourscat/${this.CatID}/subcat/${item.id}`}
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
  
              this.afs.doc(`boq/boq/labourscat/${this.CatID}/subcat/${item.id}`).delete().then(async()=>{
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
      component: EditLabourPage,
      componentProps: { item: item }
      });
    
      await modal.present();
   }
   async del(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Material?</strong>',
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
  
              this.afs.doc(`boq/boq/labourscat/${item.catid}/subcat/${item.subcatid}/labours/${item.id}`).delete().then(async()=>{
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
       component: AddlabourPage,
       });
     
       await modal.present();
     
     
   }

}

