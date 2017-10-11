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
export class ChamadosListComponent {

  chamados: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;

  constructor(private db: AngularFireDatabase, private user: UsersComponent) {

    this.size$ = new BehaviorSubject(null);

    this.chamados = this.size$.switchMap(size =>
      db.list('/Requests', ref =>
        size ? ref.orderByChild('nome').equalTo(size) : ref
      ).valueChanges()
    );
    console.log(this.chamados);
  }
  filterBy(size: string | null) {
    this.size$.next(size);
  }

  chamadoSelecionado(chamado) {
    this.user.carregarSolicitacao(chamado);
  }
}




