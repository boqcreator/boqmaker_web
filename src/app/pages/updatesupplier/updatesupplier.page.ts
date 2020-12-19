import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-updatesupplier',
  templateUrl: './updatesupplier.page.html',
  styleUrls: ['./updatesupplier.page.scss'],
})
export class UpdatesupplierPage implements OnInit {
   firelink;
   name;
  constructor(private modalController: ModalController,
     private afs : AngularFirestore,
     private loadingController: LoadingController
     ) { }


  ngOnInit() {
    this.afs.doc(this.firelink).get().subscribe(value => {
    this.name = value.data().name
    })
  }

  close(){
    this.modalController.dismiss()
   }

   async update(){
       const loading = await this.loadingController.create({
         message: 'Updating',
         duration: 10000,
         spinner: 'bubbles'
       });
       await loading.present();

       this.afs.doc(this.firelink).update({
         name : this.name
       }).then(()=>{
        loading.dismiss();
        alert("Updated");
       }).catch((err)=>{
        loading.dismiss();
        alert(err);
       })

     
   }
  
  

}
