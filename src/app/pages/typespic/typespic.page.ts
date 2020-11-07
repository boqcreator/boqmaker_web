import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-typespic',
  templateUrl: './typespic.page.html',
  styleUrls: ['./typespic.page.scss'],
})
export class TypespicPage implements OnInit {
  segment = "t1";
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  close(){
this.modalController.dismiss();
  }

}
