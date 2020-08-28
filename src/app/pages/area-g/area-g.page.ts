import { Component, OnInit } from '@angular/core';
import { AddareaGPage } from '../addarea-g/addarea-g.page';
import { ModalController, MenuController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-area-g',
  templateUrl: './area-g.page.html',
  styleUrls: ['./area-g.page.scss'],
})
export class AreaGPage implements OnInit {
  itemList = [];
  term;
  constructor(private modalController: ModalController,
     private menu : MenuController,
     private afs : AngularFirestore,
     private loadingController: LoadingController
     ) {
    this.menu.enable(false)
    this.presentLoading()
    this.afs.collection<any>(`boq/boq/generalareas`, ref => ref.orderBy("id", "asc")).valueChanges().subscribe(value =>{
      value.forEach(doc =>{
      this.pushToArray(this.itemList ,{
        id :doc.id ,
        name : doc.name,
        code : doc.code,
      })
      })
      this.loadingController.dismiss()
    })
   }

  ngOnInit() {
  }

  pushToArray(arr, obj) {
    const index = arr.findIndex((e) => e.id === obj.id);
  
    if (index === -1) {
        arr.push(obj);
    } else {
       if( arr[index].name != obj.name){
        arr[index].name = obj.name
       }
    }
  }
  

  Del(item){
    
  }
  edit(item){

  }

  async addnew(){
      const modal = await this.modalController.create({
      component: AddareaGPage,
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

