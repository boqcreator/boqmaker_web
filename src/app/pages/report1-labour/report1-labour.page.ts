import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-report1-labour',
  templateUrl: './report1-labour.page.html',
  styleUrls: ['./report1-labour.page.scss'],
})
export class Report1LabourPage implements OnInit {
  itemList;
  sortSupplier= [];
  constructor(private modalController: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {
    if(this.itemList){
      this.itemList.forEach(element => {
        console.log(element)
        element.labour.forEach(elementMat => {
          var index = this.sortSupplier.findIndex(x => x.sid == elementMat.supplier.id)
          if(index === -1){
            this.sortSupplier.push({
              sid : elementMat.supplier.id,
              sname : elementMat.supplier.name,
              semail : elementMat.supplier.email,
              sno : elementMat.supplier.no,
              additionalsupplier : elementMat.additionalsupplier,
              labours : [{
                name : elementMat.name,
                qty :elementMat.qty*element.qty,
                price : elementMat.rate,
                unit : elementMat.unit,
                id :elementMat.id
              }]
             })
          }else{
            var matindex =  this.sortSupplier[index].labours.findIndex(x => x.id == elementMat.id)
            if(matindex === -1){
              this.sortSupplier[index].labours.push({
                name : elementMat.name,
                qty :elementMat.qty*element.qty,
                price : elementMat.rate,
                unit : elementMat.unit,
                id :elementMat.id
              })
            }
            else{
              this.sortSupplier[index].labours[matindex].qty += (elementMat.qty*element.qty)
            }
          }
        });
      });
    }
  }

  async sendmail(item){
    let mat = "";
    item.labours.forEach(element => {
      mat+= element.name+"%2C%20required%20quantity%20is%20"+element.qty+"%20"+element.unit+"%0D%0A"
    });

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Do you want to send quotation request?',
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
          window.location.href = `mailto:${item.semail}?body=Dear%20${item.sname}%2C%0D%0A%0D%0AI%20would%20like%20to%20request%20a%20quotation%20for%20following:%0D%0A${mat}%0A%0D%0AThanks%20in%20advance%2C%0D%0A%0D%0ABOQ%20Maker`;
        }
      }
    ]
  });

  await alert.present();



  }

  close(){
    this.modalController.dismiss();
  }
}

