import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editopening',
  templateUrl: './editopening.page.html',
  styleUrls: ['./editopening.page.scss'],
})
export class EditopeningPage implements OnInit {
  item;
  typeList=[];
  openname = "";
  typename = "";
  typenote = "";
  code = "";
  segment = "type";
  selectedtype;
  skirting=false;
  openingcode ="";
  width = 0;
  height =0;
  opennote = "";
  constructor(private modalController: ModalController,
    private afs : AngularFirestore, 
    private loadingController: LoadingController) { 
  }

  ngOnInit() {
    this.selectedtype = {id: this.item.type.id, note: this.item.type.note, name: this.item.type.name, code: this.item.type.code}
    this.skirting=this.item.skirting;
    this.openname = this.item.openname;
    this.openingcode = this.item.code;
    this.width = this.item.width;
    this.height = this.item.height;
    this.opennote = this.item.note;
    this.afs.collection(`boq/boq/openingtypes`).get().subscribe(value =>{
      value.docs.forEach(ele=>{
        this.typeList.push({id: ele.data().id, note: ele.data().note, name: ele.data().name, code: ele.data().code})
      })
    })
  }
  close(){
    this.modalController.dismiss();
  }
  co(){
   console.log (this.selectedtype)
  }
  compareObject(a: any, b: any) {
    return a.id === b.id;
 }

  async editopening(){

    const loading = await this.loadingController.create({
      message: 'Adding...',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();

  this.afs.doc(`boq/boq/openings/${this.item.id}`).update({
    name : this.openname,
    type : this.selectedtype,
    skirting : this.skirting,
    code : this.openingcode,
    note : this.opennote,
    width : this.width,
    height : this.height
  }).then(()=>{
    loading.dismiss()
    alert("Updated")
  }).catch(err =>{
    alert(err)
  })
  }

}
