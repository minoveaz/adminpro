import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/@admin/models/user.model';
import Swal from 'sweetalert2';


import { UserService } from 'src/app/@admin/services/user.service';
import { SearchsService } from '../../../services/searchs.service';
import { ModalImagenService } from 'src/app/@admin/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers:number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  public imgSubs: Subscription
  public from: number = 0;
  public loading: boolean = true;

  constructor( private userService: UserService,
               private searchsService: SearchsService,
               private modalImageService: ModalImagenService) { }
  
  
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();

    this.imgSubs =  this.modalImageService.newImg
        .pipe(
          delay(100)
        )
        .subscribe( img => this.loadUsers() );
  }

  loadUsers (){
    this.loading = true;
    this.userService.loadUsers(this.from)
      .subscribe( ({total, users}) => {
        this.totalUsers = total;
        this.users = users
        this.usersTemp = users
        this.loading = false
        //console.log(users)
      })
  }

  changePage(value:number){
    this.from += value

    if(this.from <0){
      this.from = 0
    } else if ( this.from >= this.totalUsers) {
      this.from -= value
    }
    this.loadUsers();
  }

  search( termino: string){

    if( termino.length === 0){
      return this.users = this.usersTemp
    }

    this.searchsService.search('users', termino)
      .subscribe( results => {
        this.users = results
      })
  }

  deleteUser( user: User){

    if ( user.uid === this.userService.uid){
      return Swal.fire('Error', 'You Can not Delete this User', 'error');
    }


    Swal.fire({
      title: 'Delete User',
      text: `You are going to delete ${user.name} ${user.lastName} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.userService.deleteUser(user)
          .subscribe(resp =>{
            Swal.fire(
              'Deleted!',
              `The user ${user.name} ${user.lastName} has been deleted.`,
              'success'
            )
          });
        this.loadUsers();
      }
    })
  }

  changeRole(user:User){
    this.userService.updateUser(user)
    .subscribe(resp => {
      console.log(resp);
    });
  }

  openModal(user: User){
    //console.log(user)
    this.modalImageService.loadModal('users', user.img, user.uid)
  }
}
