import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


  public formSubmitted = false;

  public loginForm = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor( private router: Router,
               private fb: FormBuilder) { }
               

  
  login(){

    console.log(this.loginForm.value)

    //this.router.navigateByUrl('/')
  }
}
