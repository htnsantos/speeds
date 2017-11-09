import { UsersComponent } from './../../users/users.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chamados-recusados',
  templateUrl: './chamados-recusados.component.html',
  styleUrls: ['./chamados-recusados.component.css']
})
export class ChamadosRecusadosComponent implements OnInit {

  chamados: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  empty : boolean = false;
  historicos = [];

  constructor(private db: AngularFireDatabase, private user: UsersComponent, private ref: ChangeDetectorRef) { 

    var data = new Date();
    data.setDate(data.getDate() - 1);

    this.size$ = new BehaviorSubject(null);

    this.chamados = this.size$.switchMap(size =>
      db.list('/History', ref =>
       ref.orderByChild('status')
      ).valueChanges()
    ); 
     
    this.empty = true;
   console.log(this.chamados);
    this.chamados.subscribe(historico => {
      historico.forEach(hist => {
        for (var key in hist) {
          if (hist.hasOwnProperty(key) && hist[key].data_solicitacao && hist[key].data_solicitacao.startsWith(data.toLocaleDateString())) {
            this.historicos.push(hist[key]);
          }
        }
        this.historicos = this.historicos.filter(hist => {
          return hist.status == "Atendimento cancelado";
        })
      })
      this.empty = historico.length == 0;
      this.ref.markForCheck();
    }
    )

  }

  chamadoSelecionado(chamado) {
    this.user.carregarSolicitacao(chamado, "historicoChamado");
    /*let self = this;
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
      }); */     

  }

  ngOnInit() {
  }

}
