import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report1-details',
  templateUrl: './report1-details.page.html',
  styleUrls: ['./report1-details.page.scss'],
})
export class Report1DetailsPage implements OnInit {
  item;
  segment = "material"
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }

}
