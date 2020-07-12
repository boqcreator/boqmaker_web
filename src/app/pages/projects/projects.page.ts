import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
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

  sendmail(item){
    this.http.get(`https://us-central1-rbwloyalty.cloudfunctions.net/boqmail?start=${item.start}&no=${item.no}&id=${item.id}&name=${item.name}&email=${item.contEmail}`
    ).subscribe(data =>{
      alert(data)
    })

  }
}
