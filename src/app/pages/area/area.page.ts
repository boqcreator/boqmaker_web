import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddareaPage } from './addarea/addarea.page';
import { Storage } from '@ionic/storage';
import { EditareacatPage } from '../editareacat/editareacat.page';
import { EditareasubcatPage } from '../editareasubcat/editareasubcat.page';
import { EditareasubsubcatPage } from '../editareasubsubcat/editareasubsubcat.page';
import { EditareaPage } from '../editarea/editarea.page';

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
})
export class AreaPage implements OnInit {

  category;
  subcat = [];
  subsubcat = [];
  areas = [];

  SelCat;
  SsubCat;
  SsubsubCat;

  term1;
  term2;
  term3;
  term4;
  constructor(private menu : MenuController, private afs : AngularFirestore,
    public modalController: ModalController, private alertController: AlertController,
    private loadingController: LoadingController,
    private storage : Storage) {
      this.storage.get('areacat').then((value)=>{
        if(value !== null){
          this.SelCat = value
        }
      })
      this.storage.get('areasubcat').then((value)=>{
        if(value !== null){
          this.SsubCat = value
        }
      })
      this.storage.get('areasubsubcat').then((value)=>{
        if(value !== null){
          this.SsubsubCat = value
        }
      })

      
    menu.enable(false)
    this.getcat()
   }

  ngOnInit() {
  }

  getcat(){
    this.afs.collection<any>(`boq/boq/Areas`).snapshotChanges().subscribe(value =>{
      this.category = [];
      value.forEach(doc =>{
        this.category.push({
          name : doc.payload.doc.data().name,
          id : doc.payload.doc.id,
          des : doc.payload.doc.data().des
        })

      })
    })
  }

  getsubcat(){
    this.storage.set("areacat", this.SelCat);
    this.storage.remove('areasubcat')
    this.storage.remove('areasubcatList')

this.afs.collection<any>(`boq/boq/Areas/${this.SelCat}/cat`).snapshotChanges().subscribe(value =>{
  this.subcat = [];
  value.forEach(doc =>{
    this.subcat.push({
      name : doc.payload.doc.data().name,
      id : doc.payload.doc.id,
      des : doc.payload.doc.data().des,
      catID : this.SelCat
    })
  })
})
this.subsubcat = [];
this.areas = [];
  }

  getsubsubcat(){
    this.storage.set("areasubcat", this.SsubCat);
    this.storage.set("areasubcatList", this.subcat);
    this.afs.collection<any>(`boq/boq/Areas/${this.SelCat}/cat/${this.SsubCat}/subcat`).snapshotChanges().subscribe(value =>{
      this.subsubcat =[]
      value.forEach(doc =>{
        this.subsubcat.push({
          name : doc.payload.doc.data().name,
          id : doc.payload.doc.id,
          des : doc.payload.doc.data().des,
          catID : this.SelCat,
          subcatID : this.SsubCat,
        })

      })
    })
    this.areas = [];
  }
  getareas(){
    this.storage.set("areasubsubcat", this.SsubsubCat);
    this.storage.set("areasubsubcatList", this.subsubcat);
    this.afs.collection<any>(`boq/boq/Areas/${this.SelCat}/cat/${this.SsubCat}/subcat/${this.SsubsubCat}/items`).snapshotChanges().subscribe(value =>{
      this.areas = []
      value.forEach(doc =>{
        this.areas.push({
          name : doc.payload.doc.data().name,
          id : doc.payload.doc.id,
          image : doc.payload.doc.data().image,
          des : doc.payload.doc.data().des,
          code : doc.payload.doc.data().code,
          catID : this.SelCat,
          subcatID : this.SsubCat,
          subsubcatID : this.SsubsubCat,
        })
    })
  })
  }

  async gotoaddarea(){

    const modal = await this.modalController.create({
      component: AddareaPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();

  }

  addtolist(item){
    
  }

  async editcat(item){
     const modal = await this.modalController.create({
     component: EditareacatPage,
     componentProps: { item: item }
     });
   
     await modal.present();
  }

  async editsubcat(item){
    const modal = await this.modalController.create({
      component: EditareasubcatPage,
      componentProps: { item: item }
      });
    
      await modal.present();
  }

  async editsubsubcat(item){
    const modal = await this.modalController.create({
      component: EditareasubsubcatPage,
      componentProps: { item: item }
      });
    
      await modal.present();
  }
  async editarea(item){
    const modal = await this.modalController.create({
      component: EditareaPage,
      componentProps: { item: item }
      });
    
      await modal.present();
  }
  async delarea(item){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to delete this area?</strong>',
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
    
              this.afs.doc<any>(`boq/boq/Areas/${item.catID}/cat/${item.subcatID}/subcat/${item.subsubcatID}/items/${item.id}`).delete().then(async()=>{
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
  async delcat(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this category?</strong>',
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
  
            this.afs.doc<any>(`boq/boq/Areas/${item.id}`).delete().then(async()=>{
             loading.dismiss();
             this.getcat()
             this.getsubcat()
             this.getsubsubcat()
             this.getareas()
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

async delsubcat(item){
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
              message: 'Deleting...',
              duration: 2000,
              spinner: 'bubbles'
            });
            await loading.present();

          this.afs.doc<any>(`boq/boq/Areas/${item.catID}/cat/${item.id}`).delete().then(async()=>{
           loading.dismiss();
           this.getsubcat()
           this.getsubsubcat()
           this.getareas()
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
async delsubsubcat(item){
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to delete this Sub-subcategory?</strong>',
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

          this.afs.doc<any>(`boq/boq/Areas/${item.catID}/cat/${item.subcatID}/subcat/${item.id}`).delete().then(async()=>{
           loading.dismiss();
           this.getsubsubcat();
           this.getareas()
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


}
