import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddprojectPage } from '../addproject/addproject.page';
import { FirebaseService } from 'src/app/firebase.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  title = 'BoqMaker Projects';
  projectsList = [];
  term;
  constructor(private menu :MenuController,
    private router : Router,
    private http : HttpClient,
    private afs :AngularFirestore,
    private fs : FirebaseService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public modalController: ModalController) {
    this.menu.enable(false);
    this.afs.collection<any>(`boq/boq/projects`).snapshotChanges().subscribe(value =>{
      this.projectsList = []
      value.forEach(doc =>{
        this.projectsList.push({
          con : doc.payload.doc.data().con,
          contEmail : doc.payload.doc.data().contEmail,
          name : doc.payload.doc.data().name,
          id : doc.payload.doc.data().id,
          no : doc.payload.doc.data().no,
          start : doc.payload.doc.data().start,
          end : doc.payload.doc.data().end,
          pid : doc.payload.doc.ref.id,
          type : doc.payload.doc.data().type,
          code : doc.payload.doc.data().code
        })
      })
    })

    
   }


  ngOnInit() {
  }
  gotoproj(item){
    this.router.navigate(['proj-details/',item.pid])
  }

  async addProj(){
   this.router.navigate(['addproject'])
  }

  async Delproj(item){
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure, You want to delete this project?</strong>',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          this.presentLoading("Deleting...")
          this.afs.doc(`boq/boq/projects/${item.pid}`).delete().then(()=>{
      this.loadingController.dismiss();
      this.presentAlert("Success","Project successfully deleted!")
          })
        }
      }
    ]
  });

  await alert.present();

  }

  async sendmail(item){
    if(item.contEmail){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: `Are you sure, You want to send an email to <strong>${item.contEmail}</strong>?`,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            handler: async () => {
              const loading = await this.loadingController.create({
                message: "Sending...",
                duration: 2000,
                spinner: 'bubbles'
              });
              await loading.present();
              emailjs.send('boqmaker', 'template_KtrgNZZJ', {
                start:item.start,
                name : item.name,
                id:item.id,
                no:item.no,
                mailto:item.contEmail,
                con:item.con,
                alternative:true
              }, 'user_HHO1Bbl8ubkXCbyL8VvbH').then(()=>{
                loading.onDidDismiss().then(()=>{
                  this.presentAlert("Done","Email sent successfully!")
                })
              })
            }
          }
        ]
      });
    
      await alert.present();
    }else{
      this.presentAlert("Cannot","Please fill contractor details first in project.")
    }

  }

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async presentAlert(head, msg) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
