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
      title: 'Dashboard2',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Main', url: '/'},
      ]
    }, 

  ]

  constructor() { }
}
