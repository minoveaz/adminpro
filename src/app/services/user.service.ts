import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User} from '../models/user.model'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class UserService {

  public user!: User; 

  constructor( private http: HttpClient,
               private router: Router,
               ) { }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validateToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        console.log(resp);
        
        const {email, googleLogin, img, lastName, name, rol, uid} = resp.userDB
        this.user = new User(googleLogin,name,lastName, email, img,rol,uid);
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => {
        console.log(error);
        return of(false);
      })
    );
  }

  createUser ( formData: RegisterForm){
    return this.http.post(`${base_url}/users`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  login ( formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
               .pipe(
                 tap( (resp: any) => {
                   localStorage.setItem('token', resp.token);
                 })
               );
  }
}
