import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Car_rental_angular';

  isCustomerLoggedin: boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedin: boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedin = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedin = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
