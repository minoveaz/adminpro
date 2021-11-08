import { environment } from "src/environments/environment";

const base_url = environment.base_url;

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

    get imagenUrl(){
        if (this.image){
            return `${base_url}/upload/users/${this.image}`
        }else{
            return `${base_url}/upload/users/no-image`
        }
    }
}


