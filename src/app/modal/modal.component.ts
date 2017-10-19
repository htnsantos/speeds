import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

export interface ConfirmModel {
  title:string;
  message:string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  motoristas: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;

  constructor(dialogService: DialogService, private db: AngularFireDatabase) {
    super(dialogService);

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
    
    this.result = true;
    this.close();
  }
}