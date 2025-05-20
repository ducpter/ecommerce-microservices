import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderLineItems } from '../../models/order-line-items';
import { OrderRequest } from '../../requests/order-request';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: OrderLineItems[] = [];

  constructor(
    private cartService: CartService, 
    private http: HttpClient,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  placeOrder(): void {
    const orderRequest = {
      orderLineItemsDtoList: this.cartItems
    };

    this.orderService.placeOrder(orderRequest).subscribe({
      next: (response: string) => {
        alert('✅ ' + response);
        this.cartService.clearCart();
        this.cartItems = [];
      },
      error: (err) => {
        console.error('🔴 Failed to place order:', err);
        alert('❌ Order failed, please try again later!');
      }
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

}
