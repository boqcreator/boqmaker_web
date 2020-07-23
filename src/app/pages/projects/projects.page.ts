import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddprojectPage } from '../addproject/addproject.page';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  title = 'BoqMaker Projects';
  projectsList;
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
    fs.read_projects().subscribe(value =>{
      this.projectsList = value
    })

    
   }


  ngOnInit() {
  }
  gotoproj(item){
    this.router.navigate(['proj-details/',item.payload.doc.id])
  }

  async addProj(){
   this.router.navigate(['addproject'])
  }

  async Delproj(item){
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure, You want to delete this project?</strong>!!!',
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
          this.presentLoading("Deleting...");
          this.afs.doc(`boq/boq/projects/${item.payload.doc.id}`).delete().then(()=>{
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
    if(item.payload.doc.data().contEmail){
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: `<strong>Are you sure, You want to an email to ${item.payload.doc.data().contEmail}?</strong>!!!`,
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
              this.http.get(`https://us-central1-rbwloyalty.cloudfunctions.net/boqmail?start=${item.payload.doc.data().start}&no=${item.payload.doc.data().no}&id=${item.payload.doc.id}&name=${item.payload.doc.data().name}&email=${item.payload.doc.data().contEmail}`
              )
              loading.onDidDismiss().then(()=>{
                this.presentAlert("Done","Email sent successfully!")
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
