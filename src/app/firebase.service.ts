import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'boq/boq/projects';
  contractorCollection = 'boq/boq/contractors';
  contractorProject = 'boq/boq/projects';
  contractor = 'contractors';
  contractorCat = 'cat';
  typeCollection = 'boq/boq/types';


  constructor(
    private firestore: AngularFirestore
  ) { }
   
  //Projects
  create_project(record) {
    return this.firestore.collection<any>(this.collectionName).add(record);
  }

  read_projects() {
    return this.firestore.collection<any>(this.collectionName , ref => ref.orderBy("id" , "asc")).snapshotChanges();
  }

  update_project(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_project(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }


  //Contractor
  create_contractor(record) {
    return this.firestore.collection<any>(this.contractorCollection).add(record);
  }

  read_contractors() {
    return this.firestore.collection<any>(this.contractorCollection).snapshotChanges();
  }

  update_contractor(recordID, record) {
    this.firestore.doc(this.contractorCollection + '/' + recordID).update(record);
  }

  delete_contractor(record_id) {
    this.firestore.doc(this.contractorCollection + '/' + record_id).delete();
  }

  //ContractorCat
  create_contractorCat(record, CID) {
    return this.firestore.collection<any>(this.contractorCollection +'/'+ CID +'/'+ this.contractorCat).add(record);
  }

  read_contractorsCat(CID) {
    return this.firestore.collection<any>(this.contractorCollection +'/'+ CID +'/'+ this.contractorCat).snapshotChanges();
  }

  update_contractorCat(CID, recordID, record) {
    this.firestore.doc(this.contractorCollection +'/'+ CID +'/'+ this.contractorCat+'/'+ recordID).update(record);
  }

  delete_contractorCat(CID , record_id) {
    this.firestore.doc(this.contractorCollection +'/'+ CID +'/'+ this.contractorCat+'/'+ record_id).delete();
  }


  //Types
  create_type(record) {
    return this.firestore.collection<any>(this.typeCollection).add(record);
  }

  read_types() {
    return this.firestore.collection<any>(this.typeCollection).snapshotChanges();
  }

  update_type(recordID, record) {
    this.firestore.doc(this.typeCollection + '/' + recordID).update(record);
  }

  delete_type(record_id) {
    this.firestore.doc(this.typeCollection + '/' + record_id).delete();
  }




}
