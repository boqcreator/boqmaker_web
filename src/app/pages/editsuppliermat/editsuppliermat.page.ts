import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editsuppliermat',
  templateUrl: './editsuppliermat.page.html',
  styleUrls: ['./editsuppliermat.page.scss'],
})
export class EditsuppliermatPage implements OnInit {
    item;
    catid;
    subcatid;

  constructor(private afs : AngularFirestore,
    private modalController: ModalController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    
    
  }

  async update(){
    const loading = await this.loadingController.create({
      message: 'Updating',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();

    this.afs.doc<any>(`boq/boq/supplierscat/${this.catid}/subcat/${this.subcatid}/suppliers/${this.item.id}`).update({
      name: this.item.name,
      no: this.item.no,
      tele: this.item.tele,
      fax: this.item.fax,
      email: this.item.email,
      website: this.item.website,
      des: this.item.des,
      updatedon : new Date().toISOString()
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

}
