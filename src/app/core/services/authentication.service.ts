import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, filter, shareReplay, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const ANONYMOUS_USER: User = {
  _id: undefined,
  username: undefined,
  role: undefined
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private  user : User;

  constructor(private http: HttpClient, private router : Router) {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.currentUserSubject = new BehaviorSubject<User>(this.user);
    this.currentUser = this.currentUserSubject.asObservable().pipe(filter(user => !!user));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(payload) {
    return this.http.post('auth', payload )
    .pipe(map((user : User) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.currentUserSubject.next(user);
      // let usr = {...user};
      // delete usr.role; 
      // localStorage.setItem('currentUser', JSON.stringify(usr));
      return user;
    }));
  }

  logout() {
    return this.http.post('logout', null).pipe(
      shareReplay(),
      tap(user => {
        this.currentUserSubject.next(ANONYMOUS_USER);
        this.router.navigate(['/login']);
      }));
  }

  initUser(){
    // if(!this.user)
    //   return from([]);

    return this.http.get('user/info')
      .pipe(map((user : User) => {
        console.log(user)
        if(!user){
          this.router.navigate(['/login']);
          return from([]);
        }else{
          this.currentUserSubject.next(user);
        }
      }));
  }
}
