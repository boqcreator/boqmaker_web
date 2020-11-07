import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import {GridOptions} from "ag-grid-community";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';
import { DelRendererComponent } from 'src/app/del-renderer/del-renderer.component';
import { AddlabourGPage } from '../addlabour-g/addlabour-g.page';

@Component({
  selector: 'app-labour-g',
  templateUrl: './labour-g.page.html',
  styleUrls: ['./labour-g.page.scss'],
})
export class LabourGPage implements OnInit {
  public gridOptions: GridOptions;
  frameworkComponents: any;
  itemList = [];
  term;
  rowData: any;
  constructor(private modalController: ModalController,
     private menu : MenuController,
     private alertController: AlertController,
     private afs : AngularFirestore,
     private loadingController: LoadingController
     ) {
    this.menu.enable(false)
   }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableCharts=true;
    this.gridOptions.enableRangeSelection=true;
    this.gridOptions.suppressClickEdit = true;
    this.gridOptions.paginationPageSize= 20,
    this.gridOptions.enableCellChangeFlash = true,
    this.frameworkComponents = {
      buttonRenderer: DelRendererComponent,
    }
    this.gridOptions.columnDefs = [
      {
        headerName: 'Action',
        width:80,
        resizable  : true,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
        onClick: this.Del.bind(this),
        },
      },
      {headerName: 'Name', field: 'name' ,resizable  : true, sortable: true, filter: true, editable: true, },
      {headerName: 'Des', field: 'des' ,resizable  : true, sortable: true, filter: true, editable: true, },
      {headerName: 'Unit', field: 'unit' ,resizable  : true, sortable: true, filter: true, editable: true, },
      {headerName: 'Price', field: 'price' ,resizable  : true, sortable: true, filter: true, editable: true, },
  ];

  this.rowData =  this.afs.collection(`boq/boq/generallabours`).valueChanges()

  }

  Del(item){
    this.afs.doc(`boq/boq/generallabours/${item.rowData.id}`).delete().then(()=>{
      alert("Deleted")
    })
    
  }
  edit(item){

  }
  onCellValueChanged(e){
    this.afs.doc(`boq/boq/generallabours/${e.data.id}`).update({
      name : e.data.name,
      des : e.data.des,
      price : e.data.price,
      unit : e.data.unit
    }).then(()=>{
      alert("Updated")
    })
  }
  async delall(){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: ' <strong>Are you sure you want to delete all boqitems</strong>?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Delete',
            handler: async () => {
              
                  
      const loading = await this.loadingController.create({
        message: 'Deleting...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();

    this.afs.collection(`boq/boq/generallabours`).get().subscribe(value=>{

      value.docs.forEach(doc =>{
        this.afs.doc(`boq/boq/generallabours/${doc.ref.id}`).delete()
      })
      this.loadingController.dismiss()
      this.itemList = [];
    })
            }
          }
        ]
      });
    
      await alert.present();

  }

  async addnew(){
      const modal = await this.modalController.create({
      component: AddlabourGPage,
      });
    
      await modal.present();
    
 
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading data',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

}

