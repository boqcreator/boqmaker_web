import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-addsupplier-e',
  templateUrl: './addsupplier-e.page.html',
  styleUrls: ['./addsupplier-e.page.scss'],
})
export class AddsupplierEPage implements OnInit {
  segment = "cat"
  catName = '';
  catDes = "null"
  subcatName = '';
  subcatDes = "null"

  catList=[]
  CatID = ""

  subcatList=[]
  SubcatID = ""

  
  sname= "";
  sno = "";
  stele ="";
  sfax ="";
  semail ="";
  swebsite="";
  sdes = "";

  
  constructor(private afs : AngularFirestore,
    public loadingController: LoadingController,
    private storage : Storage,
    private modal : ModalController,
    public alertController: AlertController) { 
      this.storage.get('Esuppliercat').then((value)=>{
        this.CatID = value
      })
      this.storage.get('Esuppliersubcat').then((value)=>{
        this.SubcatID = value
      })
      this.storage.get('EsuppliersubcatEist').then((value)=>{
        this.subcatList = value
      })
    this.afs.collection<any>(`boq/boq/equipmentsupplierscat`).snapshotChanges().subscribe(value =>{
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
    this.storage.set("Esuppliercat", this.CatID);
      this.afs.collection<any>(`boq/boq/equipmentsupplierscat/${this.CatID}/subcat`).snapshotChanges().subscribe(value =>{
        this.subcatList = [];
        value.forEach(doc =>{
          this.subcatList.push({name : doc.payload.doc.data().name, id : doc.payload.doc.id })
        })
        
      })
  }
  saveTostorage(){
    this.storage.set("Esuppliersubcat", this.SubcatID);
    this.storage.set("EsuppliersubcatEist", this.subcatList);

  }

  addcat(){
    if(this.catName.trim() && this.catDes.trim()){
      this.loader()
            this.afs.collection(`boq/boq/equipmentsupplierscat`).add({
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

  addsubcat(){
    if(this.subcatName.trim()){
      this.loader()
            this.afs.collection(`boq/boq/equipmentsupplierscat/${this.CatID}/subcat`).add({
              name : this.subcatName,
              des : this.subcatDes,
              createdon : new Date().toISOString()
                  }).then(()=>{
                    this.loadingController.dismiss();
                    this.presentAlert();
                    this.subcatName = "";
                    this.subcatDes = "";
                  }).catch((err)=>{
                    alert(err)
                  })
          }else{
            alert("Please fill the fields")
          }

  }

  addsupplier(){
           this.loader()
            this.afs.collection(`boq/boq/equipmentsupplierscat/${this.CatID}/subcat/${this.SubcatID}/suppliers`).add({
              name: this.sname,
              no: this.sno,
              tele: this.stele,
              fax: this.sfax,
              email: this.semail,
              website: this.swebsite,
              des: this.sdes,
              createdon : new Date().toISOString(),
              catid : this.CatID,
              subcatid : this.SubcatID
                  }).then(()=>{
                    this.loadingController.dismiss();
                     this.presentAlert();
                     this.sname= "";
                     this.sno = "";
                     this.stele = "";
                     this.sfax = "";
                     this.semail = "";
                     this.swebsite = "";
                     this.sdes = "";
                  }).catch((err)=>{
                    alert(err)
                  })
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
    this.modal.dismiss();
  }
}

