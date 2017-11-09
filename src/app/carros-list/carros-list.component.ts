import { CarrosComponent } from './../carros/carros.component';
import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-carros-list',
  templateUrl: './carros-list.component.html',
  styleUrls: ['./carros-list.component.css']
})
export class CarrosListComponent implements OnInit {

   carros: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
   size$: BehaviorSubject<string | null>;

  constructor(private db: AngularFireDatabase, private car: CarrosComponent) {
    
    this.size$ = new BehaviorSubject(null);

    this.carros = this.size$.switchMap(size =>
      db.list('/SpeedVehicles', ref =>
        size ? ref.orderByChild('name').equalTo(size) : ref
      ).valueChanges()
    );
  }

  carroSelecionado(carro) {
    
    let self = this;
    var ref = firebase.database().ref("SpeedVehicles");
    ref.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
            if(childData.veiculo_placa == carro.veiculo_placa && childData.veiculo_speed == carro.veiculo_speed){
            carro.key = key;
            self.car.carregarCarro(carro, "update");
            }
        });
      });
  }

  ngOnInit() {
  }

}
