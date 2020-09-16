import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from "firebase"
import { ArealibPage } from '../../arealib/arealib.page';

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.page.html',
  styleUrls: ['./addarea.page.scss'],
})
export class AddareaPage implements OnInit {
segment ="cat"

pic;
code= "";
CatID = "";
SubcatID = "";
SubsubcatID = "";


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

AW= 0.0;

unitname = "";
unitdes = "";

allselected = false

attributes = [
  {name : "Unit_width" , flag: true },
  {name : "Unit_length" , flag: true },
  {name : "Unit_height" , flag: true },
  {name : "No_of_units" , flag: true },
  {name : "R" , flag: true },
  {name : "RO" , flag: true },
  {name : "L1" , flag: true },
  {name : "L2" , flag: true },
  {name : "L3" , flag: true },
  {name : "L4" , flag: true },
  {name : "L5" , flag: true },
  {name : "L6" , flag: true },
  {name : "L7" , flag: true },
  {name : "L8" , flag: true },
  {name : "Hal_Axis" , flag: true },
  {name : "Val_Axis" , flag: true },
  {name : "Floor_width_1" , flag: true },
  {name : "Floor_width_2" , flag: true },
  {name : "Floor_width_3" , flag: true },
  {name : "Floor_width_4" , flag: true },
  {name : "Floor_length_1" , flag: true },
  {name : "Floor_length_2" , flag: true },
  {name : "Floor_length_3" , flag: true },
  {name : "Floor_length_4" , flag: true },
  {name : "Wall_per_lengthA" , flag: true },
  {name : "Wall_per_lengthB" , flag: true },
  {name : "Wall_per_lengthC" , flag: true },
  {name : "Wall_per_lengthD" , flag: true },
  {name : "Wall_per_lengthE" , flag: true },
  {name : "Wall_per_lengthF" , flag: true },
  {name : "Wall_per_lengthG" , flag: true },
  {name : "Wall_per_lengthH" , flag: true },
  {name : "skirting_per_lengthA" , flag: true },
  {name : "skirting_per_lengthB" , flag: true },
  {name : "skirting_per_lengthC" , flag: true },
  {name : "skirting_per_lengthD" , flag: true },
  {name : "skirting_per_lengthE" , flag: true },
  {name : "skirting_per_lengthF" , flag: true },
  {name : "skirting_per_lengthG" , flag: true },
  {name : "skirting_per_lengthH" , flag: true },
  {name : "PCLA" , flag: true },
  {name : "PCLB" , flag: true },
  {name : "PCLC" , flag: true },
  {name : "PCLD" , flag: true },
  {name : "PCLE" , flag: true },
  {name : "PCLF" , flag: true },
  {name : "PCLG" , flag: true },
  {name : "PCLH" , flag: true },
  {name : "Y8" , flag: true },
  {name : "Y10" , flag: true },
  {name : "Y12" , flag: true },
  {name : "Y16" , flag: true },
  {name : "Y20" , flag: true },
  {name : "Y25" , flag: true },
  {name : "Y32" , flag: true },
  {name : "areaF" , flag: true },
  {name : "areaW" , flag: true },
  {name : "areaC" , flag: true },
  {name : "areaS" , flag: true },
  {name : "areaCOR" , flag: true },
  {name : "areaB" , flag: true },
  {name : "extraBlockDPC" , flag: true },
  {name : "conc" , flag: true },
  {name : "shutt" , flag: true },
  {name : "bit" , flag: true },
  {name : "polyth" , flag: true },
  {name : "steel" , flag: true },
  {name : "exc" , flag: true },
  {name : "fill" , flag: true },
  {name : "precast" , flag: true },


]


  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private modalController: ModalController,
    public alertController: AlertController,
    private storage : Storage) { 

    this.storage.get('areacat').then((value)=>{
      if(value !== null){
        this.CatID = value
        this.getSubcat()
      }

    })
    this.storage.get('areasubcat').then((value)=>{
      if(value !== null){
        this.SubcatID = value
        this.getSubsubcat()
      }
    })
    this.storage.get('areasubcatList').then((value)=>{
      this.subcatList = value
    })

    this.storage.get('areasubsubcat').then((value)=>{
      this.SubsubcatID = value
    })
    this.storage.get('areasubsubcatList').then((value)=>{
      this.subsubcatList = value
    })

    this.afs.collection<any>(`boq/boq/Areas`).snapshotChanges().subscribe(value =>{
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
  getSubcat(){
    this.storage.set("areacat", this.CatID);
      this.afs.collection<any>(`boq/boq/Areas/${this.CatID}/cat`).snapshotChanges().subscribe(value =>{
        this.subcatList = [];
        value.forEach(doc =>{
          this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
        })
      })

   
  }

  getSubsubcat(){
    this.storage.set("areasubcat", this.SubcatID);
    this.storage.set("areasubcatList", this.subcatList);
    this.afs.collection<any>(`boq/boq/Areas/${this.CatID}/cat/${this.SubcatID}/subcat`).snapshotChanges().subscribe(value =>{
      this.subsubcatList = [];
      value.forEach(doc =>{
        this.subsubcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
      })
    })
  }

  saveTostorage(){
    this.storage.set("areasubsubcat", this.SubsubcatID);
    this.storage.set("areasubsubcatList", this.subsubcatList);

  }

  addcat(){
    if(this.catName.trim() && this.catDes.trim()){
this.loader()
      this.afs.collection(`boq/boq/Areas`).add({
        name : this.catName,
        des : this.catDes,
        createdon : new Date().toISOString()
            }).then(()=>{
              this.loadingController.dismiss();
              this.presentAlert();
              this.catName = "";
              this.catDes = "";
            }).catch((err)=>{
              alert(err)
            })
    }else{
      alert("Please fill the fields")
    }
  }



  addSubcat(){
    if(this.SubcatName.trim() && this.SubcatDes.trim()){
this.loader()
      this.afs.collection(`boq/boq/Areas/${this.CatID}/cat`).add({
        name : this.SubcatName,
        des : this.SubcatDes,
        createdon : new Date().toISOString()
            }).then(()=>{
              this.loadingController.dismiss();
              this.presentAlert();
              this.SubcatName = "";
              this.SubcatDes = "";
            }).catch((err)=>{
              alert(err)
            })
    }else{
      alert("Please fill the fields")
    }
  }

  addSubsubcat(){
    if(this.SubsubcatName.trim() && this.SubsubcatDes.trim()){
this.loader()
      this.afs.collection(`boq/boq/Areas/${this.CatID}/cat/${this.SubcatID}/subcat`).add({
        name : this.SubsubcatName,
        des : this.SubsubcatDes,
        createdon : new Date().toISOString()
            }).then(()=>{
              this.loadingController.dismiss();
              this.presentAlert();
              this.SubsubcatName = "";
              this.SubsubcatDes = "";
            }).catch((err)=>{
              alert(err)
            })
    }else{
      alert("Please fill the fields")
    }
  }

  addarea(){
    if(this.unitname.trim() && this.unitdes.trim()){
      this.loader()
            this.afs.collection(`boq/boq/Areas/${this.CatID}/cat/${this.SubcatID}/subcat/${this.SubsubcatID}/items`).add({
              name : this.unitname,
              des : this.unitdes,
              code : this.code,
              createdon : new Date().toISOString(),
              attributes : this.attributes
                  }).then((value)=>{
                    if(this.pic){
                     var imagepath
                     imagepath =  `areas/${value.id}/${this.unitname}`;
                 
                      var storageRef =  firebase.storage().ref(imagepath);
                 
                          storageRef.put(this.pic).then(()=>{
                            firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
                                this.afs.doc(`boq/boq/Areas/${this.CatID}/cat/${this.SubcatID}/subcat/${this.SubsubcatID}/items/${value.id}`).update({
                                 image : url
                                });
                                });
                 
                          });
                    }else{
                     this.afs.doc(`boq/boq/Areas/${this.CatID}/cat/${this.SubcatID}/subcat/${this.SubsubcatID}/items/${value.id}`).update({
                       image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                      });
                    }
                  }).then(()=>{
                    this.loadingController.dismiss();
                    this.presentAlert();
                    this.unitname = "";
                    this.unitdes = "";
                  }).catch((err)=>{
                    alert(err)
                  })
          }else{
            alert("Please fill the fields")
          }
    }




  async loader(){
    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 2000
    });
    await loading.present();
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Added',
      message: 'Successfully Added!',
      buttons: ['OK']
    });

    await alert.present();
  }

  close(){
    this.modalController.dismiss();
  }

  selectall(){
   for (let index = 0; index <this.attributes.length; index++) {
      this.attributes[index].flag = true  
    }
    this.allselected = false
  }
  removeall(){
    for (let index = 0; index <this.attributes.length; index++) {
       this.attributes[index].flag = false
       
     }
     this.allselected = true
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
      this.unitname = data.data.name
      this.code = data.data.code
    }
 
}
}
