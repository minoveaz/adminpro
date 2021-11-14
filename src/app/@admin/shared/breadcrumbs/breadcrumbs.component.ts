import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo!: string;
  public tituloSubs$: Subscription; 
  
  constructor( private router: Router) {

    this.tituloSubs$ = this.getDataRuta().subscribe(data => {
      console.log(data);
      this.titulo = data.title
      document.title = `Admin-Pro ${data.title}`
    })
   }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

   getDataRuta(){
    return this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data)
    )
   }

}
