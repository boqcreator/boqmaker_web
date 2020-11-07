import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-addmaterial-g',
  templateUrl: './addmaterial-g.page.html',
  styleUrls: ['./addmaterial-g.page.scss'],
})
export class AddmaterialGPage implements OnInit {
  arrayBuffer:any;
  file:File;
  data: [][];
  datatable = [];
  id = "";
  name = "";
  des = "";
  unit = "";
  price = "";

  segment = "form"
  constructor(private modalController: ModalController,
     private afs : AngularFirestore,
     private loadingController: LoadingController,
     private alertController: AlertController) {
   }

  ngOnInit() {
  }

  async additem(){
      const loading = await this.loadingController.create({
        message: 'Adding...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();

    this.afs.collection(`boq/boq/generalmaterials`).add({
      name : this.name,
      des : this.des,
      unit : this.unit,
      price : this.price,
    }).then((value)=>{
      this.afs.doc(`boq/boq/generalmaterials/${value.id}`).update({
        id : value.id
      })
    }).then(()=>{
      loading.dismiss()
      alert("Added")
      this.name = '';
      this.des = '';
      this.unit = '';
      this.price = '';
    }).catch(err =>{
      alert(err)
    })
  }
  async Uploadexcel(){
    if(this.datatable.length >0){
      const loading = await this.loadingController.create({
        message: 'Adding...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();
      this.datatable.forEach(ele =>{
        const id = this.afs.createId()
        this.afs.doc(`boq/boq/generalmaterials/${id}`).set({
          id: id,
          name : ele[0],
          des : ele[1],
          unit : ele[2],
          price : ele[3],
        }).catch(async err =>{
          const alert = await this.alertController.create({
            header: 'Error',
            message: err,
            buttons: ['OK']
          });
        
          await alert.present();
        })
      }) 
      this.loadingController.dismiss()
        const alert = await this.alertController.create({
          header: 'Added',
          message: 'Successfully Added!.',
          buttons: ['OK']
        });
      
        await alert.present();
     
    }else{
      alert("No data to upload, Please add File to upload data.")
    }
  }


  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

      this.datatable = this.data.slice(1);
  

    };

    reader.readAsBinaryString(target.files[0]);

  }

  remove(item){
    let index = this.datatable.findIndex(x => x == item)
    if(index !== -1){
      this.datatable.splice(index, 1)
    }
  }


  close(){
this.modalController.dismiss()
  }

}


