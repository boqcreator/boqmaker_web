import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import {GridOptions} from "ag-grid-community";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';
import { DelRendererComponent } from 'src/app/del-renderer/del-renderer.component';
import { AddareaGPage } from '../addarea-g/addarea-g.page';
import { AddareaG2Page } from '../addarea-g2/addarea-g2.page';

@Component({
  selector: 'app-area-g2',
  templateUrl: './area-g2.page.html',
  styleUrls: ['./area-g2.page.scss'],
})
export class AreaG2Page implements OnInit {
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
      {headerName: 'ID', field: 'id' ,resizable  : true, sortable: true, filter: true,  },
      {headerName: 'Code', field: 'code' ,resizable  : true, sortable: true, filter: true,editable: true,  },
      {headerName: 'Name', field: 'name' ,resizable  : true, sortable: true, filter: true, editable: true, },
  ];

  this.rowData =  this.afs.collection(`boq/boq/generalareas2`, ref => ref.orderBy("id", "asc").limit(40)).valueChanges()

  }

  Del(item){
    this.afs.doc(`boq/boq/generalareas2/${item.rowData.id}`).delete().then(()=>{
      alert("Deleted")
    })
    
  }
  edit(item){

  }
  onCellValueChanged(e){
    this.afs.doc(`boq/boq/generalareas2/${e.data.id}`).update({
      code : e.data.code,
      name : e.data.name,
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

    this.afs.collection(`boq/boq/generalareas2`).get().subscribe(value=>{

      value.docs.forEach(doc =>{
        this.afs.doc(`boq/boq/generalareas2/${doc.ref.id}`).delete()
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
      component: AddareaG2Page,
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
