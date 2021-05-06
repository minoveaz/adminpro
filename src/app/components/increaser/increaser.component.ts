import { Component, Input, Output,EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent implements OnInit {
  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`;
  }
  

  @Input('valor') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  changeValue ( value: number){

    if (this.progress >= 100 && value >= 0){
      this.valorSalida.emit(100);
      return this.progress = 100;
    }

    if (this.progress <= 0 && value < 0){
      this.valorSalida.emit(0)
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.valorSalida.emit(this.progress)
  }

  onChange(newValue:number){
    if(newValue >= 100){
      this.progress = 100
    }else if (newValue <= 0){
      this.progress =0
    }else {
      this.progress = newValue
    }
    this.valorSalida.emit(this.progress)
  }
}
