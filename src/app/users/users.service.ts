import { Chamado } from './../model/chamado';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Injectable()
export class UsersService {

  users: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;

  constructor(private db: AngularFireDatabase, private http: Http) { }

  getToken(chamado) {
    
    let token: any;

    var dfRef = firebase.database().ref('UserModel/' + chamado.key + '/token');
      dfRef.on('value', function(snapshot) {
       
      token = snapshot.val();
       return token;
    })
   
  }

  atendimentoACaminho(chamado, motorista) {
    
    let mensagem = "Seu atendimento já está a caminho";
    let status = "Atendimento à caminho";
    let operacao ="atendimentoCaminho";

    let self = this;

    var dfRef = firebase.database().ref('UserModel/' + chamado.key + '/token');
      dfRef.on('value', function(snapshot) {
      self.sendRequestDriver(snapshot.val(), chamado, motorista, mensagem, status, operacao)
   })

    
  }

  cancelarChamado(chamado, motivoCancelamento) {
    
    let status = "Atendimento cancelado";
    let operacao ="atendimentoCancelado";
    let self = this;

    var dfRef = firebase.database().ref('UserModel/' + chamado.key + '/token');
      dfRef.on('value', function(snapshot) {
      self.sendRequestDriver(snapshot.val(), chamado, undefined, motivoCancelamento, status, operacao)
    })

  }

  concluirChamado(chamado) {

    let mensagem = "Seu atendimento foi concluído";
    let status = "Atendimento concluído";
    let operacao ="atendimentoConcluido";
    let self = this;

    var dfRef = firebase.database().ref('UserModel/' + chamado.key + '/token');
      dfRef.on('value', function(snapshot) {
      self.sendRequestDriver(snapshot.val(), chamado, undefined, mensagem, status, operacao)
    })

  }

  sendRequestDriver(token, chamado, motorista, mensagem, status, operacao) {

    if (token) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Access-Control-Allow-Origin', '*');

      let options = new RequestOptions({ headers: headers });
      let params = {
        token: token,
        title: "Speed Solution",
        message: mensagem
      }

      this.http.post("https://speeds-api.herokuapp.com/api/message", params, options).subscribe(res => console.log(res.json()));
      //.map(this.onLoginSuccess)
      //.catch(this.onError);
      var data = new Date();
      var periodo = data.getHours() < 12 ? "AM" : "PM";
     
      let obj = {
        "status": status,
        "driver": motorista ? motorista.name : "",
        "driver_cel": motorista ? motorista.phone : "",
        "data_atendimento": data.toLocaleDateString() + " " + data.toLocaleTimeString() + " " + periodo,
        "veiculo_speed":  chamado.veiculo ? chamado.veiculo.veiculo_speed : "",
        "veiculo_placa": chamado.veiculo ? chamado.veiculo.veiculo_placa : "",
        "motivo_cancelamento": ""
      }

      if(motorista == undefined) {
        delete obj.driver;
        delete obj.driver_cel;
      }

      if(chamado.veiculo == undefined){
        delete obj.veiculo_placa;
        delete obj.veiculo_speed;
      }

      if(operacao == "atendimentoCancelado") {
        obj.motivo_cancelamento = mensagem
      }

      this.updateItem(chamado.key, obj);
    }

    return true;

  }

  onLoginSuccess(res) {
    return res.json();
  }

  onError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  updateItem(key: string, value: any): void {
  this.db.object("Requests/" + key)
  .update(value).then((t: any) => console.log('dados alterados: ' + key)),
        (e: any) => console.log(e.message);
    }
}

