import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable, observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private  user : User;

  constructor(private http: HttpClient, private router : Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.currentUserSubject = new BehaviorSubject<User>(this.user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(payload) {
    return this.http.post('auth', payload )
    .pipe(map((user : User) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.currentUserSubject.next(user);
      let usr = {...user};
      delete usr.role; 
      localStorage.setItem('currentUser', JSON.stringify(usr));
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  initRoles(){
    if(!this.user)
      return from([]);

    return this.http.get('user/role')
      .pipe(map((user : { role : string }) => {
        if(!user){
          this.logout();
          return from([]);
        }
        
        if(user.role == 'Admin')
          this.user.role = Role.Admin;
        else
          this.user.role = Role.User;

        this.currentUserSubject.next(this.user);
      }));
  }
}
