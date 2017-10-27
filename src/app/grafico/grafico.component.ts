import { Chamado } from './../model/chamado';
import { ChamadosListComponent } from './../chamados/chamados-list/chamados-list.component';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";

declare var Chart: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./grafico.component.css']
})

export class GraficoComponent implements OnInit{

  pieChartLabels: string[] = new Array<any>(); //= ['Bateria', 'Chaveiro', 'Combustível', 'Guincho', 'Troca de Pneu'];
  pieChartData: number[] = [0, 0, 0, 0, 1];
  pieChartType: string = 'pie';
  
  constructor() {

  }

  carregaGrafico(chamados) {

    let calls = [];
    chamados.forEach(chamado => {
      chamado.map(call => {
        this.pieChartLabels.push(call.type);
      })
    });

    chamados.subscribe(competitor => calls.push(competitor));
    for(let i = 0; i < calls.length; i++){
      console.log(calls[i].type);
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit(){
    ChamadosListComponent.carregaGrafico.subscribe(     
      chamado => { 
        for (var i in chamado){
         this.pieChartLabels.push(chamado[i].type);
        }
         //this.ref.detectChanges();
      });
  }

}
