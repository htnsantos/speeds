import { NgForm } from '@angular/forms';
import { Veiculo } from './../model/veiculo';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit, EventEmitter } from '@angular/core';

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-modal-motorista-car',
  templateUrl: './modal-motorista-car.component.html',
  styleUrls: ['./modal-motorista-car.component.css']
})
export class ModalMotoristaCarComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel  {

   title: string;
   message: string;
   veiculo: any;
  
  static veiculoSelecionado = new EventEmitter<any>();
   carros: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
   size$: BehaviorSubject<string | null>;

  constructor(dialogService: DialogService, private db: AngularFireDatabase) {
    super(dialogService);

    this.size$ = new BehaviorSubject(null);

    this.carros = this.size$.switchMap(size =>
      db.list('/SpeedVehicles', ref =>
        size ? ref.orderByChild('name').equalTo(size) : ref
      ).valueChanges()
    );
  }

  selecionarCarro(formData) {
    
    if (formData.valid) {
     
      ModalMotoristaCarComponent.veiculoSelecionado.emit(formData.form.value.veiculo);
      this.result = true;
      this.close();
    } else {
      this.result = false;
      this.close();
    }
  }

}
