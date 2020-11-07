import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { FormGroup,FormControl, FormBuilder, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AddsupplierPage } from '../addsupplier/addsupplier.page';
import { Storage } from '@ionic/storage';
import { AddsupplierLPage } from '../addsupplier-l/addsupplier-l.page';
import { AddsupplierEPage } from '../addsupplier-e/addsupplier-e.page';
import { AddsupplierOPage } from '../addsupplier-o/addsupplier-o.page';
import { EditsuppliermatPage } from '../editsuppliermat/editsuppliermat.page';
import { EditsupplierlabPage } from '../editsupplierlab/editsupplierlab.page';
import { EditsuppliereqPage } from '../editsuppliereq/editsuppliereq.page';
import { EditsupplieroPage } from '../editsuppliero/editsuppliero.page';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  supplierList=[]
  supplierID = ""

  term1
  term2
  term3

  LcatList=[]
  LCatID = ""

  LsubcatList=[]
  LSubcatID = ""

  LsupplierList=[]
  LsupplierID = ""

  Lterm1
  Lterm2
  Lterm3


  EcatEist=[]
  ECatID = ""

  EsubcatEist=[]
  ESubcatID = ""

  EsupplierEist=[]
  EsupplierID = ""

  Eterm1
  Eterm2
  Eterm3

  OcatOist=[]
  OCatID = ""

  OsubcatOist=[]
  OSubcatID = ""

  OsupplierOist=[]
  OsupplierID = ""

  Oterm1
  Oterm2
  Oterm3

  segment="ms"
  constructor(private menu : MenuController,
    private modalController: ModalController,
    private storage : Storage,
     private router : Router,
     private loadingController: LoadingController,
     private alertController: AlertController,
     private afs : AngularFirestore) {
    this.menu.enable(false)
    this.getmaterialcat();
    this.getlabourcat();
    this.getequipmentcat();
    this.getothercat();
   }

  ngOnInit() {
  }

  getmaterialcat(){
    this.storage.get('suppliercat').then((value)=>{
      this.CatID = value
    })
    this.storage.get('suppliersubcat').then((value)=>{
      this.SubcatID = value
    })
    this.afs.collection<any>(`boq/boq/supplierscat/`).snapshotChanges().subscribe(value =>{
      this.catList = [];
      value.forEach(doc =>{
       this.catList.push({
         name : doc.payload.doc.data().name,
         id : doc.payload.doc.id
       })
     })
    })
  }

  getsubcat(){
   this.storage.set("suppliercat", this.CatID);
   this.storage.remove('suppliersubcat')
   this.storage.remove('suppliersubcatList')
   this.supplierList = [];
    this.afs.collection<any>(`boq/boq/supplierscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
      this.subcatList = [];
      value.forEach(doc =>{
        this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
      })
      
    })
  }

  getsuppliers(){
    this.storage.set("suppliersubcat", this.SubcatID);
    this.storage.set("suppliersubcatList", this.subcatList);
    this.afs.collection<any>(`boq/boq/supplierscat/${this.CatID}/subcat/${this.SubcatID}/suppliers`).snapshotChanges().subscribe(value =>{
      this.supplierList = [];
      value.forEach(doc =>{
        this.supplierList.push({
        name : doc.payload.doc.data().name, 
        id : doc.payload.doc.id,
        no: doc.payload.doc.data().no,
        tele: doc.payload.doc.data().tele,
        fax: doc.payload.doc.data().fax,
        email: doc.payload.doc.data().email,
        website: doc.payload.doc.data().website,
        des: doc.payload.doc.data().des,

      })
      })
      
    })

  }


  getlabourcat(){
    this.storage.get('Lsuppliercat').then((value)=>{
      this.LCatID = value
    })
    this.storage.get('Lsuppliersubcat').then((value)=>{
      this.LSubcatID = value
    })
    this.afs.collection<any>(`boq/boq/Laboursupplierscat/`).snapshotChanges().subscribe(value =>{
      this.LcatList=[];
      value.forEach(doc =>{
       this.LcatList.push({
         name : doc.payload.doc.data().name,
         id : doc.payload.doc.id
       })
     })
    })
  }



  Lgetsubcat(){
    this.storage.set("Lsuppliercat", this.LCatID);
    this.storage.remove('Lsuppliersubcat')
    this.storage.remove('LsuppliersubcatList')
    this.LsupplierList = [];
     this.afs.collection<any>(`boq/boq/Laboursupplierscat/${this.LCatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.LsubcatList = [];
       value.forEach(doc =>{
         this.LsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   Lgetsuppliers(){
     this.storage.set("Lsuppliersubcat", this.LSubcatID);
     this.storage.set("LsuppliersubcatList", this.LsubcatList);
     this.afs.collection<any>(`boq/boq/Laboursupplierscat/${this.LCatID}/subcat/${this.LSubcatID}/suppliers`).snapshotChanges().subscribe(value =>{
       this.LsupplierList = [];
       value.forEach(doc =>{
         this.LsupplierList.push({
         name : doc.payload.doc.data().name, 
         id : doc.payload.doc.id,
         no: doc.payload.doc.data().no,
         tele: doc.payload.doc.data().tele,
         fax: doc.payload.doc.data().fax,
         email: doc.payload.doc.data().email,
         website: doc.payload.doc.data().website,
         des: doc.payload.doc.data().des,
 
       })
       })
       
     })
 
   }



   getequipmentcat(){
    this.storage.get('Esuppliercat').then((value)=>{
      this.ECatID = value
    })
    this.storage.get('Esuppliersubcat').then((value)=>{
      this.ESubcatID = value
    })
    this.afs.collection<any>(`boq/boq/equipmentsupplierscat/`).snapshotChanges().subscribe(value =>{
      this.EcatEist=[];
      value.forEach(doc =>{
       this.EcatEist.push({
         name : doc.payload.doc.data().name,
         id : doc.payload.doc.id
       })
     })
    })
  }



  Egetsubcat(){
    this.storage.set("Esuppliercat", this.ECatID);
    this.storage.remove('Esuppliersubcat')
    this.storage.remove('EsuppliersubcatEist')
    this.EsupplierEist = [];
     this.afs.collection<any>(`boq/boq/equipmentsupplierscat/${this.ECatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.EsubcatEist = [];
       value.forEach(doc =>{
         this.EsubcatEist.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   Egetsuppliers(){
     this.storage.set("Esuppliersubcat", this.ESubcatID);
     this.storage.set("EsuppliersubcatEist", this.EsubcatEist);
     this.afs.collection<any>(`boq/boq/equipmentsupplierscat/${this.ECatID}/subcat/${this.ESubcatID}/suppliers`).snapshotChanges().subscribe(value =>{
       this.EsupplierEist = [];
       value.forEach(doc =>{
         this.EsupplierEist.push({
         name : doc.payload.doc.data().name, 
         id : doc.payload.doc.id,
         no: doc.payload.doc.data().no,
         tele: doc.payload.doc.data().tele,
         fax: doc.payload.doc.data().fax,
         email: doc.payload.doc.data().email,
         website: doc.payload.doc.data().website,
         des: doc.payload.doc.data().des,
 
       })
       })
       
     })
 
   }


   getothercat(){
    this.storage.get('Osuppliercat').then((value)=>{
      this.OCatID = value
    })
    this.storage.get('Osuppliersubcat').then((value)=>{
      this.OSubcatID = value
    })
    this.afs.collection<any>(`boq/boq/othersupplierscat/`).snapshotChanges().subscribe(value =>{
      this.OcatOist=[];
      value.forEach(doc =>{
       this.OcatOist.push({
         name : doc.payload.doc.data().name,
         id : doc.payload.doc.id
       })
     })
    })
  }



  Ogetsubcat(){
    this.storage.set("Osuppliercat", this.OCatID);
    this.storage.remove('Osuppliersubcat')
    this.storage.remove('OsuppliersubcatOist')
    this.OsupplierOist = [];
     this.afs.collection<any>(`boq/boq/othersupplierscat/${this.OCatID}/subcat`).snapshotChanges().subscribe(value =>{
       this.OsubcatOist = [];
       value.forEach(doc =>{
         this.OsubcatOist.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
       })
       
     })
   }
 
   Ogetsuppliers(){
     this.storage.set("Osuppliersubcat", this.OSubcatID);
     this.storage.set("OsuppliersubcatOist", this.OsubcatOist);
     this.afs.collection<any>(`boq/boq/othersupplierscat/${this.OCatID}/subcat/${this.OSubcatID}/suppliers`).snapshotChanges().subscribe(value =>{
       this.OsupplierOist = [];
       value.forEach(doc =>{
         this.OsupplierOist.push({
         name : doc.payload.doc.data().name, 
         id : doc.payload.doc.id,
         no: doc.payload.doc.data().no,
         tele: doc.payload.doc.data().tele,
         fax: doc.payload.doc.data().fax,
         email: doc.payload.doc.data().email,
         website: doc.payload.doc.data().website,
         des: doc.payload.doc.data().des,
 
       })
       })
       
     })
 
   }





  async addnew(){
    if(this.segment == "ms"){
      const modal = await this.modalController.create({
        component: AddsupplierPage,
        });
      
        await modal.present();
    }
    else if(this.segment == "ls"){
      const modal = await this.modalController.create({
        component: AddsupplierLPage,
        });
      
        await modal.present();
    }
    else if(this.segment == "es"){
      const modal = await this.modalController.create({
        component: AddsupplierEPage,
        });
      
        await modal.present();
    }

    else if(this.segment == "other"){
      const modal = await this.modalController.create({
        component: AddsupplierOPage,
        });
      
        await modal.present();
    }

    
    
  }


  async editmat(item){
    const modal = await this.modalController.create({
    component: EditsuppliermatPage,
    componentProps: { item: item,
    catid : this.CatID,
    subcatid : this.SubcatID }
    });
  
    await modal.present();

  }
  async editlab(item){
    const modal = await this.modalController.create({
    component: EditsupplierlabPage,
    componentProps: { item: item,
    catid : this.LCatID,
    subcatid : this.LSubcatID }
    });
  
    await modal.present();

  }
  async editeq(item){
    const modal = await this.modalController.create({
    component: EditsuppliereqPage,
    componentProps: { item: item,
    catid : this.ECatID,
    subcatid : this.ESubcatID }
    });
  
    await modal.present();

  }

  async edito(item){
    const modal = await this.modalController.create({
    component: EditsupplieroPage,
    componentProps: { item: item,
    catid : this.OCatID,
    subcatid : this.OSubcatID }
    });
  
    await modal.present();

  }
  async delmat(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Supplier?</strong>',
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
  
              this.afs.doc(`boq/boq/supplierscat/${this.CatID}/subcat/${this.SubcatID}/suppliers/${item.id}`).delete().then(async()=>{
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
  async dellab(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Supplier?</strong>',
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
  
              this.afs.doc(`boq/boq/Laboursupplierscat/${this.LCatID}/subcat/${this.LSubcatID}/suppliers/${item.id}`).delete().then(async()=>{
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
  async deleq(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Supplier?</strong>',
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
  
              this.afs.doc(`boq/boq/equipmentsupplierscat/${this.ECatID}/subcat/${this.ESubcatID}/suppliers/${item.id}`).delete().then(async()=>{
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
  async delo(item){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this Supplier?</strong>',
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
  
              this.afs.doc(`boq/boq/othersupplierscat/${this.OCatID}/subcat/${this.OSubcatID}/suppliers/${item.id}`).delete().then(async()=>{
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








  gotocons(){
    this.router.navigate(['constractor'])
   }
 
   gotoproj(){
     this.router.navigate(['projects'])
   }
   gotohome(){
     this.router.navigate(['home'])
   }
 
   gotoArea(){
     this.router.navigate(['area'])
   }
   gotosupplier(){
     this.router.navigate(['supplier'])
   }
   gotomaterial(){
     this.router.navigate(['material'])
   }
   gotoitem(){
     this.router.navigate(['boqitem'])
   }
   gotoReport(){
     this.router.navigate(['report-final-priced-bill'])
   }

}
