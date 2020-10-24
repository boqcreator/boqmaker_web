import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-costgraph',
  templateUrl: './costgraph.page.html',
  styleUrls: ['./costgraph.page.scss'],
})
export class CostgraphPage implements OnInit {
  eqty;
  aqty;
  erate;
  arate;
  etotal;
  atotal;
  emtotal ;
  amtotal ;
  eltotal ;
  altotal ;
  eetotal ;
  aetotal ;
  eototal ;
  aototal ;
  estotal ;
  astotal ;
  constructor(private loadingController: LoadingController,
    private modalController: ModalController) {
this.presentLoading()
    setTimeout(() => {
      this.drawChart()
    }, 1000);
   }
  drawChart(){
    var data = google.visualization.arrayToDataTable([
      ['Cost details', 'Estimated','Actual' ],
      ['Quantity', this.eqty, this.aqty],
      ['Rate', this.erate, this.arate],
      ['Total', this.etotal, this.atotal],
      ['Material', this.emtotal, this.amtotal],
      ['Labour', this.eltotal, this.altotal],
      ['Equipment', this.eetotal, this.aetotal],
      ['Other', this.eototal, this.aototal],
      ['Subcontractor', this.estotal, this.astotal],
    ]);



    var options = {
      chart: {
        title: 'Cost details bar chart',
      }
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Creating Chart...',
      duration: 1500,
      spinner: 'bubbles'
    });
    await loading.present();
  }


  close(){
    this.modalController.dismiss()
      }

}
