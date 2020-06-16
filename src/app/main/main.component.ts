import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';
import { take, takeWhile } from 'rxjs/operators';
import { Role } from '../core/models/role';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  alive : boolean = true;
  constructor(private authenticationService: AuthenticationService, private router : Router) {}


  ngOnInit(): void {
    this.authenticationService.currentUser
    .pipe(takeWhile(() => this.alive))
    .subscribe(user => {
      if(user && user.role == Role.Admin)
        this.router.navigate(['/admin/product']);

      if(user && user.role == Role.User)
        this.router.navigate(['/storekeeper/product']);
    });
  }

  ngOnDestroy(){
    this.alive = false
  }

}
