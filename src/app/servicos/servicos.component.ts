import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  servicos = [];
  tipoServico: any;
  valor_base: any;
  valor_km: any;

  constructor(private cdRef: ChangeDetectorRef, private angularFire: AngularFireDatabase) { }

  carregaServicos(servicos, tipoServico) {

    this.tipoServico = tipoServico;
    this.servicos = servicos.checklist;
    this.valor_base = servicos.valor_base;
    this.valor_km = servicos.valor_km;

    this.cdRef.detectChanges();
  }

  alterarServico(formData) {

    var form = formData.form.controls;
    var obj = {
      checklist: []
    };

    for (let i = 0; i < this.servicos.length; i++) {
      obj.checklist[i] = form[i].value;
    }

    obj["valor_base"] = form.valor_base.value;
    obj["valor_km"] = form.valor_km.value;

    this.updateItem(this.tipoServico, obj, formData);
  }

  updateItem(key: string, value: any, formData): void {
    this.angularFire.object("SystemParameter/services/" + key)
      .update(value).then((t: any) => {
        for (let i = 0; i < this.servicos.length; i++) {
          formData.form.controls[i].setValue('');
        }
        formData.form.controls.valor_base.setValue('');
        formData.form.controls.valor_km.setValue('');
      }),
      (e: any) => console.log(e.message);
  }

  trackByIndex(index: number, value: number) {
    return index;
  }

  ngOnInit() {
  }

}
