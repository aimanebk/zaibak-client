import { Component, OnInit } from '@angular/core';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';

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
  constructor(private fb: FormBuilder, private router : Router, private userService : UserService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.LOGIN_FORM.dirty && this.LOGIN_FORM.valid) {
      this.userService.login(this.LOGIN_FORM.value)
        .subscribe((data : any ) => {
          console.log(data);
        }, error => {
          console.log(error.error);
          this.error = error.error;
        });
    }
  }

}
