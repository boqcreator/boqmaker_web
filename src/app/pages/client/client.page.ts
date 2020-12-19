import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
listOfClients;
name = "";
address = "";
phone = "";
email = "";
  constructor(private afs : AngularFirestore, 
    private loadingController: LoadingController,
    private menu : MenuController
    ) { menu.enable(false) }

  ngOnInit() {
   this.listOfClients = this.afs.collection(`boq/boq/client`).snapshotChanges()
  }
  async addClient(){
      const loading = await this.loadingController.create({
        message: 'Adding...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();

      this.afs.collection(`boq/boq/client`).add({
        name : this.name,
        phone : this.phone,
        email : this.email,
        address : this.address,
      }).then(()=>{
        loading.dismiss();
        alert("Added successfully!")
      })

    
  }

  async updateName(event , item){
    if(event.target.value !== item.data().name){
      const loading = await this.loadingController.create({
        message: 'Updating name...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();
  
      this.afs.doc(`boq/boq/client/${item.id}`).update({
        name : event.target.value
      }).then(()=>{
        loading.dismiss();
      })
    }
  }

  async updateAddress(event , item){
    if(event.target.value !== item.data().address){
      const loading = await this.loadingController.create({
        message: 'Updating address...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();
  
      this.afs.doc(`boq/boq/client/${item.id}`).update({
        address : event.target.value
      }).then(()=>{
        loading.dismiss();
      })
    }


  }
  async updateEmail(event , item){
    if(event.target.value !== item.data().email){
      const loading = await this.loadingController.create({
        message: 'Updating email...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();
  
      this.afs.doc(`boq/boq/client/${item.id}`).update({
        email : event.target.value
      }).then(()=>{
        loading.dismiss();
      })
    }
  

  }
  async updatePhone(event , item){
    if(event.target.value !== item.data().phone){
      const loading = await this.loadingController.create({
        message: 'Updating phone...',
        duration: 20000,
        spinner: 'bubbles'
      });
      await loading.present();
  
      this.afs.doc(`boq/boq/client/${item.id}`).update({
        phone : event.target.value
      }).then(()=>{
        loading.dismiss();
      })
    }
 

  }

  async delete(client){
    const loading = await this.loadingController.create({
      message: 'Deleting...',
      duration: 20000,
      spinner: 'bubbles'
    });
    await loading.present();

    this.afs.doc(`boq/boq/client/${client.id}`).delete().then(()=>{
      loading.dismiss();
      alert("Deleetd successfully!");
    })
  }

}
