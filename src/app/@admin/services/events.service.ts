import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendee, Event } from '../models/event.model';

import { CreateEvent } from '../interfaces/create-event.interface';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { LoadEvents } from '../interfaces/load-events.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public event: Event;
  public attendee: Attendee

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
  }

  loadEvents(){
    const url = `${base_url}/events`
    return this.http.get<LoadEvents>(url, this.headers)
      .pipe(
        map( resp => {
          //console.log(resp)
          const events = resp.events.map(
            event => new Event(event.name,event.date,event.capacity,event.location,event.eventType,event.img,event.open,event.attendees,event._id))
            return{
              events
            }
        })
      )
  }

  getEvent(eventId:string){
    const url = `${base_url}/events/${eventId}`
    return this.http.get<LoadEvents>(url, this.headers)
    .pipe(
      map( (resp: any) => {
        const {name, date,capacity, location, eventType, open,} = resp.eventData
        this.event = new Event(name, date,capacity,location, eventType);
        return this.event
      })
    )
  }

  loadAttendees(eventId:string){
    const url = `${base_url}/events/${eventId}`
    return this.http.get<LoadEvents>(url, this.headers)
    //.pipe(map(res => console.log(res)))
      .pipe(
        map(
        data => {
          const attendees = data.attendees.map(
            attendee => new Attendee(attendee.email,attendee.lastName,attendee.name,attendee.phoneNumber,attendee.status,attendee._id))
            return{
              attendees
            }
        },
        )
      )
  }


  deleteEvent(event: Event){
    const url = `${base_url}/events/${event._id}`
    return this.http.delete(url,this.headers)
  }

  updateEvent(event: Event){
    const url = `${base_url}/events/${event._id}`
    return this.http.put(url, event, this.headers)
  }

/*----------------------------------------- atteendees --------------------------------- */

  confirmAttendee(eventId:string, attendee:string, status:JSON){
   const url = `${base_url}/events/${eventId}/${attendee}`
   return this.http.put(url, status, this.headers)
  }

  deleteAttendee(eventId:string, attendee:string){
    const url = `${base_url}/events/${eventId}/${attendee}`
    return this.http.delete(url,this.headers)
  }

}
