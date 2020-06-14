import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../core/models/user';
import { Role } from '../core/models/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  user: User;

  constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.user = x);
  }

  get isAdmin() {
      return this.user && this.user.role === Role.Admin;
  }

  logOut() {
      this.authenticationService.logout();
  }

}
