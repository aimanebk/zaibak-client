import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient) { }

  login(payload) {
    return this.http.post('auth', payload );
  }
  
  regiser(payload){
    return this.http.post('user', payload);
  }
}
