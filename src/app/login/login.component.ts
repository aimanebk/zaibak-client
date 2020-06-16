import { Component, OnInit } from '@angular/core';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/services/authentication.service';
import { Role } from '../core/models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  LOGIN_FORM = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  error ;
  constructor(private fb: FormBuilder, private router : Router, private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.LOGIN_FORM.dirty && this.LOGIN_FORM.valid) {
      this.authenticationService.login(this.LOGIN_FORM.value)
        .subscribe((user : any ) => {
          if(user && user.role == Role.Admin)
          this.router.navigate(['/admin/product']);
  
          if(user && user.role == Role.User)
            this.router.navigate(['/storekeeper/product']);
          console.log(user);
        }, error => {
          console.log(error);
          this.error = error.error;
        });
    }
  }

}
