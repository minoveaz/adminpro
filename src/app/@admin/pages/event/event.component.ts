import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';

import Swal from 'sweetalert2'
import { Event } from '../../models/event.model';

import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: [
  ]
})
export class EventComponent implements OnInit {

  public event: Event
  public updateEventForm: FormGroup
  public id: any;
  
  Locations = ["Calle Ailanto 18", "CINESA Principe Pio"]  
  EventTypes = ["Reunión Adultos", "Reunión Kids"]
  

  constructor( private fb: FormBuilder,
               private eventsService: EventsService,
               private route: ActivatedRoute) {
  
        
 
                }

  ngOnInit(): void {
    const EventId = this.route.snapshot.paramMap.get('id');
    this.id = EventId
    this.loadEvent();    
  }

  loadEvent(){
    this.eventsService.getEvent(this.id)
      .subscribe(resp =>{
        this.event = resp
        const isoDate = this.event.date
        const newDate = moment.utc(isoDate).format('YYYY-MM-DDThh:mm')
        this.updateEventForm = new FormGroup({
          name: new FormControl(this.event.name,[Validators.required]),
          location: new FormControl(this.event.location,[Validators.required]),
          capacity: new FormControl(this.event.capacity,[Validators.required]),
          eventType: new FormControl(this.event.eventType,[Validators.required]),
          date: new FormControl(newDate,[Validators.required]),
          _id: new FormControl(this.event._id),
          open:new FormControl(this.event.open)
        })
      })
      
  }

  updateEvent(){
    const updatedEvent: Event = this.updateEventForm.value
    console.log(updatedEvent)
    this.eventsService.updateEvent(updatedEvent)
      .subscribe( resp => {
        Swal.fire({title:'Event Updated', text:'Information updated correctly', icon:'success', timer: 2500});
        this.loadEvent();
      }, (err) => {
        Swal.fire({title:'Could not updated data', text:err.error.msg, icon:'error', timer: 2500})
      })
  }



}

