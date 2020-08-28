import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddareaPage } from './addarea/addarea.page';
import { Storage } from '@ionic/storage';

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
    public modalController: ModalController,
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

    this.afs.collection<any>(`boq/boq/Areas`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("areacat", this.SelCat);
    this.storage.remove('areasubcat')
    this.storage.remove('areasubcatList')

this.afs.collection<any>(`boq/boq/Areas/${this.SelCat}/cat`).snapshotChanges().subscribe(value =>{
  this.subcat = [];
  value.forEach(doc =>{
    this.subcat.push({
      name : doc.payload.doc.data().name,
      id : doc.payload.doc.id
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
          id : doc.payload.doc.id
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
          image : doc.payload.doc.data().image
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

}
