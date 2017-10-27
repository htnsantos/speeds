import { UsersComponent } from './../../users/users.component';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chamados-historico',
  templateUrl: './chamados-historico.component.html',
  styleUrls: ['./chamados-historico.component.css']
})
export class ChamadosHistoricoComponent implements OnInit {

  chamados: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  empty : boolean = false;

  constructor(private db: AngularFireDatabase, private user: UsersComponent) { 

    this.size$ = new BehaviorSubject(null);

    this.chamados = this.size$.switchMap(size =>
      db.list('/Requests', ref =>
       ref.orderByChild('status')//.equalTo("Atendimento à caminho")
      ).valueChanges()
    ); 
     
    this.empty = true;

    this.chamados.subscribe(chamado =>{
      this.empty = chamado.length == 0;
    }
    )
  }

  chamadoSelecionado(chamado) {
    let self = this;
    var ref = firebase.database().ref("Requests");
    ref.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          if(childData.id == chamado.id){
            chamado.key = key;
            self.user.carregarSolicitacao(chamado, "historicoChamado");
          }
        });
      });      

  }

  ngOnInit() {
  }

}
