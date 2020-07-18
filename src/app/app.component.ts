import { Component } from '@angular/core';
import { User } from './core/models/user';
import { AuthenticationService } from './core/services/authentication.service';
import { Role } from './core/models/role';
import { take } from 'rxjs/operators';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;
  showNavbar : boolean = false;
  showloading : boolean = true;

  constructor(private authenticationService: AuthenticationService, private router : Router) {
      this.authenticationService.currentUser.subscribe(x => this.user = x);
      this.authenticationService.initUser().pipe(take(1)).subscribe();
      router.events.subscribe(e => {
        if (e instanceof RouteConfigLoadStart) {
            //Lazy loading starts
            this.showNavbar = false;
            this.showloading = true;
        } else if (e instanceof RouteConfigLoadEnd ) {
            // Lazy loading ends
            this.showNavbar = true;
            this.showloading = false;
        }
    });
    
  }

  get isAdmin() {
      return this.user && this.user.role === Role.Admin;
  }

  get isStoreKeeper() {
      return this.user && this.user.role === Role.User;
  }
}
