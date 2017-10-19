import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motoristas',
  templateUrl: './motoristas.component.html',
  styleUrls: ['./motoristas.component.css']
})
export class MotoristasComponent implements OnInit {

  Drivers: Array<any>;

  constructor(private angularFire: AngularFireDatabase) { }

  cadastrarMotorista(formData) {

    if (formData.valid) {
      var self = this;
      this.angularFire.list("Drivers").push({
        name: formData.form.value.nome,
        phone: formData.form.value.telefone
      }).then((t: any) => console.log('dados gravados: ' + t.key)),
        (e: any) => console.log(e.message);
    }
  }

  ngOnInit() {
    this.Drivers = new Array<any>();
  }

}
