import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from '../requests/order-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = 'http://35.197.136.113:8181/api/order';

  constructor(private http: HttpClient) {}

  placeOrder(orderRequest: OrderRequest): Observable<string> {
    return this.http.post(this.API_URL, orderRequest, { responseType: 'text' });
  }
}
