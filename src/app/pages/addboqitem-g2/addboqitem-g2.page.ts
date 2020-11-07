import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-addboqitem-g2',
  templateUrl: './addboqitem-g2.page.html',
  styleUrls: ['./addboqitem-g2.page.scss'],
})
export class AddboqitemG2Page implements OnInit {
  arrayBuffer:any;
  file:File;
  data: [][];
  datatable = [];
  id = "";
  code = "";
  name = "";
  unit = "";
  price = 0;
  mprice = 0;
  lprice = 0;
  eprice = 0;
  sprice = 0;
  oprice = 0;

  segment = "form"
  constructor(private modalController: ModalController,
     private afs : AngularFirestore,
     private loadingController: LoadingController,
     private alertController: AlertController) {
      this.id = this.afs.createId();
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

    this.afs.doc(`boq/boq/generalboqitems2/${this.id}`).set({
      id: this.id,
      name : this.name,
      code : this.code,
      unit : this.unit,
      price : this.price,
      mprice: this.mprice,
      lprice: this.lprice,
      eprice:  this.eprice,
      sprice: this.sprice,
      oprice: this.oprice
    }).then(()=>{
      this.afs.doc(`boq/boq`).update({
        gbiID : this.id.toString()
      })
    }).then(()=>{
      loading.dismiss()
      alert("Added")
      this.code="";
      this.name = '';
      this.unit = '';
      this.price = 0;
      this.mprice =0;
      this.lprice = 0;
      this.sprice = 0;
      this.oprice = 0;
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
        this.afs.doc(`boq/boq/generalboqitems2/${id}`).set({
          id: id,
          name : ele[1],
          code : ele[0],
          unit : ele[2],
          price : ele[3],
          mprice: ele[4],
          lprice: ele[5],
          eprice:  ele[6],
          sprice: ele[7],
          oprice: ele[8]
        }).catch(async err =>{
          const alert = await this.alertController.create({
            header: 'Added',
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

