import { auth } from 'firebase/app';
import { AuthGuard } from './auth.service';
import { LoginComponent } from './login/login.component';
import { moveIn, fallIn, moveInLeft } from './router.animations';
import { Component, OnInit, HostBinding, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireAction } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

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
  status: any;
  allStatus: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private db: AngularFireDatabase,private authGuard: AuthGuard,
     private login: LoginComponent, private chRef : ChangeDetectorRef) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.name = user;
      }
    });

    let self = this;
    this.allStatus =
      db.list('SystemParameter/'
      ).valueChanges()
    
    this.allStatus.subscribe(status => {
      self.status = status[1];
      console.log(self.status);
      this.chRef.markForCheck();
    })  
    
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
