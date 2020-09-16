import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { AddopeningPage } from '../addopening/addopening.page';
import { AngularFirestore } from '@angular/fire/firestore';
import {GridOptions} from "ag-grid-community";
import { TwobuttonRendererComponent } from 'src/app/renderer/twobutton-renderer.component';
import { EditopeningPage } from '../editopening/editopening.page';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.page.html',
  styleUrls: ['./opening.page.scss'],
})
export class OpeningPage implements OnInit {
  public gridOptions: GridOptions;
  frameworkComponents: any;
  List ; 
  rowData: any;
  typeList = []
  constructor(private menuController: MenuController,
    private modalController: ModalController,
    private alertController: AlertController,
    private afs : AngularFirestore,
    private loadingController: LoadingController) { 
    this.menuController.enable(false);
  }

  ngOnInit() {
     this.afs.collection<any>(`boq/boq/openingtypes`).valueChanges().subscribe(value =>{
       value.forEach(ele=>{
        this.typeList.push({name : ele.name , id : ele.id})
       })
    })
    this.gridOptions = <GridOptions>{};
    this.gridOptions.paginationPageSize= 20,
    this.frameworkComponents = { 
      buttonRenderer: TwobuttonRendererComponent,
    }
    this.gridOptions.columnDefs = [
      {
        headerName: 'Action',
        width:80,
        resizable  : true,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
        onClick1: this.edititem.bind(this),
        label1: 'create',
        onClick2: this.Del.bind(this),
        label2: 'trash',
        },
      },
      {headerName: 'Name', field: 'name' ,resizable  : true  },
      {headerName: 'Code', field: 'code' ,resizable  : true  },
      {headerName: 'Type', field: 'type.name' ,resizable  : true  },
      {headerName: 'Height', field: 'height' ,resizable  : true },
      {headerName: 'Width', field: 'width' ,resizable  : true },
      {headerName: 'Note', field: 'note' ,resizable  : true },

  ];
  this.rowData = this.afs.collection(`boq/boq/openings/`).valueChanges()
  
  }

  async addnew(){
    const modal = await this.modalController.create({
    component: AddopeningPage,
    });
  
    await modal.present();
  

}
async edititem(item){
  const modal = await this.modalController.create({
  component: EditopeningPage,
  componentProps: { item: item.rowData }
  });

  await modal.present();

}

Del(item){
  this.afs.doc(`boq/boq/openings/${item.rowData.id}`).delete().then(()=>{
    alert("Deleted")
  })
  
}


}
