import { Component, OnInit } from '@angular/core';

declare var Chart: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent {

  constructor() {

  }

  public pieChartLabels: string[] = ['Bateria', 'Chaveiro', 'Combustível', 'Guincho', 'Troca de Pneu'];
  public pieChartData: number[] = [0, 0, 0, 0, 1];
  public pieChartType: string = 'pie';

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

}
