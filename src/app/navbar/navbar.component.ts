import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../core/models/user';
import { Role } from '../core/models/role';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isAdmin : boolean;
  @Input() isStoreKeeper : boolean;

  constructor(private authenticationService: AuthenticationService) {}

  logOut() {
      this.authenticationService.logout();
  }

}
