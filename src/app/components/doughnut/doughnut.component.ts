import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent   {

  @Input() title: string = 'Sin Titulo'

  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  
  public colors: Color[] = [
    {backgroundColor: ['#6857E6','#009FEE','#F02059']}
  ]
}
