import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-modal-cancelar',
  templateUrl: './modal-cancelar.component.html',
  styleUrls: ['./modal-cancelar.component.css']
})
export class ModalCancelarComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  title: string;
  message: string;

  static motivoCancelamento = new EventEmitter<any>();

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  cadastrarMotorista(formData) {
    if (formData.valid) {
      ModalCancelarComponent.motivoCancelamento.emit(formData.form.value.motivoCancelamento);
      this.result = true;
      this.close();
    } else {
      this.result = false;
      this.close();
    }
  }

}
