import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
