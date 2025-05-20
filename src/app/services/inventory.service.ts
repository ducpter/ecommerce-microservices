import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryResponse } from '../models/inventory-response';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly API_URL = 'http://35.197.136.113:8181/api/inventory';

  constructor(private http: HttpClient) {}

  checkStock(skuCodes: string[]): Observable<InventoryResponse[]> {
    const params = new HttpParams().appendAll({
      skuCode: skuCodes
    });
    return this.http.get<InventoryResponse[]>(this.API_URL, { params });
  }
}