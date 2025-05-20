import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductRequest } from '../requests/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private API_URL = 'http://35.197.136.113:8181/api/product';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  createProduct(request: ProductRequest): Observable<void>{
    return this.http.post<void>(this.API_URL, request);
  }
}
