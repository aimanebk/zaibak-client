import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  REGISTER_FORM = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeat_password: ['', [Validators.required, Validators.minLength(8)]],
  });

  error;

  constructor(private userService : UserService, private formBuilder : FormBuilder, private router : Router ) { }

  ngOnInit(): void {
  }

  register(): void{
    if(this.REGISTER_FORM.dirty && this.REGISTER_FORM.valid) {
      this.userService.regiser(this.REGISTER_FORM.value)
        .subscribe((data : any ) => {
          this.router.navigate(['/']);
        }, error => {
          this.error = error.error;
        });
    }
  }

}
