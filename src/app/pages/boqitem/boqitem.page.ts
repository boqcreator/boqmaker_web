import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import {GridOptions} from "ag-grid-community";
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';
import { TwobuttonRendererComponent } from 'src/app/renderer/twobutton-renderer.component';

@Component({
  selector: 'app-boqitem',
  templateUrl: './boqitem.page.html',
  styleUrls: ['./boqitem.page.scss'],
})
export class BoqitemPage implements OnInit {
  public gridOptions: GridOptions;
  frameworkComponents: any;
  category = [];
  subcat = [];
  subsubcat = [];
  boqitems = [];

  SelCat ="";
  SsubCat = "";
  SsubsubCat = "";

  term1;
  term2;
  term3;
  term4;

  AllboqitemsList = [];

  rowData: any;

  constructor(private menu : MenuController,
    private afs : AngularFirestore,
    private alertController: AlertController,
    private navCtrl : NavController,
    private storage  : Storage,
    private router : Router) { 
    this.menu.enable(false);
    // this.storage.get('boqitemcat').then((value)=>{
    //   if(value !== null){
    //     this.SelCat = value
    //   }
    // })
    // this.storage.get('boqitemsubcat').then((value)=>{
    //   if(value !== null){
    //     this.SsubCat = value
    //   }
    // })
    // this.storage.get('boqitemsubsubcat').then((value)=>{
    //   if(value !== null){
    //     this.SsubsubCat = value
    //   }
    // })

    // this.afs.collection<any>(`boq/boq/boqitemscat`).snapshotChanges().subscribe(value =>{
    //   this.category = [];
    //   value.forEach(doc =>{
    //     this.category.push({
    //       name : doc.payload.doc.data().name,
    //       id : doc.payload.doc.id
    //     })

    //   })

    // })
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableCharts=true;
    this.gridOptions.enableRangeSelection=true;
    this.gridOptions.suppressClickEdit = true;
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
        onClick2: this.deleteitem.bind(this),
        label2: 'trash',
        },
      },
    {headerName: 'Category', field: 'category' , hide: true,resizable  : true, sortable: true, filter: true},
    {headerName: 'Sub Category', field: 'subcategory' , hide: true,resizable  : true, sortable: true, filter: true },
    {headerName: 'Sub sub-category', field: 'subsubcategory' , hide: true, sortable: true, filter: true },
    {headerName: 'Name', field: 'name' ,resizable  : true, sortable: true, filter: true,  },
    {headerName: 'Code', field: 'code' ,resizable  : true, sortable: true, filter: true,  },
    {headerName: 'Unit', field: 'unit' ,resizable  : true, sortable: true, filter: true },
    {headerName: 'Lib unit Price', field: 'libprice' , hide: true,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Unit Price', field: 'price' ,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Material Price', field: 'materialtotal' ,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Lib Material', field: 'libmaterialtotal' ,hide: true,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Equipment Price', field: 'equipmenttotal' ,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Lib Equipment', field: 'libequipmenttotal' ,hide: true,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Labour Price', field: 'labourtotal' ,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Lib Labour', field: 'liblabourtotal' ,hide: true,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Subcont Price', field: 'subcontractortotal' ,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Lib Subcont', field: 'libsubcontractortotal' ,hide: true,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Other Price', field: 'othertotal' ,hide: true,resizable  : true, sortable: true, filter: true, },
    {headerName: 'Lib Other', field: 'libothertotal' ,resizable  : true, sortable: true, filter: true, },
];

    this.getallitems(); 
  }

  getallitems(){
    this.rowData = this.afs.collection<any>(`boq/boq/boqitems`).valueChanges()
  }

  getsubcat(){
    this.storage.set("boqitemcat", this.SelCat);
    this.storage.remove('boqitemsubcat')
    this.storage.remove('boqitemsubcatList')
    this.afs.collection<any>(`boq/boq/boqitemscat/${this.SelCat}/subcat`).snapshotChanges().subscribe(value =>{
      this.subcat = [];
      value.forEach(doc =>{
        this.subcat.push({
          name : doc.payload.doc.data().name,
          id : doc.payload.doc.id
        })

      })
    })
    this.subsubcat = [];
    this.boqitems = [];
      }

      getsubsubcat(){
        this.storage.set("boqitemsubcat", this.SsubCat);
        this.storage.set("boqitemsubcatList", this.subcat);
        this.afs.collection<any>(`boq/boq/boqitemscat/${this.SelCat}/subcat/${this.SsubCat}/subsubcat`).snapshotChanges().subscribe(value =>{
          this.subsubcat =[]
          value.forEach(doc =>{
            this.subsubcat.push({
              name : doc.payload.doc.data().name,
              id : doc.payload.doc.id
            })
    
          })
        })
        this.boqitems = [];
      }

      getboqitems(){
        this.storage.set("boqitemsubsubcat", this.SsubsubCat);
        this.storage.set("boqitemsubsubcatList", this.subsubcat);
        this.afs.collection<any>(`boq/boq/boqitemscat/${this.SelCat}/subcat/${this.SsubCat}/subsubcat/${this.SsubsubCat}/boqitems`).snapshotChanges().subscribe(value =>{
          this.boqitems = []
          value.forEach(doc =>{
            this.boqitems.push({
              name : doc.payload.doc.data().name,
              code : doc.payload.doc.data().code,
              image : doc.payload.doc.data().image,
              id : doc.payload.doc.id,
              price : doc.payload.doc.data().price,
              unit: doc.payload.doc.data().unit,
              materials: doc.payload.doc.data().materials,
              catID : doc.payload.doc.data().CatID,
              subcatID : doc.payload.doc.data().SubcatID,
              subsubcatID : doc.payload.doc.data().SubsubcatID
            })
    
          })
        })
      }

  addnew(){
    this.router.navigate([`addboqitem`])
  }
  edititem(item){
    this.router.navigate(['editboqitem/'+ item.rowData.id.split('/')[0]]);
  }

  async deleteitem(item){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Are you sure you want to delete this item?</strong>',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Delete',
            cssClass: 'alertDanger',
            handler: () => {
              this.afs.doc<any>(`boq/boq/boqitems/${item.rowData.id}`).delete();
            }
          }
        ]
      });
    
      await alert.present();
   
  }

}
