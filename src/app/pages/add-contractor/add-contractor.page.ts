import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-add-contractor',
  templateUrl: './add-contractor.page.html',
  styleUrls: ['./add-contractor.page.scss'],
})
export class AddContractorPage implements OnInit {
name1;
email1;
name2;
email2;
  constructor(private afs: AngularFirestore,
    private user : UserService,
    private fs : FirebaseService,
    public loadingController: LoadingController,
    private modal : ModalController,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  async addcontract(){
    if(this.name1 ){
      const loading = await this.loadingController.create({
        message: 'Adding...',
        duration: 20000
      });
      await loading.present();

      this.fs.create_contractor({
         name : this.name1,
      }).then(async(value)=>{
        loading.dismiss();
        this.modal.dismiss();
        const alert = await this.alertController.create({
          header: 'Success!',
          message: 'Contractor added Successfully!',
          buttons: ['OK']
        });
    
        await alert.present();
      })
    }
    else{
      alert("Please fill the the field.")
    }
    
    
  }

}
