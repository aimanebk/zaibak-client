import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getSellerProduct(){
    return this.http.get<Product[]>('product/user');
  }

  addProduct(payload){
    return this.http.post('product', payload);
  }

  updateProduct(id, payload){
    return this.http.put('product/'+ id, payload);
  }

  getAdminProducts(payload){  
    return this.http.get('product', {params : payload});
  }

  getAdminOneProduct(productID, query){
    return this.http.get('product/'+ productID, {params : query})
  }

  getStorekeeperProducts(){
    return this.http.get('product/user/')
  }

  getStorekeeperOneProduct(productID){
    return this.http.get('product/user/'+ productID)
  }

  sellProduct(id, sellDetail){
    return this.http.post('sell/'+id, sellDetail);
  }

  returnProduct(id, returnDetail){
    return this.http.post('return/'+id, returnDetail);
  }

  purchaseProduct(id, purchaseDetails){
    return this.http.post('purchase/'+id, purchaseDetails);
  }

  deleteProduct(id){
    return this.http.delete('product/'+id);
  }
}
