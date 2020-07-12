import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ""
  password: string = ""
  passType = "password"
  passeye = "eye"

  constructor(public afAuth: AngularFireAuth,
    public user: UserService, 
    private router : Router,
    private menu: MenuController) {
      this.menu.enable(false);
     }

  ngOnInit() {
  }
  async login() {
    
		const { username, password } = this
		try {
     
      const res = await this.afAuth.signInWithEmailAndPassword(username+"@boqmaker.com" , password)
			if(res.user) { 
        this.router.navigateByUrl('/home');
				this.user.setUser({
					username,
					uid: res.user.uid
        })
			}
		// if any error show messages
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				alert("User not found")
      }
      if(err.code === "auth/wrong-password"){
        alert("Incorrect password")
      }
      if(err.code == "auth/invalid-email"){
        alert("Invalid Email")
      }
		}
  }


  changetype(){
if(this.passType == "password"){
  this.passType ="text";
  this.passeye = "eye-off"
}else{
  this.passType ="password";
  this.passeye = "eye"
}
  }
}
