import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.page.html',
  styleUrls: ['./addarea.page.scss'],
})
export class AddareaPage implements OnInit {
segment ="cat"

catName;
catDes;
catList;
SelectedCat;

SubcatName;
SubcatDes;
SubcatList;
selectedSubcat;

SubsubcatName;
SubsubcatDes;
SubsubcatList;
selectedSubsubcat;

AW= 0.0;

unitname;
unitdes;

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
    private modal : ModalController,
    public alertController: AlertController) { 
    this.afs.collection(`boq/boq/Areas`).get().subscribe(value =>{
      this.catList = value.docs
          })
  }

  ngOnInit() {
  }
  getSubcat(item){
    if(item){
      this.afs.collection(`boq/boq/Areas/${item.ref.id}/cat`).get().subscribe(value =>{
        this.SubcatList = value.docs
      })
    }
   
  }

  getSubsubcat(item){
    this.afs.collection(`boq/boq/Areas/${this.SelectedCat.ref.id}/cat/${item.ref.id}/subcat`).get().subscribe(value =>{
      this.SubsubcatList = value.docs
    })
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
      this.afs.collection(`boq/boq/Areas/${this.SelectedCat.ref.id}/cat`).add({
        name : this.SubcatName,
        des : this.SubcatDes,
        createdon : new Date().toISOString()
            }).then(()=>{
              this.loadingController.dismiss();
              this.presentAlert();
              this.SubcatName = "";
              this.SubcatDes = "";
              this.SelectedCat = [];
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
      this.afs.collection(`boq/boq/Areas/${this.SelectedCat.ref.id}/cat/${this.selectedSubcat.ref.id}/subcat`).add({
        name : this.SubsubcatName,
        des : this.SubsubcatDes,
        createdon : new Date().toISOString()
            }).then(()=>{
              this.loadingController.dismiss();
              this.presentAlert();
              this.SubsubcatName = "";
              this.SubsubcatDes = "";
              this.SelectedCat = [];
              this.selectedSubcat = [];
            }).catch((err)=>{
              alert(err)
            })
    }else{
      alert("Please fill the fields")
    }
  }

  addarea(){
    console.log(this.SelectedCat.ref.id)
    console.log(this.selectedSubcat.ref.id)
    console.log(this.selectedSubsubcat.ref.id)
    if(this.unitname.trim() && this.unitdes.trim()){
      this.loader()
            this.afs.collection(`boq/boq/Areas/${this.SelectedCat.ref.id}/cat/${this.selectedSubcat.ref.id}/subcat/${this.selectedSubsubcat.ref.id}/items`).add({
              name : this.unitname,
              des : this.unitdes,
              createdon : new Date().toISOString(),
              attributes : this.attributes
                  }).then(()=>{
                    this.loadingController.dismiss();
                    this.presentAlert();
                    this.unitname = "";
                    this.unitdes = "";
                    this.SelectedCat = [];
                    this.selectedSubcat = [];
                    this.selectedSubsubcat = [];
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
    this.modal.dismiss();
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
}
