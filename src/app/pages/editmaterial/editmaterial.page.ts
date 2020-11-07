import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';
import { MateriallibPage } from '../materiallib/materiallib.page';
import * as firebase from "firebase"

@Component({
  selector: 'app-editmaterial',
  templateUrl: './editmaterial.page.html',
  styleUrls: ['./editmaterial.page.scss'],
})
export class EditmaterialPage implements OnInit {
  item;
  sname= "";
  sdes = "";
  pic;
  units = ['m','m2','m3','mm','kg','no','pr','doz','roll','load','sheet','tin','litre','gallon','item','pair','set','l.s','ton','kilo','pr']
  unit ="";
  price= 0.000;

  unit1 = "";
  price1= 0.000;

  unit2 = "";
  price2= 0.000;
  website = "";
  origin="";
  diameter=0;
  color="";
  grad = "";
  brand ="";
  thickness = 0;
  width = 0;
  length = 0;
  wastage = 0;

  constructor(private afs : AngularFirestore,
    private modalController: ModalController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.item)
  }

  async itemlibrary(){
    const modal = await this.modalController.create({
    component: MateriallibPage,
    });
  
    await modal.present();
    
    const data = await modal.onDidDismiss();
    if(data){
      this.item.name = data.data.name
      this.item.des = data.data.des
      this.item.unit = data.data.unit
      this.item.price = data.data.price
    }
 
}

  async update(){

    const loading = await this.loadingController.create({
      message: 'Updating',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();

    this.afs.doc(`boq/boq/materialscat/${this.item.catid}/subcat/${this.item.subcatid}/materials/${this.item.id}`).update({
      name: this.item.name,
      des: this.item.des,
      updatedon : new Date().toISOString(),
      catid : this.item.catid,
      subcatid : this.item.subcatid,
      unit : this.item.unit,
      price : this.item.price,
      unit1: this.item.unit1,
      price1 : this.item.price1,
      unit2 : this.item.unit2,
      price2 : this.item.price2,
      website  : this.item.website,
      origin : this.item.origin,
      diameter : this.item.diameter,
      color : this.item.color,
      grad  : this.item.grad,
      brand  : this.item.brand ,
      thickness  : this.item.thickness,
      width  : this.item.width,
      length  : this.item.length,
      wastage  : this.item.wastage,
    }).then((value)=>{
      if(this.pic){
       var imagepath
       imagepath =  `materials/${this.item.id}/${this.item.name}`;
   
        var storageRef =  firebase.storage().ref(imagepath);
   
            storageRef.put(this.pic).then(()=>{
              firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
                  this.afs.doc(`boq/boq/materialscat/${this.item.catid}/subcat/${this.item.subcatid}/materials/${this.item.id}`).update({
                   image : url
                  });
                  });
            });
      }
    }).then(()=>{
      loading.dismiss();
      alert("Updated")
    }).catch(err =>{
      loading.dismiss();
      alert(err)
    })



  }
  close(){
    this.modalController.dismiss();
  }

  onFileSelected1(event){
    this.pic = event.target.files[0];
  }

}
