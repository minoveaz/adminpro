

export class Event {
    constructor (
        public name: String,
        public date:  Date,
        public capacity: String,
        public location: String,
        public eventType: String,
        public img?:  String,
        public open?:  Boolean,
        public attendees?: Array<Attendee>,
    ) {}
}


export class Attendee {
    constructor(
        public email: String,
        public lastName: String,
        public name: String,
        public phoneNumber: String,
        public status: String,
        public id: String,
    ){}
}