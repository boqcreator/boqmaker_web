import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { AddprojtypePage } from '../addprojtype/addprojtype.page';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-projecttypes',
  templateUrl: './projecttypes.page.html',
  styleUrls: ['./projecttypes.page.scss'],
})
export class ProjecttypesPage implements OnInit {
   typeList;
  constructor(private modalController: ModalController,
    private menu : MenuController, private afs : AngularFirestore) {
      this.menu.enable(false)
     this.typeList = this.afs.collection(`boq/boq/projecttypes`).valueChanges()
     }

  ngOnInit() {
  }

  async addnew(){
      const modal = await this.modalController.create({
      component: AddprojtypePage
      });
    
      await modal.present();

  }

}
