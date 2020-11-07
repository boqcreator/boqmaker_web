import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-editprojection',
  templateUrl: './editprojection.page.html',
  styleUrls: ['./editprojection.page.scss'],
})
export class EditprojectionPage implements OnInit {
  item;
  typename = "";
  typenote = "";
  projectionname = "";
  code = "";
  segment = "type";
  typeList = [];
  selectedtype;
  projectioncode ="";
  width1 = 0;
  width2 = 0;
  length1 = 0;
  length2 = 0;
  height =0;
  icon = "";
  projectionnote = "";
  pic;
  constructor(private modalController: ModalController,
    private afs : AngularFirestore, 
    private loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.item)
    this.selectedtype = {id: this.item.type.id, note: this.item.type.note, name: this.item.type.name, code: this.item.type.code}
    this.projectionname = this.item.name;
    this.projectioncode = this.item.code;
    this.width1 = this.item.width1;
    this.width2 = this.item.width2;
    this.length1 = this.item.length1;
    this.length2 = this.item.length2;
    this.height = this.item.height;
    this.icon = this.item.image;
    this.projectionnote = this.item.note;
    this.afs.collection(`boq/boq/projectiontypes`).get().subscribe(value =>{
      value.docs.forEach(ele=>{
        this.typeList.push({id: ele.data().id, note: ele.data().note, name: ele.data().name, code: ele.data().code})
      })
    })
  }
  close(){
    this.modalController.dismiss();
  }
  compareObject(a: any, b: any) {
    return a.id === b.id;
 }

 async editprojection(){

  const loading = await this.loadingController.create({
    message: 'Updating...',
    duration: 20000,
    spinner: 'bubbles'
  });
  await loading.present();

this.afs.doc(`boq/boq/projections/${this.item.id}`).update({
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
   imagepath =  `projections/${this.item.id}`;

    var storageRef =  firebase.storage().ref(imagepath);

        storageRef.put(this.pic).then(()=>{
          firebase.storage().ref(imagepath).getDownloadURL().then(url =>{
              this.afs.doc(`boq/boq/projections/${this.item.id}`).update({
               image : url,
              });
              });

        });
  }
}).then(()=>{
  loading.dismiss()
  alert("Updated")
}).catch(err =>{
  alert(err)
})
}
onFileSelected1(event){
  this.pic = event.target.files[0];
}

}
