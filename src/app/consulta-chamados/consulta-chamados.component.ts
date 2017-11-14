
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-consulta-chamados',
  templateUrl: './consulta-chamados.component.html',
  styleUrls: ['./consulta-chamados.component.css']
})
export class ConsultaChamadosComponent implements OnInit {

  chamados: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  empty: boolean = false;
  historicos = [];
  selectedRow: any;
  id: any;
  data: any;

  constructor(private db: AngularFireDatabase, private ref: ChangeDetectorRef) {

    this.size$ = new BehaviorSubject(null);

    this.chamados = this.size$.switchMap(size =>
      db.list('/History', ref =>
        ref.orderByChild('status')
      ).valueChanges()
    );

    this.empty = true;

    this.chamados.subscribe(historico => {
      historico.forEach(hist => {
        for (var key in hist) {
          if (hist.hasOwnProperty(key) && hist[key].data_solicitacao) {
            this.historicos.push(hist[key]);
          }
        }

      })
     
      this.empty = this.historicos.length == 0;
      this.ref.markForCheck();
    }
    )

  }

  isDateMoreThan(dataSolicitacao) {

    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    var data = dataSolicitacao.substr(0, dataSolicitacao.length - 3)
    var arr = data.split("/");
    var dt = [arr[1], arr[0], arr[2]].join("/");

    return new Date(dt).getTime() > yesterday.getTime();
  }

  setClickedRow(index, chamado) {
    this.selectedRow = index;
    console.log(chamado);
  }

  ngOnInit() {
  }

}
