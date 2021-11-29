import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
}
