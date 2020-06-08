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

  addProduct(payload){
    return this.http.post('product', payload);
  }

  getAdminProducts(payload){  
    return this.http.get('product', {params : payload});
  }
}
