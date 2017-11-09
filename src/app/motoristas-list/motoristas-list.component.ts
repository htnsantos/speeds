import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
import { MotoristasComponent } from "../motoristas/motoristas.component";

@Component({
  selector: 'app-motoristas-list',
  templateUrl: './motoristas-list.component.html',
  styleUrls: ['./motoristas-list.component.css']
})
export class MotoristasListComponent implements OnInit {

  motoristas: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;

  constructor(private db: AngularFireDatabase, private driver: MotoristasComponent) {
    
    this.size$ = new BehaviorSubject(null);

    this.motoristas = this.size$.switchMap(size =>
      db.list('/Drivers', ref =>
        size ? ref.orderByChild('name').equalTo(size) : ref
      ).valueChanges()
    );
  }

  motoristaSelecionado(motorista) {
    
    let self = this;
    var ref = firebase.database().ref("Drivers");
    ref.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
            if(childData.name == motorista.name && childData.phone == motorista.phone){
            motorista.key = key;
            self.driver.carregarMotorista(motorista, "update");
            }
        });
      });
  }

  ngOnInit() {
  }

}
