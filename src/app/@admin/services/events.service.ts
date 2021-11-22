import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

import { CreateEvent } from '../interfaces/create-event.interface';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public event: Event;

  public _hideModal: boolean = true;


  constructor( private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  get hideModal(){
    return this._hideModal;
  }


  openCreateEventModal(){
    this._hideModal = false
  }

  ocultCreateEventModal(){
    this._hideModal = true
  }

  

  createEvent ( formData:CreateEvent){
    return this.http.post(`${base_url}/events`, formData, this.headers)
    this.ocultCreateEventModal()
  }
}
