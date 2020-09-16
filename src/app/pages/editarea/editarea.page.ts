import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, LoadingController } from '@ionic/angular';
import { ArealibPage } from '../arealib/arealib.page';
import * as firebase from "firebase"

@Component({
  selector: 'app-editarea',
  templateUrl: './editarea.page.html',
  styleUrls: ['./editarea.page.scss'],
})
export class EditareaPage implements OnInit {
  item;
  catName;
  catDes;
  catList;
  SelectedCat;

  SubcatName;
  SubcatDes;
  subcatList;
  selectedSubcat;

  SubsubcatName;
  SubsubcatDes;
  subsubcatList;
  selectedSubsubcat;

  pic;
  constructor(private afs : AngularFirestore,
    private modalController: ModalController,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }
  onFileSelected1(event){
    this.pic = event.target.files[0];
  }

  async itemlibrary(){
    const modal = await this.modalController.create({
    component: ArealibPage,
    });
  
    await modal.present();
    
    const data = await modal.onDidDismiss();
    if(data){
      this.item.name = data.data.name
      this.item.code = data.data.code
    }
 
}

close(){
  this.modalController.dismiss();
}

async updatearea(){
  const loading = await this.loadingController.create({
    message: 'Updating',
    duration: 20000,
    spinner: 'bubbles'
  });
  await loading.present();

  this.afs.doc(`boq/boq/Areas/${this.item.catID}/cat/${this.item.subcatID}/subcat/${this.item.subsubcatID}/items/${this.item.id}`).update({
    name : this.item.name,
    des : this.item.des,
    code : this.item.code,
        }).then((value)=>{
          if(this.pic){
           var imagepath
           imagepath =  `areas/${this.item.id}/${this.item.name}`;
       
            var storageRef =  firebase.storage().ref(imagepath);
       
                storageRef.put(this.pic).then(()=>{
                  firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
                      this.afs.doc(`boq/boq/Areas/${this.item.catID}/cat/${this.item.subcatID}/subcat/${this.item.subsubcatID}/items/${this.item.id}`).update({
                       image : url
                      });
                      });
                });
          }
        }).then(()=>{
    loading.dismiss();
    alert("Updated")
  })
}

}
