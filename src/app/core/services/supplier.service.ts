import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http : HttpClient) { }

  getSuppliers(){
    return this.http.get<Supplier[]>('supplier');
  }

  addSupplier(payload){
    return this.http.post('supplier', payload);
  }
}
