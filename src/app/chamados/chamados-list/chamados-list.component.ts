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
export class ChamadosListComponent implements OnInit{

  chamados: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;

  constructor(private db: AngularFireDatabase, private user: UsersComponent, private grafico: GraficoComponent) {

    this.size$ = new BehaviorSubject(null);

    this.chamados = this.size$.switchMap(size =>
      db.list('/Requests', ref =>
        size ? ref.orderByChild('nome').equalTo(size) : ref
      ).valueChanges()
    );
        
  }
  filterBy(size: string | null) {
    this.size$.next(size);
  }

  chamadoSelecionado(chamado) {
    this.user.carregarSolicitacao(chamado);
    
  }

  ngOnInit() {
    
    firebase.database().ref('Requests').on('value', snapshot => {
    let audioPlayer: HTMLVideoElement = <HTMLVideoElement> document.getElementById("audio");  
   // audioPlayer.play();        
    this.grafico.carregaGrafico(this.chamados);
  })
  }
}




