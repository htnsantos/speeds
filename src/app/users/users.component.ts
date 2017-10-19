import { DialogService } from 'ng2-bootstrap-modal';
import { ModalComponent } from './../modal/modal.component';
import { GraficoComponent } from './../grafico/grafico.component';
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
  showGraph: boolean = true;

  constructor(public afAuth: AngularFireAuth, private router: Router, private authGuard: AuthGuard,
    private angularFire: AngularFireDatabase, private map: MapComponent, private dialogService: DialogService) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.name = user;
      }
    });

  }

  carregarSolicitacao(chamado) {
    this.chamado = chamado;
    this.map.loadMapByLatLong(chamado);
    this.showGraph = this.getSizeArray(this.chamado) === 0;
  }

  getSizeArray(array) {
    var size = function (array) {
      var size = 0, key;
      for (key in array) {
        if (array.hasOwnProperty(key)) size++;
      }
      return size;
    }
    return size(array);
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

  showConfirm() {
    let disposable = this.dialogService.addDialog(ModalComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    })
      .subscribe((isConfirmed) => {
        
        /*if (isConfirmed) {
          alert('accepted');
        }
        else {
          alert('declined');
        }*/
      });
    
  }

  ngOnInit() {
    this.chamados = new Array<any>();
    this.showGraph = this.getSizeArray(this.chamado) === 0;
  }

}
