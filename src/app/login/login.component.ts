import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthGuard } from './../auth.service';

import { Router } from '@angular/router';
import { moveIn } from '../router.animations';
import { auth } from "firebase/app";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: { '[@moveIn]': '' }

})
export class LoginComponent implements OnInit {

  error: any;
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, private router: Router, private authGuard : AuthGuard) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.router.navigateByUrl('/users'); 
      }
    });
  }

  onSubmit(formData) {
    if(formData.valid) {
      
      firebase.auth().signInWithEmailAndPassword(
        formData.value.email, 
        formData.value.password
      ).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/users']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authGuard.mostrarMenuEmitter.emit(false);
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.authGuard.mostrarMenuEmitter.emit(false);
  }

}
