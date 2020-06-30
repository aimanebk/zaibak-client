import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trade } from '../models/trade';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http : HttpClient) { }

  getTradesLog(){
    return this.http.get<Trade[]>('trade');
  }
}
