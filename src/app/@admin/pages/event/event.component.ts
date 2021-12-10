import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
               public eventsService: EventsService,
               private route: ActivatedRoute) {
  
  this.event = eventsService.event
                }

  ngOnInit(): void {
    const EventId = this.route.snapshot.paramMap.get('id');
    this.id = EventId

    this.updateEventForm = new FormGroup({
      name: new FormControl(this.event.name,[Validators.required]),
      location: new FormControl('CINESA Principe Pio',[Validators.required]),
      capacity: new FormControl('90',[Validators.required]),
      eventType: new FormControl('Reunión Kids',[Validators.required]),
      date: new FormControl('',[Validators.required]),

    })

    this.loadEvent();
  }

  loadEvent(){
    this.eventsService.getEvent(this.id)
      .subscribe(resp =>{
        console.log(resp)
        console.log(this.event)
      })
  }



}

