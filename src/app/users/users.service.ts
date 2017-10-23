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

  getCliente(chamado) {
    this.size$ = new BehaviorSubject(null);

    console.log(chamado.key);

    this.users = this.size$.switchMap(size =>
      this.db.list('/UserModel/' + chamado.key
      ).valueChanges()
    );
    return this.users;
  }

  atendimentoACaminho(chamado, motorista) {
    
    let mensagem = "Seu atendimento já está a caminho";
    let status = "Atendimento à caminho";

    this.getCliente(chamado).subscribe(user => {
      this.sendRequestDriver(user, chamado, motorista, mensagem, status)
    })
  }

  cancelarChamado(chamado, motivoCancelamento) {
    
    let status = "Atendimento cancelado";

    this.getCliente(chamado).subscribe(user => {
      this.sendRequestDriver(user, chamado, undefined, motivoCancelamento, status)
    })
  }

  concluirChamado(chamado) {

    let mensagem = "Seu atendimento foi concluído";
    let status = "Atendimento concluído";

    this.getCliente(chamado).subscribe(user => {
      this.sendRequestDriver(user, chamado, undefined, mensagem, status)
    })
  }

  sendRequestDriver(user, chamado, motorista, mensagem, status) {

    if (user[0]) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Access-Control-Allow-Origin', '*');

      let options = new RequestOptions({ headers: headers });
      let params = {
        token: user[4],
        title: "Speed Solution",
        message: mensagem
      }

      console.log(params);

      this.http.post("https://speeds-api.herokuapp.com/api/message", params, options).subscribe(res => console.log(res.json()));
      //.map(this.onLoginSuccess)
      //.catch(this.onError);
      var obj = {
        "status": status,
        "driver": motorista ? motorista.name : "",
        "driver_cel": motorista ? motorista.phone : "",
        "data_atendimento": new Date().getTime(),
      }

      if(motorista == undefined) {
        delete obj.driver;
        delete obj.driver_cel;
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

