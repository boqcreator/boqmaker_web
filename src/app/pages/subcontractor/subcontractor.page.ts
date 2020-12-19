import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddsubcontractorPage } from '../addsubcontractor/addsubcontractor.page';
import { UpdatesupplierPage } from '../updatesupplier/updatesupplier.page';
import { EditSubcontractorPage } from '../edit-subcontractor/edit-subcontractor.page';

@Component({
  selector: 'app-subcontractor',
  templateUrl: './subcontractor.page.html',
  styleUrls: ['./subcontractor.page.scss'],
})
export class SubcontractorPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  subcontractorList=[]
  subcontractorID = ""
  term1
  term2
  term3
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
    private loadingController: LoadingController,
    private alertController: AlertController,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('subcontractorcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('subcontractorsubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/subcontractorscat/`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("subcontractorcat", this.CatID);
    this.storage.remove('subcontractorsubcat')
    this.storage.remove('subcontractorsubcatList')
    this.subcontractorList = [];
     this.afs.collection<any>(`boq/boq/subcontractorscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getsubcontractors(){
     this.storage.set("subcontractorsubcat", this.SubcatID);
     this.storage.set("subcontractorsubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/subcontractorscat/${this.CatID}/subcat/${this.SubcatID}/subcontractors`).snapshotChanges().subscribe(value =>{
       this.subcontractorList = [];
       value.forEach(doc =>{
         this.subcontractorList.push({
           id : doc.payload.doc.ref.id,
          name: doc.payload.doc.data().name,
          des: doc.payload.doc.data().des,
          createdon : new Date().toISOString(),
          catid : doc.payload.doc.data().catid ,
          subcatid : doc.payload.doc.data().subcatid ,
          unit : doc.payload.doc.data().unit ,
          price : doc.payload.doc.data().price ,
          EXISTING : doc.payload.doc.data().EXISTING ,
 
       })
       })
       
     })
 
   }
   async editCat(item){
    const modal = await this.modalController.create({
      component: UpdatesupplierPage,
      componentProps: { firelink: `boq/boq/subcontractorscat/${item.id}`}
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
  
              this.afs.doc(`boq/boq/subcontractorscat/${item.id}`).delete().then(async()=>{
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
      componentProps: { firelink: `boq/boq/subcontractorscat/${this.CatID}/subcat/${item.id}`}
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
  
              this.afs.doc(`boq/boq/subcontractorscat/${this.CatID}/subcat/${item.id}`).delete().then(async()=>{
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
      component: EditSubcontractorPage,
      componentProps: { item: item }
      });
    
      await modal.present();
   }
   async del(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Subcontractor?</strong>',
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
  
              this.afs.doc(`boq/boq/subcontractorscat/${item.catid}/subcat/${item.subcatid}/subcontractors/${item.id}`).delete().then(async()=>{
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
       component: AddsubcontractorPage,
       });
     
       await modal.present();
     
     
   }

}
