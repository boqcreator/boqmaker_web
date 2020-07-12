import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

interface user {
	username: string,
	uid: string
}
interface country {
	name: string,
	iso: string
}

@Injectable()
export class UserService {
	private user: user
	private country: country

	constructor(private afAuth: AngularFireAuth,private afs:AngularFirestore,
		private platform: Platform,
		private mav:NavController,
		private router : Router,
		private toastCtrl: ToastController) {

	}

	setUser(user: user) {
		this.user = user
	}

	setCountry(country: country) {
		this.country = country
	}

	getUsername(): string {
		return this.user.username
	}

	async reAuth(username: string, password: string) {
		return (await this.afAuth.currentUser).reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@codedamn.com', password))
	}

	async updatePassword(newpassword: string) {
		return (await this.afAuth.currentUser).updatePassword(newpassword)
	}

	async updateEmail(newemail: string) {
		return (await this.afAuth.currentUser).updateEmail(newemail)
	}

	async isAuthenticated() {
		if(this.user){
			
			return true
		} 

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid
			})
			return true
		}
		return false
	}

	getUID(): string {
		return this.user.uid
	}
  
	   private saveTokenToFirestore(token , uid) {
		if (!token) return;
	
	  
	  } 

	
}