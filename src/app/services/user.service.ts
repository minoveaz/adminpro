import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { UpdateUserProfileForm } from '../interfaces/update-user-profile-form.interface';
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

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.user.uid || ""
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validateToken(): Observable<boolean>{
    
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const {email, googleLogin, img ='', lastName, name, rol, uid} = resp.userDB
        this.user = new User(googleLogin,name,lastName, email, img,rol,uid);
        localStorage.setItem('token', resp.token);
        return true
      }),
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

  updateUserProfile( formData: UpdateUserProfileForm){
    return this.http.put(`${base_url}/users/${this.uid}`, formData, {
      headers: {
        'x-token': this.token
      }
    });
  }
}
