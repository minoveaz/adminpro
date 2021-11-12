import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public type: string;
  public id: string;
  public img: string;

  private _hideModal: boolean = true;

  get hideModal(){
    return this._hideModal;
  }

  loadModal(
    type: 'users'|'doctors'|'hospitals',
    //uid: string,
    img: string = 'no-image'
  ){
    this._hideModal = false; 
    this.type = type;
    //this.id = uid;

    if( img.includes('https')){
      this.img = img
    } else {
      this.img = `${base_url}/upload/${ type}/${img}`
    }
    //this.img = img;
  }

  ocultModal(){
    this._hideModal = true; 
  }

  constructor() { }
}
