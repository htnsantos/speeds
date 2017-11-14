
import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { DialogService } from "ng2-bootstrap-modal";
import { ModalCadastrarServicosComponent } from "../modal-cadastrar-servicos/modal-cadastrar-servicos.component";

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
   EventEmitter 

  constructor(private cdRef: ChangeDetectorRef, private angularFire: AngularFireDatabase,
              private dialogService: DialogService) { }

  carregaServicos(servicos, tipoServico) {

    this.tipoServico = tipoServico;
    this.servicos = servicos.checklist;
    this.valor_base = servicos.valor_base;
    this.valor_km = servicos.valor_km;

    this.cdRef.detectChanges();
  }

  cadastrarServico() {

    let disposable = this.dialogService.addDialog(ModalCadastrarServicosComponent, {
      title: this.tipoServico,
      message: '',
    })

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

  removerServico(key) {
    
    this.servicos.splice(key, 1);
    var obj = {
      checklist: this.servicos
    }
        
    this.angularFire.object("SystemParameter/services/" + this.tipoServico)
      .update(obj).then((t: any) => {
        console.log("Item excluido com sucesso");
        this.cdRef.detectChanges();
      }),
      (e: any) => console.log(e.message);
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
