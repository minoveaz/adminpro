import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Event } from '../../models/event.model';

import { EventsService } from '../../services/events.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styles: [
  ]
})
export class EventsComponent implements OnInit {

  public formSubmitted = false;
  public loading: boolean = true;
  public events: Event[] = []
  public openEvents: Number

  public eventStatusForm = this.fb.group({
    statusEvent: [false]
  })


  public createEventForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    location: ['', [Validators.required]],
    capacity: ['', [Validators.required]],
    eventType: ['', [Validators.required]],
    date: ['',[Validators.required]],
  })

 
  

  Locations = ["Calle Ailanto 18", "CINESA Principe Pio"]  
  EventTypes = ["Reunión Adultos", "Reunión Kids"]

  
  constructor( private fb: FormBuilder,
               public eventsService: EventsService ) { }



  ngOnInit(): void {
    this.loadEvents();
  }

  closeCreateEventModal(){
    this.eventsService.ocultCreateEventModal();
  }

  openModal (){
    this.eventsService.openCreateEventModal();
  }

  openEditModal(){

  }

  createEvent(){
    this.formSubmitted= true;

    if(this.createEventForm.invalid){
      return Swal.fire('Error', 'Please fill all the Form', 'error');
    }
    this.eventsService.createEvent(this.createEventForm.value)
      .subscribe( resp => {
        this.eventsService.ocultCreateEventModal()
        Swal.fire(
          'Created!',
          `The Event has been Created.`,
          'success'
        )
        console.log(resp)
      })
    
  }

  loadEvents(){
    this.loading = true
    this.eventsService.loadEvents()
      .subscribe( ({events}) => {
        this.loading = false
        this.events = events
        const openEvents = events.filter( e => {
          return e.open === true
        })
        this.openEvents = openEvents.length
      })
  }

  updateEvent(){

  }

  deleteEvent( event: Event){
    Swal.fire({
      title: 'Delete Event',
      text: `You are going to delete ${event.name} from ${event.date} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.eventsService.deleteEvent(event)
          .subscribe(resp =>{
            Swal.fire(
              'Deleted!',
              `The user ${event.name} from ${event.date} has been deleted.`,
              'success'
            )
            this.loadEvents();
          });
      }
    })
  }

  changeEventStatus(event: Event){
    this.eventsService.updateEvent(event)
    .subscribe(resp => {
      console.log(resp)
      this.loadEvents();
    })
  }



}
