import { MapComponent } from './../map/map.component';
import { ChamadosListComponent } from './../chamados/chamados-list/chamados-list.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chamado } from './../model/chamado';
import { AuthGuard } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' }

})
export class UsersComponent implements OnInit {

  name: any;
  state: string = '';
  chamados: Array<any>;
  chamado: Chamado = new Chamado();

  constructor(public afAuth: AngularFireAuth, private router: Router, private authGuard: AuthGuard,
    private angularFire: AngularFireDatabase, private map: MapComponent) {
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.name = user;
      }
    });   

  }

  carregarSolicitacao(chamado) {
    this.chamado = chamado;
    var locs = chamado.position_destino.split(',')
    this.map.loadMapByLatLong(locs[0], locs[1]);
  }

  onSubmit(formData) {

    var self = this;
    this.angularFire.list("chamados").push({
      nome: formData.value.cadastro,
      data: new Date()
    }).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);
    formData.form.controls.cadastro.setValue('');
  }

ngOnInit() {
  this.chamados = new Array<any>();
}

}
