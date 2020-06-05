import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RangeService {

  constructor(private http : HttpClient) { }

  getRanges(){
    return this.http.get<Range[]>('range');
  }

  addRange(payload){
    return this.http.post('range', payload);
  }
}
