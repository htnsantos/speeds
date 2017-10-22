import { GraficoComponent } from './../../grafico/grafico.component';
import { UsersComponent } from './../../users/users.component';
import { Observable } from 'rxjs/Observable';
import { Chamado } from './../../model/chamado';
import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chamados-list',
  templateUrl: './chamados-list.component.html',
  styleUrls: ['./chamados-list.component.css']
})
export class ChamadosListComponent implements OnInit {

  chamados: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  empty : boolean;

  constructor(private db: AngularFireDatabase, private user: UsersComponent, private grafico: GraficoComponent) {

    this.size$ = new BehaviorSubject(null);

    /*this.chamados =
      db.list('/Requests/'
      ).valueChanges() */

    this.chamados = this.size$.switchMap(size =>
      db.list('/Requests', ref =>
       ref.orderByChild('status').equalTo("Aguardando Atendimento")
      ).valueChanges()
    );  

    this.empty = true;
    
    this.chamados.subscribe(chamado =>{
      this.empty = chamado.length == 0;
      console.log(this.empty);
    });
      
  }
  filterBy(size: string | null) {
    this.size$.next(size);
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
            self.user.carregarSolicitacao(chamado, "chamadoAberto");
          }
        });
      });      

  }

  ngOnInit() {

    firebase.database().ref('Requests').on('value', snapshot => {
      let audioPlayer: HTMLVideoElement = <HTMLVideoElement>document.getElementById("audio");
      //audioPlayer.play();        
      this.grafico.carregaGrafico(this.chamados);
    })
  }
}




