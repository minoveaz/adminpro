import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


const base_url = environment.base_url

@Injectable({
    providedIn: 'root'
})

export class SearchsService{

    constructor( private http: HttpClient) {}

    get token():string{
        return localStorage.getItem('token') || '';
      }

    get headers(){
    return {
        headers:{
        'x-token': this.token
        }
    }
    }

    private transfromUsers( results: any[]): User[] {
        return results.map(
            user => new User(user.google, user.name, user.lastName, user.email, user.img, user.rol, user.uid)
        )
    }

    search(
        type: 'users'| 'doctors'| 'hospitals',
        termino: string = ''
        ){


        const url = `${base_url}/searchAll/collection/${type}/${termino}`
        return this.http.get<any[]>(url, this.headers)
            .pipe(
                map( (resp:any) => {

                    switch(type){
                        case 'users':
                            return this.transfromUsers(resp.results)

                        default:
                            return [];
                    }
                })
            )
    }

}