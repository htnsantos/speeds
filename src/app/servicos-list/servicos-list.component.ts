import { ServicosComponent } from './../servicos/servicos.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-servicos-list',
  templateUrl: './servicos-list.component.html',
  styleUrls: ['./servicos-list.component.css']
})
export class ServicosListComponent implements OnInit {

  parameters :any;
  size$: BehaviorSubject<string | null>;
  empty: boolean = false;
  servicos = [];

  constructor(private db: AngularFireDatabase, private ref: ChangeDetectorRef, 
    private services: ServicosComponent) { 

    this.size$ = new BehaviorSubject(null);
  
    var sel = this;
    var refD = firebase.database().ref("SystemParameter");
    refD.on("value", function(snapshot){
      console.log(snapshot);
      sel.parameters = snapshot.val();
    })     

    this.empty = true;
    
      let index = 0;
      
        for (var key in sel.parameters.services) {
          if (sel.parameters.services.hasOwnProperty(key) && index == 0) {
            this.servicos.push(key);
          }
        }
        index ++;
    
      this.empty = sel.parameters.length == 0;
      this.ref.markForCheck();
    
  }

  servicoSelecionado(servico) {
    
    let self = this;
    var ref = firebase.database().ref("SystemParameter/services/"+servico);
    ref.on("value", function(snapshot){
      self.services.carregaServicos(snapshot.val(), servico);
    })      
  }

  ngOnInit() {
  }

}
