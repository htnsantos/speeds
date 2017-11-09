import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css']
})
export class MotoristasComponent implements OnInit {

  Drivers: Array<any>;
  name: any;
  phone: any;
  driver_key: any;
  operacao: any;

  constructor(private angularFire: AngularFireDatabase, private cdRef: ChangeDetectorRef) { }

  cadastrarMotorista(formData) {

    if (formData.valid && this.operacao == "insert") {
      var self = this;
      this.angularFire.list("Drivers").push({
        name: formData.form.value.nome,
        phone: formData.form.value.telefone
      }).then((t: any) => console.log('dados gravados: ' + t.key)),
        (e: any) => console.log(e.message);
    } else {
      let obj = {
        name: this.name,
        phone: this.phone
      }
      this.updateItem(this.driver_key, obj, formData)
    }
  }

  carregarMotorista(motorista, operacao) {
    this.operacao = operacao;
    this.driver_key = motorista.key;
    this.name = motorista.name;
    this.phone = motorista.phone;
    this.cdRef.detectChanges();
  }

  updateItem(key: string, value: any, formData): void {
    this.angularFire.object("Drivers/" + key)
      .update(value).then((t: any) => {
        formData.form.controls.nome.setValue('');
        formData.form.controls.telefone.setValue('');
      }),
      (e: any) => console.log(e.message);
  }

  ngOnInit() {
    this.Drivers = new Array<any>();
  }

}
