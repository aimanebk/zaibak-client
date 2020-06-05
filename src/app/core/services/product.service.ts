import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SellerProduct } from '../models/sellerProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getSellerProduct(){
    return this.http.get<SellerProduct[]>('product/user');
  }
}
