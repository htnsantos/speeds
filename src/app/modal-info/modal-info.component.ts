import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { DialogComponent } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

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
