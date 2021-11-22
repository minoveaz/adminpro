import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Main', url: '/'},
        { title: 'ProgressBar', url: 'progress'},
        { title: 'Graph', url: 'graph1'},
        { title: 'Promise', url: 'promise'},
        { title: 'Rxjs', url: 'rxjs'}
      ]
    }, 
    {
      title: 'Events',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Events List', url: 'events'},
      ]
    }, 
    {
      title: 'Settings',
      icon: 'mdi mdi-folder-lock-open',
      submenu:[
        { title: 'Users', url: 'users'},
        { title: 'Hospitals', url: 'hospitals'},
        { title: 'Doctors', url: 'doctors'},
      ]
    }, 

  ]

  constructor() { }
}
