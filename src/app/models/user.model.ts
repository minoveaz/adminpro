

export class User {
    constructor (
        public google: boolean,
        public name: string,
        public lastName: string,
        public email?: string,
        public image?: string,
        public role?: string,
        public uid?: string,
    ) {}
}

