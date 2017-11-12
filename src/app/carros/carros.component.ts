import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {

  Carros: Array<any>;
  veiculo_speed: any;
  veiculo_placa: any;
  veiculo_key: any;
  operacao: any;

  constructor(private angularFire: AngularFireDatabase, private cdRef: ChangeDetectorRef) {
    this.operacao = "insert";
  }


  cadastrarCarro(formData) {

    if (formData.valid && this.operacao == "insert") {
      var self = this;
      this.angularFire.list("SpeedVehicles").push({
        veiculo_speed: formData.form.value.veiculo_speed,
        veiculo_placa: formData.form.value.veiculo_placa
      }).then((t: any) => {
        formData.form.controls.veiculo_speed.setValue('');
        formData.form.controls.veiculo_placa.setValue('');
      }),
        (e: any) => console.log(e.message);
    } else {
      let obj = {
        veiculo_speed: this.veiculo_speed,
        veiculo_placa: this.veiculo_placa
      }
      this.updateItem(this.veiculo_key, obj, formData)
    }
  }

  carregarCarro(carro, operacao) {
    this.operacao = operacao;
    this.veiculo_key = carro.key;
    this.veiculo_speed = carro.veiculo_speed;
    this.veiculo_placa = carro.veiculo_placa;
    this.cdRef.detectChanges();
  }

  limparCampos(formData) {
    formData.form.controls.veiculo_speed.setValue('');
    formData.form.controls.veiculo_placa.setValue('');
  }

  updateItem(key: string, value: any, formData): void {
    this.angularFire.object("SpeedVehicles/" + key)
      .update(value).then((t: any) => {
        formData.form.controls.veiculo_speed.setValue('');
        formData.form.controls.veiculo_placa.setValue('');
      }),
      (e: any) => console.log(e.message);
  }

  ngOnInit() {
    this.Carros = new Array<any>();
  }

}
