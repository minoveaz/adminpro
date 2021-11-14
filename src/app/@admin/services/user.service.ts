import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { UpdateUserProfileForm } from '../interfaces/update-user-profile-form.interface';
import { User} from '../models/user.model'
import { LoadUsers } from '../interfaces/load-users.interface';

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

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
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
        const {email, googleLogin, img ='', lastName, name, rol, uid, phoneNumber} = resp.userDB
        this.user = new User(googleLogin,name,lastName, email, img,rol,uid,phoneNumber);
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
    return this.http.put(`${base_url}/users/${this.uid}`, formData, this.headers);
  }

  loadUsers( from: number = 0){
    
    const url = `${base_url}/users?from=${from}`
    return this.http.get<LoadUsers>(url, this.headers)
      .pipe(
        map( resp => {
          const users = resp.users.map( 
            user => new User(user.google, user.name, user.lastName, user.email, user.img, user.rol, user.uid, user.phoneNumber ))
          return {
            total: resp.total,
            users
          } 
          console.log(users)
        })
      )
  }

  deleteUser( user: User){
    const url = `${base_url}/users/${user.uid}`
    return this.http.delete(url, this.headers)
    console.log('eliminando')
  }

  updateUser( user: User){
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }
}
