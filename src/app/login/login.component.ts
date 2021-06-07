import { Component, OnInit } from '@angular/core';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/services/authentication.service';
import { Role } from '../core/models/role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  loading : boolean = false;
  disabled : boolean = false;
  LOGIN_FORM = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  error ;
  constructor(private fb: FormBuilder, private router : Router, 
              private authenticationService : AuthenticationService, private toastrService : ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.LOGIN_FORM.dirty && this.LOGIN_FORM.valid) {
      this.loading = true;
      this.disabled = true;
      this.authenticationService.login(this.LOGIN_FORM.value)
        .subscribe((user : any ) => {
          this.loading = false;
          this.disabled = false;
          console.log(user)
          if(user && user.role == Role.Admin)
            this.router.navigate(['/admin/product']);
  
          if(user && user.role == Role.User)
            this.router.navigate(['/storekeeper/product']);
        }, err => {
          this.loading = false;
          this.disabled = false;
          this.toastrService.error(err);
        });
    }
  }

}
