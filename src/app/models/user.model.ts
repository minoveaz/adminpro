import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class User {
    constructor (
        public google: boolean,
        public name: string,
        public lastName: string,
        public email?: string,
        public img?: string,
        public rol?: string,
        public uid?: string,
        public phoneNumber?: string,
    ) {}

    get imagenUrl(){

        if(this.img?.includes('https')){
            return this.img
        }

        if (this.img){
            return `${base_url}/upload/users/${this.img}`
        }else{
            return `${base_url}/upload/users/no-image`
        }
    }
}


