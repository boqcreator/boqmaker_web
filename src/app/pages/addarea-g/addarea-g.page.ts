import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-addarea-g',
  templateUrl: './addarea-g.page.html',
  styleUrls: ['./addarea-g.page.scss'],
})
export class AddareaGPage implements OnInit {
  arrayBuffer:any;
  file:File;
  data: [][];
  datatable = [];
  id = 0;
  code = "";
  name = "";

  segment = "form"
  constructor(private modalController: ModalController,
     private afs : AngularFirestore,
     private loadingController: LoadingController,
     private alertController: AlertController) {
    this.afs.doc<any>(`boq/boq`).snapshotChanges().subscribe(value =>{
    this.id = parseInt(value.payload.data().gaID) + 1 
    })
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

    this.afs.doc(`boq/boq/generalareas/${this.id}`).set({
      id: this.id,
      name : this.name,
      code : this.code,
    }).then(()=>{
      this.afs.doc(`boq/boq`).update({
        gaID : this.id.toString()
      })
    }).then(()=>{
      loading.dismiss()
      alert("Added")
      this.code="";
      this.name = '';
    }).catch(err =>{
      alert(err)
    })
  }
  async Uploadexcel(){
    if(this.datatable.length >0){
      let iid = this.id-1
      const loading = await this.loadingController.create({
        message: 'Adding...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();
      this.datatable.forEach(ele =>{
        ++iid
        this.afs.doc(`boq/boq/generalareas/${iid}`).set({
          id: iid,
          name : ele[1],
          code : ele[0],
        }).then(()=>{
          this.afs.doc(`boq/boq`).update({
            gaID : iid.toString()
          }).catch(async err =>{
            const alert = await this.alertController.create({
              header: 'Error',
              message: err,
              buttons: ['OK']
            });
          
            await alert.present();
          })
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

