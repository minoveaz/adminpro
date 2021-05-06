import { Component } from '@angular/core';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component  {
  public labels1: string[] = ['Pan', 'Huevos', 'Mail-Order Sales'];
  public data1 = [
    [30, 20, 50],
  ];
}
