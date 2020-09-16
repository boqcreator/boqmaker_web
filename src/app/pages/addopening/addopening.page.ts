import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addopening',
  templateUrl: './addopening.page.html',
  styleUrls: ['./addopening.page.scss'],
})
export class AddopeningPage implements OnInit {
  typename = "";
  typenote = "";
  openname = "";
  code = "";
  segment = "type";
  typeList;
  selectedtype;
  skirting=false;
  openingcode ="";
  width = 0;
  height =0;
  opennote = "";
  pic;
  constructor(private modalController: ModalController,
    private afs : AngularFirestore, 
    private loadingController: LoadingController) {
      this.typeList = this.afs.collection(`boq/boq/openingtypes`).valueChanges()
     }

  ngOnInit() {
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

  this.afs.collection(`boq/boq/openingtypes/`).add({
    name : this.typename,
    code : this.code,
    note : this.typenote,
  }).then((value)=>{
    this.afs.doc(`boq/boq/openingtypes/${value.id}`).update({
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

  async addopening(){
    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();

  this.afs.collection(`boq/boq/openings/`).add({
    name : this.openname,
    type : this.selectedtype,
    skirting : this.skirting,
    code : this.openingcode,
    note : this.opennote,
    width : this.width,
    height : this.height
  }).then((value)=>{
    if(this.pic){
     var imagepath
     imagepath =  `openings/${value.id}/${this.openname}`;
 
      var storageRef =  firebase.storage().ref(imagepath);
 
          storageRef.put(this.pic).then(()=>{
            firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
                this.afs.doc(`boq/boq/openings/${value.id}`).update({
                 image : url,
                 id : value.id
                });
                });
 
          });
    }else{
     this.afs.doc(`boq/boq/boqitems/${value.id}`).update({
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
