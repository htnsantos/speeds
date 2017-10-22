import { DialogService } from 'ng2-bootstrap-modal';
import { DialogComponent } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-modal-concluir',
  templateUrl: './modal-concluir.component.html',
  styleUrls: ['./modal-concluir.component.css']
})

//TODO: mudar o nome desse componente para ModalOptionComponent
export class ModalConcluirComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel{

  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
   }

   confirm() {
    this.result = true;
    this.close();
  }

  ngOnInit() {
  }

}
