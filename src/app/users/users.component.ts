import { ModalInfoComponent } from './../modal-info/modal-info.component';
import { ModalConcluirComponent } from './../modal-concluir/modal-concluir.component';
import { ModalCancelarComponent } from './../modal-cancelar/modal-cancelar.component';

import { UsersService } from './users.service';

import { DialogService } from 'ng2-bootstrap-modal';
import { ModalComponent } from './../modal/modal.component';
import { GraficoComponent } from './../grafico/grafico.component';
import { MapComponent } from './../map/map.component';
import { ChamadosListComponent } from './../chamados/chamados-list/chamados-list.component';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Chamado } from './../model/chamado';
import { Veiculo } from './../model/veiculo';
import { AuthGuard } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


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
  veiculo: Veiculo = new Veiculo();
  showGraph: boolean = true;
  veiculos: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  statusChamado: string;
  
  constructor(public afAuth: AngularFireAuth, private router: Router, private authGuard: AuthGuard,
    private angularFire: AngularFireDatabase, private map: MapComponent,
    private dialogService: DialogService,
    private modal: ModalComponent, private userService: UsersService) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.name = user;
      }
    });

  }

  carregarSolicitacao(chamado, statusChamado) {

    this.statusChamado = statusChamado;
    this.veiculos =
      this.angularFire.list('/Veiculos/' + chamado.key
      ).valueChanges()

    let veiculo = [];  
    this.veiculos.forEach(veic => {
      veiculo = veic;
      this.veiculo = veiculo[0];
      this.chamado = chamado;
      this.map.loadMapByLatLong(chamado);
      this.showGraph = this.getSizeArray(this.chamado) === 0;
    })
    
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

  listarMotoristas() {

    let disposable = this.dialogService.addDialog(ModalComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    })
      .subscribe((isConfirmed) => {

        /*if (isConfirmed) {
          console.log("");
        }
        else {
          alert('declined');
        }*/
      });
  }

  cancelarChamado() {

    let disposable = this.dialogService.addDialog(ModalConcluirComponent, {
      title: 'Concluir Chamado',
      message: 'Deseja Realmente Cancelar o Chamado?'
    })
      .subscribe((isConfirmed) => {

        if (isConfirmed) {
          let disposable = this.dialogService.addDialog(ModalCancelarComponent, {
          title: 'Confirm title',
          message: 'Confirm message'
          })
        }
      });

    
  }

  concluirChamado() {
    let disposable = this.dialogService.addDialog(ModalConcluirComponent, {
      title: 'Concluir Chamado',
      message: 'Deseja Realmente Concluir o Chamado?'
    })
      .subscribe((isConfirmed) => {

        if (isConfirmed) {
          this.userService.concluirChamado(this.chamado);
          this.exibirMensagemModal("Concluir Chamado","Chamado Concluído")
        }
      });
  }

  exibirMensagemModal(titulo, mensagem) {

    let disposable = this.dialogService.addDialog(ModalInfoComponent, {
      title: titulo,
      message: mensagem
    })
  }

  ngOnInit() {
    this.chamados = new Array<any>();
    this.showGraph = this.getSizeArray(this.chamado) === 0;
    
    ModalComponent.motoristaSelecionado.subscribe(
      motorista => {
        this.userService.atendimentoACaminho(this.chamado, motorista)
        this.exibirMensagemModal("Atendimento em Andamento", 
        "O Motorista " + motorista.name + " foi deslocado para atendimento")
      });

    ModalCancelarComponent.motivoCancelamento.subscribe(     
      motivoCancelamento => { 
        this.userService.cancelarChamado(this.chamado, motivoCancelamento)
        this.exibirMensagemModal("Concluir Chamado","Chamado Cancelado")
      });
  }

}
