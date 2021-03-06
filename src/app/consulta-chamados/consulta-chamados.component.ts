import { ConsultaChamadosDetalhesComponent } from './../consulta-chamados-detalhes/consulta-chamados-detalhes.component';
import { EventEmitter } from '@angular/core';
import { FilterPipe } from './../componentes/filterPipe';

import { Component, OnInit, ChangeDetectorRef, SimpleChanges, IterableDiffers } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";

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
  totalOrcamento: any = 0;
  differ : any;
  toggle = [];
  
  constructor(private db: AngularFireDatabase, private ref: ChangeDetectorRef, 
    differs: IterableDiffers, private filter: FilterPipe, private router: Router, 
    private consultaDetalhes: ConsultaChamadosDetalhesComponent) {

    this.differ = differs.find([]).create(null);
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

  calcularTotalOrcamento(){
    let total = parseFloat("0");
    let items = this.filter.transform(this.historicos,this.id, this.data);
    
    for(let i in items) {
      total = total + items[i].orcamento;
    }
    this.totalOrcamento = total;
  }

  setClickedRow(index, chamado) {
    this.selectedRow = index;
    //this.consultaDetalhes.carregaDetalhesChamado(chamado);
    this.router.navigate(['/consulta-detalhes', chamado.id]);
  }

  ngOnInit() {
  }
  
  ngDoCheck() {
    this.calcularTotalOrcamento();
  }

}
