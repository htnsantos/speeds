import { MapComponent } from './../map/map.component';
import { ConsultaChamadosComponent } from './../consulta-chamados/consulta-chamados.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase, AngularFireAction } from "angularfire2/database";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-consulta-chamados-detalhes',
  templateUrl: './consulta-chamados-detalhes.component.html',
  styleUrls: ['./consulta-chamados-detalhes.component.css']
})
export class ConsultaChamadosDetalhesComponent implements OnInit {

  chamado: any;
  id: number;
  private sub: any;
  historicos = [];
  chamados: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  
  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, 
    private map: MapComponent, private router: Router) { 

    this.size$ = new BehaviorSubject(null);

    this.chamados = this.size$.switchMap(size =>
      db.list('/History', ref =>
        ref.orderByChild('status')
      ).valueChanges()
    );

    this.chamados.subscribe(historico => {
      historico.forEach(hist => {
        for (var key in hist) {
          if (hist.hasOwnProperty(key) && hist[key].data_solicitacao) {
            this.historicos.push(hist[key]);
          }
        }

      })

      let calls = this.historicos.filter(call => {
      return call.id == this.id;
      })
      this.chamado = calls[0];
      this.map.loadMapByLatLong(this.chamado);
    }
    )
  }

  voltar() {
    this.router.navigate(['/consulta']);
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      //this.carregaDetalhesChamado(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
