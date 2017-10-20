import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

//requests

import { Http, Response, RequestOptions, Headers } from '@angular/http';


export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  usuario: any;

  motoristas: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;

  constructor(dialogService: DialogService, private db: AngularFireDatabase, private http: Http) {
    super(dialogService);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.usuario = user;
      }
    });

    this.size$ = new BehaviorSubject(null);

    this.motoristas = this.size$.switchMap(size =>
      db.list('/Drivers', ref =>
        size ? ref.orderByChild('name').equalTo(size) : ref
      ).valueChanges()
    );
  }
  confirm() {

    this.result = true;
    this.close();
  }

  selecionarMotorista(motorista) {
    console.log(motorista);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin','*');

    let options = new RequestOptions({ headers: headers });
    let params = {
      token: "ewVkU7gIhbc:APA91bGX5y6iUK3UGwMKYsl2RbjXkiM8_wDUyvgeV4MW_kZZZDDbNWsy4QKn0jJMel17Xry1lGtCZbif5xzhTVoVqn7aVXw1PGDZpIcUScQdkC5kdpAC9XC1bT4HqhIDC9uBk0tOcfGj",
      title: "Speed Solution",
      message: "Seu atendimento já está a caminho"
    }

    this.http.post("https://speeds-api.herokuapp.com/api/message", params, options).subscribe(res => console.log(res.json()));
      //.map(this.onLoginSuccess)
      //.catch(this.onError);

    this.result = true;
    this.close();
  }

  onLoginSuccess(res) {
    return res.json();
  }

  onError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}