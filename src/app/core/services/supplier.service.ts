import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http : HttpClient) { }

  addSupplier(payload){
    return this.http.post('supplier', payload);
  }
}
