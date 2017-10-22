import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chamados-andamento',
  templateUrl: './chamados-andamento.component.html',
  styleUrls: ['./chamados-andamento.component.css']
})
export class ChamadosAndamentoComponent implements OnInit {

  chamados: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  empty : boolean = false;

  constructor(private db: AngularFireDatabase) { 

    this.size$ = new BehaviorSubject(null);

    this.chamados = this.size$.switchMap(size =>
      db.list('/Requests', ref =>
       ref.orderByChild('status').equalTo("Atendimento a Caminho")
      ).valueChanges()
    ); 
     
    this.empty = true;

    this.chamados.subscribe(chamado =>{
      this.empty = chamado.length == 0;
      console.log(this.empty);
    }
    )
  }

  ngOnInit() {
  }

}
