import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderRequest } from '../requests/order-request';
import { OrderLineItems } from '../models/order-line-items';
import { Product } from '../models/product';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: OrderLineItems[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCountSubject.asObservable(); 

  getItems(): OrderLineItems[] {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.skuCode === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        skuCode: product.name,
        price: product.price,
        quantity: 1
      });
    }
    this.updateCartCount();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartCount();
  }

  getCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  private updateCartCount() {
    this.cartCountSubject.next(this.getCount());
  }
}
