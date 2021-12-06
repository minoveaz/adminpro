import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Attendee, Event } from '../../models/event.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styles: [
  ]
})
export class AttendeesComponent implements OnInit {

  @Input() title: string = 'Sin Titulo'

  public event: Event;
  public loading: boolean = true;
  public attendees: Attendee[] = [];
  public id: any;
  public confirmed: Attendee[] = [];
  public noAttend: Attendee[] = [];
  public registeredStatus: boolean = true;

  constructor( private eventService: EventsService,
               private route: ActivatedRoute) {

   }

  ngOnInit(): void {

    const EventId = this.route.snapshot.paramMap.get('id');
    this.id = EventId
    this.loadAttendees() 
  }

  loadAttendees(){
    this.loading = true
    this.eventService.loadAttendees(this.id)
      .subscribe(({attendees}) => {
        this.loading = false
        this.attendees = attendees
        this.confirmed = attendees.filter( attende => {
          return attende.status === 'Confirmed'
        })
        
        this.noAttend = attendees.filter( attende => {
          return attende.status === 'notAttend'
        })
      })

  }

  updateAttendee(attendee: Attendee){
    console.log('por aqui paso');
    console.log(attendee._id)
    
  }

  confirmAttendee(attendee: Attendee, attendeeStatus:string){
    const attendeId: any = attendee._id
    const status: any = {"status": `${attendeeStatus}`}
    this.eventService.confirmAttendee(this.id,attendeId,status)
      .subscribe(resp => {
        console.log(resp)
        this.loadAttendees()
        this.registeredStatus = false
      })
    
  }

  deleteAttendee(attendee: Attendee){
   const attendeId: any = attendee._id
   this.eventService.deleteAttendee(this.id,attendeId)
     .subscribe(resp => {
       Swal.fire({
         title:'Attende Deleted', 
         text:'the user has been deleted from the Event', 
         icon:'success', 
         timer: 2500})
         this.loadAttendees()
       console.log(resp)
     });
     
  }
}
