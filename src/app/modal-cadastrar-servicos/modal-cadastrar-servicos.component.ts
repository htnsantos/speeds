import { ServicosComponent } from './../servicos/servicos.component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { AngularFireDatabase } from "angularfire2/database";
import { ConfirmModel } from "../modal-motorista-car/modal-motorista-car.component";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-modal-cadastrar-servicos',
  templateUrl: './modal-cadastrar-servicos.component.html',
  styleUrls: ['./modal-cadastrar-servicos.component.css']
})
export class ModalCadastrarServicosComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  title: string;
  message: string;
  veiculo: any;
  nome: any;

  constructor(dialogService: DialogService, private db: AngularFireDatabase) {
    super(dialogService);

  }

  cadastrar(formData) {

    if (formData.valid) {

      let self = this;
      let checklists = [];

      var ref = firebase.database().ref("SystemParameter/services/" + this.title + "/checklist");
      ref.on("value", function (snapshot) {
        checklists = snapshot.val();
        checklists.push(formData.form.value.nome);

      })

      let obj = {
        checklist: checklists
      }
      self.updateItem(self.title, obj)

    }
  }

  updateItem(key: string, value: any): void {
    this.db.object("SystemParameter/services/" + key)
      .update(value).then((t: any) => {
        this.result = true;
        this.close();
      }),
      (e: any) => console.log(e.message);
  }

}
