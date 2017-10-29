import { Chamado } from './../model/chamado';
import { ChamadosListComponent } from './../chamados/chamados-list/chamados-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";

declare var Chart: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})


export class GraficoComponent implements OnInit{

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;
  pieChartLabels: string[] = ['Bateria', 'Chaveiro', 'Combustível', 'Guincho', 'Troca de Pneu'];
  pieChartData: number[] = [0,0,0,0,0];
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
                
       let groupped = chamado.reduce(function (r, a) {
        r[a.type] = r[a.type] || [];
        r[a.type].push(a);
        return r;
    }, Object.create(null));
        
         this.pieChartData = [
           groupped["Bateria"] ? groupped["Bateria"].length : 0,
           groupped["Chaveiro"] ? groupped["Chaveiro"].length : 0,
           groupped["Combustivel"] ? groupped["Combustivel"].length : 0,
           groupped["Guincho"] ? groupped["Guincho"].length : 0,
           groupped["Troca Pneu"] ? groupped["Troca Pneu"].length : 0
          ];

         this.chart.chart.update();
      });
  }

}
