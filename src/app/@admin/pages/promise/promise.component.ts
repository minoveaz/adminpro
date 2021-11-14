import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: [
  ]
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })

    const promise = new Promise( ( resolve, reject ) => {
      
      if(false){
        resolve('Hola Mundo');
      }else{
        reject('algo salio mal');
      }
    });

    promise.then( (mensaje) => {
      console.log(mensaje);
    })
    .catch( error => console.log('Error en mi promesa', error))

    console.log('Fin del Init');
  }

  getUsuarios() {

    return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => console.log(body.data));

    });
  }

}


