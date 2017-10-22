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

  getTokenByEmail(chamado) {

    this.size$ = new BehaviorSubject(null);

    this.users = this.size$.switchMap(size =>
      this.db.list('/UserModel', ref =>
        ref.orderByChild('email').equalTo(chamado.email)
      ).valueChanges()
    );
    this.users.subscribe(user => {
      this.sendRequestDriver(user, chamado)
    })
  }

  sendRequestDriver(user, chamado) {

    if (user[0]) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Access-Control-Allow-Origin', '*');

      let options = new RequestOptions({ headers: headers });
      let params = {
        token: user[0].token,
        title: "Speed Solution",
        message: "Seu atendimento já está a caminho"
      }

      this.http.post("https://speeds-api.herokuapp.com/api/message", params, options).subscribe(res => console.log(res.json()));
      //.map(this.onLoginSuccess)
      //.catch(this.onError);
      this.updateItem(chamado.key, {status: "Atendimento a Caminho"});
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

