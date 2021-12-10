import { Attendee, Event } from "../models/event.model";



export interface LoadEvents {
    
    events: Event[];
    attendees: Attendee[];
    eventData: Event[]
}