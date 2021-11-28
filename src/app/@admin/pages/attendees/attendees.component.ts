import { Component, OnInit } from '@angular/core';
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

  public event: Event
  public attendees: Attendee[] = []
  public id: any

  constructor( private eventService: EventsService,
               private route: ActivatedRoute) {
    this.event = eventService.event
   }

  ngOnInit(): void {

    const EventId = this.route.snapshot.paramMap.get('id');

    this.id = EventId
    console.log(EventId)

    this.loadAttendees()
 
  }

  loadAttendees(){
    this.eventService.loadAttendees(this.id)
      /* .subscribe(({attendees}) => {
        this.attendees = attendees
        console.log(this.attendees)
      }) */

      console.log(this.id)
  }
}
