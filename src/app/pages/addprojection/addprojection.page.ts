import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addprojection',
  templateUrl: './addprojection.page.html',
  styleUrls: ['./addprojection.page.scss'],
})
export class AddprojectionPage implements OnInit {
  typename = "";
  typenote = "";
  projectionname = "";
  code = "";
  segment = "type";
  typeList;
  selectedtype;
  projectioncode ="";
  width1 = 0;
  width2 = 0;
  length1 = 0;
  length2 = 0;
  height =0;
  projectionnote = "";
  pic;
  constructor(private modalController: ModalController,
    private afs : AngularFirestore, 
    private loadingController: LoadingController) {
     }

  ngOnInit() {
    this.typeList = this.afs.collection(`boq/boq/projectiontypes`).valueChanges()
  }

  close(){
    this.modalController.dismiss();
  }

  async addtype(){
    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();

  this.afs.collection(`boq/boq/projectiontypes/`).add({
    name : this.typename,
    code : this.code,
    note : this.typenote,
  }).then((value)=>{
    this.afs.doc(`boq/boq/projectiontypes/${value.id}`).update({
      id : value.id
    })
  }).then(()=>{
    loading.dismiss()
    alert("Added")
    this.code="";
    this.typenote = '';
    this.typename = '';
  }).catch(err =>{
    alert(err)
  })
  }

  async addprojection(){
    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();

  this.afs.collection(`boq/boq/projections/`).add({
    name : this.projectionname,
    type : this.selectedtype,
    code : this.projectioncode,
    note : this.projectionnote,
    width1 : this.width1,
    width2 : this.width2,
    length1 : this.length1,
    length2 : this.length2,
    height : this.height
  }).then((value)=>{
    if(this.pic){
     var imagepath
     imagepath =  `projections/${value.id}/${this.projectionname}`;
 
      var storageRef =  firebase.storage().ref(imagepath);
 
          storageRef.put(this.pic).then(()=>{
            firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
                this.afs.doc(`boq/boq/projections/${value.id}`).update({
                 image : url,
                 id : value.id
                });
                });
 
          });
    }else{
     this.afs.doc(`boq/boq/projections/${value.id}`).update({
       image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
       id : value.id
     });
    }
  }).then(()=>{
    loading.dismiss()
    alert("Added")
  }).catch(err =>{
    alert(err)
  })
  }

  onFileSelected1(event){
    this.pic = event.target.files[0];
  }

}

