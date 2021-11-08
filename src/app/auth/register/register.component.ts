import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent   {

  public formSubmitted = false;

  public registerForm = this.fb.group({

    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terminos: [false, [Validators.required]]

  },
  {
    validators: this.passwordsEquals('password','password2')
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router:Router) { }

  createUser(){
    this.formSubmitted= true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
     return
    }

    // We have all the information about the user
    this.userService.createUser( this.registerForm.value)
        .subscribe( resp => {
          this.router.navigateByUrl('/')
        },(err) => {
          // if an error
          Swal.fire('Error', err.error.msg,'error');
        });

  }

  campoNovalido( campo: string): boolean {

    if (this.registerForm.get(campo)?.invalid  && this.formSubmitted){
      return true
    } else {
      return false;
    }
  }

  contrasenasNotValid(){
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value

    if ( (pass1 !== pass2) && this.formSubmitted){
      return true
    }else {
      return false
    }
  }

  acceptTerms(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }

  passwordsEquals(pass1Name: string, pass2Name: string){
    
    return (formGroup: FormGroup) =>{
      
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
    
      if ( pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else {
        pass2Control?.setErrors({ notEqual: true})
      }
    
    }
  }
}

