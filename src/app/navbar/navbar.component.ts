import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() isAdmin : boolean;
  @Input() isStoreKeeper : boolean;

  faSignOutAlt = faSignOutAlt;
  faHome = faHome;

  constructor(private authenticationService: AuthenticationService) {}

  logOut() {
      this.authenticationService.logout().subscribe();
  }

}
