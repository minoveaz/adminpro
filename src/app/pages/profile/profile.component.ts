import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public uploadImage: File;
  public imgTem:any = null;

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private fileUploadService: FileUploadService) { 

  this.user = userService.user

  }

  ngOnInit(): void {
    //this.profileForm = this.fb.group({
    // name: ['123', Validators.required],
    //  email: ['abc', Validators.required, Validators.email]
    //});
    this.profileForm = new FormGroup({
      name: new FormControl(this.user.name,[Validators.required]),
      lastName: new FormControl(this.user.lastName,[Validators.required]),
      email: new FormControl(this.user.email,[Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.user.phoneNumber,[Validators.required]),
    })
  }

  updateProfile(){
    console.log(this.profileForm.value);
    this.userService.updateUserProfile( this.profileForm.value)
        .subscribe(resp => {
          const { name, lastName,email,phoneNumber} = this.profileForm.value
          this.user.name = name;
          this.user.lastName = lastName;
          this.user.email = email;
          this.user.phoneNumber = phoneNumber;
          console.log(resp)
          Swal.fire({title:'Data Updated', text:'Information updated correctly', icon:'success', timer: 2500});
        }, (err) => {
          Swal.fire({title:'Could not updated data', text:err.error.msg, icon:'error', timer: 2500})
        })
  }

  changePhoto(event: any){
    const files = event.target.files;
    this.uploadImage = files[0]

    if(!this.uploadImage){return this.imgTem = null}

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(files[0])

    reader.onloadend = () => {
      this.imgTem = reader.result
    }
  }

  uploadImagen(){
    this.fileUploadService
      .updateUserPhoto( this.uploadImage, 'users', this.user.uid)
      .then( img => {
        this.user.img = img
        Swal.fire({title:'Photo Updated', text:'The phot has been saved in your profile', icon:'success', timer: 2500});
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'Could not upload the image', 'error')
      });
    
  }

}
