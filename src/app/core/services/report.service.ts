import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http : HttpClient) { }

  getProductsValueReport(query){
    return this.http.get<Product[]>('report', {params : query});
  }
}
