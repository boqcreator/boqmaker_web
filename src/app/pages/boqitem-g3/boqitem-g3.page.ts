import { Component, OnInit } from '@angular/core';
import { AddboqitemGPage } from '../addboqitem-g/addboqitem-g.page';
import { ModalController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import {GridOptions} from "ag-grid-community";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';
import { DelRendererComponent } from 'src/app/del-renderer/del-renderer.component';
import { AddboqitemG3Page } from '../addboqitem-g3/addboqitem-g3.page';

@Component({
  selector: 'app-boqitem-g3',
  templateUrl: './boqitem-g3.page.html',
  styleUrls: ['./boqitem-g3.page.scss'],
})
export class BoqitemG3Page implements OnInit {
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
     
      {headerName: 'Code', field: 'code' ,resizable  : true, sortable: true, filter: true,  },
      {headerName: 'Name', field: 'name' ,resizable  : true, sortable: true, filter: true, editable: true, },
      {headerName: 'Unit', field: 'unit' ,resizable  : true, sortable: true, filter: true,editable: true },
      {headerName: 'Unit Price', field: 'price' ,resizable  : true, sortable: true,editable: true, filter: true,valueFormatter: params => params.data.price.toFixed(3) },
      {headerName: 'Material Price', field: 'mprice' ,resizable  : true, sortable: true,editable: true, filter: true, valueFormatter: params => params.data.mprice.toFixed(3) },
      {headerName: 'Labour Price', field: 'lprice' ,resizable  : true, sortable: true,editable: true, filter: true,valueFormatter: params => params.data.lprice.toFixed(3) },
      {headerName: 'Equipment Price', field: 'eprice' ,resizable  : true, sortable: true,editable: true, filter: true,valueFormatter: params => params.data.eprice.toFixed(3) },
      {headerName: 'Subcontractor Price', field: 'sprice' ,resizable  : true, sortable: true,editable: true, filter: true,valueFormatter: params => params.data.sprice.toFixed(3) },
      {headerName: 'Other Price', field: 'oprice' ,resizable  : true, sortable: true,editable: true, filter: true, valueFormatter: params => params.data.oprice.toFixed(3)},
  ];

  this.rowData =  this.afs.collection(`boq/boq/generalboqitems3`, ref => ref.limit(40)).valueChanges()

  }

  Del(item){
    this.afs.doc(`boq/boq/generalboqitems3/${item.rowData.id}`).delete().then(()=>{
      alert("Deleted")
    })
    
  }
  edit(item){

  }
  onCellValueChanged(e){
    this.afs.doc(`boq/boq/generalboqitems3/${e.data.id}`).update({
      code : e.data.code,
      name : e.data.name,
      price :  parseFloat(e.data.price),
      mprice : parseFloat(e.data.mprice),
      lprice : parseFloat(e.data.lprice),
      eprice : parseFloat(e.data.eprice),
      sprice : parseFloat(e.data.sprice),
      oprice : parseFloat(e.data.oprice),
      unit : e.data.unit
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

    this.afs.collection(`boq/boq/generalboqitems3`).get().subscribe(value=>{

      value.docs.forEach(doc =>{
        this.afs.doc(`boq/boq/generalboqitems3/${doc.ref.id}`).delete()
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
      component: AddboqitemG3Page,
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