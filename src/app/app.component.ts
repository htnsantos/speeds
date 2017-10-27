import { auth } from 'firebase/app';
import { AuthGuard } from './auth.service';
import { LoginComponent } from './login/login.component';
import { moveIn, fallIn, moveInLeft } from './router.animations';
import { Component, OnInit, HostBinding, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[@moveIn]': '' }

})
export class AppComponent {
  title = 'app';

  mostrarMenu: boolean = false;
  name: any;
  state: string = '';

  constructor(private authGuard: AuthGuard, private login: LoginComponent) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.name = user;
      }
    });
  }

  logout() {

    this.login.logout();
  }

  ngOnInit() {

    this.authGuard.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  
  }
}
