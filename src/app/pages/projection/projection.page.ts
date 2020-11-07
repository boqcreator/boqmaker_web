import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { AddprojectionPage } from '../addprojection/addprojection.page';
import { AngularFirestore } from '@angular/fire/firestore';
import {GridOptions} from "ag-grid-community";
import { TwobuttonRendererComponent } from 'src/app/renderer/twobutton-renderer.component';
import { EditopeningPage } from '../editopening/editopening.page';
import { EditprojectionPage } from '../editprojection/editprojection.page';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.page.html',
  styleUrls: ['./projection.page.scss'],
})
export class ProjectionPage implements OnInit {
projectionList;
public gridOptions: GridOptions;
frameworkComponents: any;
List ; 
rowData: any;
  constructor(private modalController: ModalController,
    private afs : AngularFirestore,
    private menuController: MenuController,
    private alertController: AlertController,
    private loadingController: LoadingController) {
      this.menuController.enable(false);
     }
    
    

  ngOnInit() {

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
      {headerName: 'Width1', field: 'width1' ,resizable  : true },
      {headerName: 'Width2', field: 'width2' ,resizable  : true },
      {headerName: 'Length1', field: 'length1' ,resizable  : true },
      {headerName: 'Length2', field: 'length2' ,resizable  : true },
      {headerName: 'Height', field: 'height' ,resizable  : true },
      {headerName: 'Note', field: 'note' ,resizable  : true },

  ];

   this.rowData = this.afs.collection(`boq/boq/projections`).valueChanges()
  }

  async edititem(item){
    const modal = await this.modalController.create({
    component: EditprojectionPage,
    componentProps: { item: item.rowData }
    });
  
    await modal.present();
  
  }
  
  Del(item){
    this.afs.doc(`boq/boq/projections/${item.rowData.id}`).delete().then(()=>{
      alert("Deleted")
    })
    
  }

  async addnew(){
    const modal = await this.modalController.create({
    component: AddprojectionPage,
    });
  
    await modal.present();

}

}
