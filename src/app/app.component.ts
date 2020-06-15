import { Component } from '@angular/core';
import { User } from './core/models/user';
import { AuthenticationService } from './core/services/authentication.service';
import { Role } from './core/models/role';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;

  constructor(private authenticationService: AuthenticationService, private router : Router) {
      this.authenticationService.currentUser.subscribe(x => {
          this.user = x;
          if(this.user && this.user.role == Role.Admin)
            this.router.navigate(['/admin/product'])
        });
      this.authenticationService.initRoles().pipe(take(1)).subscribe(x => {});
  }

  get isAdmin() {
      return this.user && this.user.role === Role.Admin;
  }
}
