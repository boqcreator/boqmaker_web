import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-boqitemgraph',
  templateUrl: './boqitemgraph.page.html',
  styleUrls: ['./boqitemgraph.page.scss'],
})
export class BoqitemgraphPage implements OnInit {
EtotalPrice
LtotalPrice
MtotalPrice 
OtotalPrice 
StotalPrice 
constructor(private loadingController: LoadingController,
  private modalController: ModalController) {
this.presentLoading()
  setTimeout(() => {
    this.drawChart()
  }, 1000);
 }
drawChart(){
  var data = google.visualization.arrayToDataTable([
    ["BOQ Items", "Report", { role: "style" } ],
    ["Materials", this.MtotalPrice, "red"],
    ["Labours", this.LtotalPrice, "silver"],
    ["Equipments", this.EtotalPrice, "gold"],
    ["Other", this.OtotalPrice, "color: #b87333"],
    ["Subcontractor", this.StotalPrice, "orange"]
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
                   { calc: "stringify",
                     sourceColumn: 1,
                     type: "string",
                     role: "annotation" },
                   2]);

  var options = {
    title: "BOQ items details report",
    bar: {groupWidth: "95%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
  chart.draw(view, options);
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
