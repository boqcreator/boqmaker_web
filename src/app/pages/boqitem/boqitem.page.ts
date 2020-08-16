import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-boqitem',
  templateUrl: './boqitem.page.html',
  styleUrls: ['./boqitem.page.scss'],
})
export class BoqitemPage implements OnInit {
  category = [];
  subcat = [];
  subsubcat = [];
  boqitems = [];

  SelCat ="";
  SsubCat = "";
  SsubsubCat = "";

  term1;
  term2;
  term3;
  term4;

  constructor(private menu : MenuController,
    private afs : AngularFirestore,
    private alertController: AlertController,
    private navCtrl : NavController,
    private storage  : Storage,
    private router : Router) { 
    this.menu.enable(false);

    this.storage.get('boqitemcat').then((value)=>{
      if(value !== null){
        this.SelCat = value
      }
    })
    this.storage.get('boqitemsubcat').then((value)=>{
      if(value !== null){
        this.SsubCat = value
      }
    })
    this.storage.get('boqitemsubsubcat').then((value)=>{
      if(value !== null){
        this.SsubsubCat = value
      }
    })

    this.afs.collection<any>(`boq/boq/boqitemscat`).snapshotChanges().subscribe(value =>{
      this.category = [];
      value.forEach(doc =>{
        this.category.push({
          name : doc.payload.doc.data().name,
          id : doc.payload.doc.id
        })

      })

    })
  }

  ngOnInit() {
  }

  getsubcat(){
    this.storage.set("boqitemcat", this.SelCat);
    this.storage.remove('boqitemsubcat')
    this.storage.remove('boqitemsubcatList')
    this.afs.collection<any>(`boq/boq/boqitemscat/${this.SelCat}/subcat`).snapshotChanges().subscribe(value =>{
      this.subcat = [];
      value.forEach(doc =>{
        this.subcat.push({
          name : doc.payload.doc.data().name,
          id : doc.payload.doc.id
        })

      })
    })
    this.subsubcat = [];
    this.boqitems = [];
      }

      getsubsubcat(){
        this.storage.set("boqitemsubcat", this.SsubCat);
        this.storage.set("boqitemsubcatList", this.subcat);
        this.afs.collection<any>(`boq/boq/boqitemscat/${this.SelCat}/subcat/${this.SsubCat}/subsubcat`).snapshotChanges().subscribe(value =>{
          this.subsubcat =[]
          value.forEach(doc =>{
            this.subsubcat.push({
              name : doc.payload.doc.data().name,
              id : doc.payload.doc.id
            })
    
          })
        })
        this.boqitems = [];
      }

      getboqitems(){
        this.storage.set("boqitemsubsubcat", this.SsubsubCat);
        this.storage.set("boqitemsubsubcatList", this.subsubcat);
        this.afs.collection<any>(`boq/boq/boqitemscat/${this.SelCat}/subcat/${this.SsubCat}/subsubcat/${this.SsubsubCat}/boqitems`).snapshotChanges().subscribe(value =>{
          this.boqitems = []
          value.forEach(doc =>{
            this.boqitems.push({
              name : doc.payload.doc.data().name,
              code : doc.payload.doc.data().code,
              image : doc.payload.doc.data().image,
              id : doc.payload.doc.id,
              price : doc.payload.doc.data().price,
              unit: doc.payload.doc.data().unit,
              materials: doc.payload.doc.data().materials,
              catID : doc.payload.doc.data().CatID,
              subcatID : doc.payload.doc.data().SubcatID,
              subsubcatID : doc.payload.doc.data().SubsubcatID
            })
    
          })
        })
      }

  addnew(){
    this.router.navigate([`addboqitem`])
  }
  edititem(item){
    this.router.navigate(['editboqitem/'+ item.catID+"&"+item.subcatID+"&"+item.subsubcatID+"&"+item.id.split('/')[0]]);
  }

  async deleteitem(item){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to delete this item?</strong>',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Delete',
            cssClass: 'alertDanger',
            handler: () => {
              this.afs.doc<any>(`boq/boq/boqitemscat/${item.catID}/subcat/${item.subcatID}/subsubcat/${item.subsubcatID}/boqitems/${item.id}`).delete();
            }
          }
        ]
      });
    
      await alert.present();
   
  }

}
