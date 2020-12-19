import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddmaterialPage } from '../addmaterial/addmaterial.page';
import { EditmaterialPage } from '../editmaterial/editmaterial.page';
import { UpdatesupplierPage } from '../updatesupplier/updatesupplier.page';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  materialList=[]
  materialID = ""
  term1
  term2
  term3
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private storage : Storage,
     private router : Router,
     private afs : AngularFirestore) {
      this.menu.enable(false)

      this.storage.get('materialcat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('materialsubcat').then((value)=>{
        this.SubcatID = value
      })

      this.afs.collection<any>(`boq/boq/materialscat/`).snapshotChanges().subscribe(value =>{
        this.catList = [];
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
    this.storage.set("materialcat", this.CatID);
    this.storage.remove('materialsubcat')
    this.storage.remove('materialsubcatList')
    this.materialList = [];
     this.afs.collection<any>(`boq/boq/materialscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.subcatList = [];
       value.forEach(doc =>{
         this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   getmaterials(){
     this.storage.set("materialsubcat", this.SubcatID);
     this.storage.set("materialsubcatList", this.subcatList);
     this.afs.collection<any>(`boq/boq/materialscat/${this.CatID}/subcat/${this.SubcatID}/materials`).snapshotChanges().subscribe(value =>{
       this.materialList = [];
       value.forEach(doc =>{
         this.materialList.push({
           id : doc.payload.doc.ref.id,
         name: doc.payload.doc.data().name,
         des: doc.payload.doc.data().des,
         catid : doc.payload.doc.data().catid,
         subcatid : doc.payload.doc.data().subcatid,
         unit : doc.payload.doc.data().unit,
         price : doc.payload.doc.data().price,
         unit1: doc.payload.doc.data().unit1,
         price1 : doc.payload.doc.data().price1,
         unit2 : doc.payload.doc.data().unit2,
         price2 : doc.payload.doc.data().price2,
         supplier : doc.payload.doc.data().supplier,
         additionalsupplier : doc.payload.doc.data().additionalsupplier,
         website  : doc.payload.doc.data().website,
         origin : doc.payload.doc.data().origin,
         diameter : doc.payload.doc.data().diameter,
         color : doc.payload.doc.data().color,
         grad  : doc.payload.doc.data().grad,
         brand  : doc.payload.doc.data().brand ,
         thickness  : doc.payload.doc.data().thickness,
         width  : doc.payload.doc.data().width,
         length  : doc.payload.doc.data().length,
         wastage  : doc.payload.doc.data().wastage,
         image : doc.payload.doc.data().image,
 
       })
       })
       
     })
 
   }
 
   async edit(item){
    const modal = await this.modalController.create({
      component: EditmaterialPage,
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
  
              this.afs.doc(`boq/boq/materialscat/${item.catid}/subcat/${item.subcatid}/materials/${item.id}`).delete().then(async()=>{
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

   async editCat(item){
    const modal = await this.modalController.create({
      component: UpdatesupplierPage,
      componentProps: { firelink: `boq/boq/materialscat/${item.id}`}
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
  
              this.afs.doc(`boq/boq/materialscat/${item.id}`).delete().then(async()=>{
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
      componentProps: { firelink: `boq/boq/materialscat/${this.CatID}/subcat/${item.id}`}
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
  
              this.afs.doc(`boq/boq/materialscat/${this.CatID}/subcat/${item.id}`).delete().then(async()=>{
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
       component: AddmaterialPage,
       });
     
       await modal.present();
     
     
   }

}
