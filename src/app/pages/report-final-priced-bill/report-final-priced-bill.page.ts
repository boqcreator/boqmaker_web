import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-report-final-priced-bill',
  templateUrl: './report-final-priced-bill.page.html',
  styleUrls: ['./report-final-priced-bill.page.scss'],
})
export class ReportFinalPricedBillPage implements OnInit {
  

  myProjectList = [];
  myProjectID;
  type;

  constructor(private menu : MenuController,
    private router : Router,
    private afs : AngularFirestore,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private storage : Storage) {
    this.menu.enable(false)
    this.getProjects();
   }

   ngOnInit() {
  }

   getProjects(){
      this.afs.collection(`boq/boq/projects`).get().subscribe(value =>{  
        value.docs.forEach(element => {
          this.myProjectList.push({
            pid : element.ref.id,
            id : element.data().id,
            name : element.data().name,
            no : element.data().no,
            con : element.data().con,
            access : element.data().access,
            start : element.data().start,
            end : element.data().end,
            des : element.data().des,
            location: element.data().locaiton,
            contname : element.data().name,
            contEmail : element.data().email,
            contaddress : element.data().address,
            conttel : element.data().tel,
            contmob : element.data().mob,
            clientname : element.data().client,
            clientaddress : element.data().caddress,
            clientemail : element.data().cemail,
            clientohoneno : element.data().cphoneno
          })
        });
        this.storage.get("project").then(proj=>{
          if(proj != null){
           this.myProjectID = proj
          }
        })
      })
   }

   setProject(){
    this.storage.set("project" , this.myProjectID)
   }

   gotoreport1(){
    if(this.myProjectID){
    this.router.navigate(['report1/'+ this.myProjectID.split('/')[0]]);
    this.modalController.dismiss();
  }
  else{
    alert("Please select project")
  }
  }
  gotovariation(){
    if(this.myProjectID){
    this.router.navigate(['report-variation/'+ this.myProjectID.split('/')[0]]);
    this.modalController.dismiss();
  }
  else{
    alert("Please select project")
  }
  }

  gotoreport(){
    if(this.type == "boq"){
      this.gotoreport1()
    }
    else if(this.type == "vr"){
      this.gotovariation()
    }
  }

async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Loading data...',
    duration: 10000,
    spinner: 'bubbles'
  });
  await loading.present();
}

}
