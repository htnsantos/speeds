import { Veiculo } from './../model/veiculo';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit, EventEmitter } from '@angular/core';

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
  
  static veiculoSelecionado = new EventEmitter<any>();

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  cadastrarMotorista(formData) {
    if (formData.valid) {
     
      ModalMotoristaCarComponent.veiculoSelecionado.emit(formData.form.value);
      this.result = true;
      this.close();
    } else {
      this.result = false;
      this.close();
    }
  }

}
