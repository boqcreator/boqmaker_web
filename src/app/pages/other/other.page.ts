import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddotherPage } from '../addother/addother.page';
import { UpdatesupplierPage } from '../updatesupplier/updatesupplier.page';
import { EditOtherPage } from '../edit-other/edit-other.page';

@Component({
  selector: 'app-other',
  templateUrl: './other.page.html',
  styleUrls: ['./other.page.scss'],
})
export class OtherPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  otherList=[]
  otherID = ""
  term1
  term2
  term3
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private storage : Storage,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('othercat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('othersubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/otherscat/`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("othercat", this.CatID);
    this.storage.remove('othersubcat')
    this.storage.remove('othersubcatList')
    this.otherList = [];
     this.afs.collection<any>(`boq/boq/otherscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getothers(){
     this.storage.set("othersubcat", this.SubcatID);
     this.storage.set("othersubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/otherscat/${this.CatID}/subcat/${this.SubcatID}/others`).snapshotChanges().subscribe(value =>{
       this.otherList = [];
       value.forEach(doc =>{
         this.otherList.push({
         name : doc.payload.doc.data().name, 
         id : doc.payload.doc.id,
         des: doc.payload.doc.data().des,
         catid : doc.payload.doc.data().catid,
         subcatid : doc.payload.doc.data().subcatid,
         unit : doc.payload.doc.data().unit,
         price : doc.payload.doc.data().price,
         EXISTING : doc.payload.doc.data().EXISTING,
 
       })
       })
       
     })
 
   }
 
   async editCat(item){
    const modal = await this.modalController.create({
      component: UpdatesupplierPage,
      componentProps: { firelink: `boq/boq/otherscat/${item.id}`}
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
  
              this.afs.doc(`boq/boq/otherscat/${item.id}`).delete().then(async()=>{
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
      componentProps: { firelink: `boq/boq/otherscat/${this.CatID}/subcat/${item.id}`}
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
  
              this.afs.doc(`boq/boq/otherscat/${this.CatID}/subcat/${item.id}`).delete().then(async()=>{
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
      component: EditOtherPage,
      componentProps: { item: item }
      });
    
      await modal.present();
   }
   async del(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Other?</strong>',
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
  
              this.afs.doc(`boq/boq/otherscat/${item.catid}/subcat/${item.subcatid}/others/${item.id}`).delete().then(async()=>{
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
       component: AddotherPage,
       });
     
       await modal.present();
     
     
   }

}

