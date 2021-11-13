import { Injectable, EventEmitter} from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public type: 'users'|'doctors'|'hospitals';
  public id: string;
  public img: string;

  private _hideModal: boolean = true;

  public newImg: EventEmitter<string> = new EventEmitter<string>()

  get hideModal(){
    return this._hideModal;
  }

  loadModal(
    type: 'users'|'doctors'|'hospitals',
    img: string = 'no-image',
    id: any,
    
  ){
    this._hideModal = false; 
    this.type = type;
    this.id = id;

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
