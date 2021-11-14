import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/@admin/models/user.model';
import { UserService } from 'src/app/@admin/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor( private userService:UserService) {
    this.user = userService.user;
  }

  logout(){
    this.userService.logout();
  }

  ngOnInit(): void {
  }

}
