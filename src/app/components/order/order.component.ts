import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderRequest } from '../../requests/order-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  constructor(private orderService: OrderService) {}

  placeOrder() {
    const order: OrderRequest = {
      orderLineItemsDtoList: []
    };

    this.orderService.placeOrder(order).subscribe({
      next: (res) => console.log('✅ Order success:', res),
      error: (err) => console.error('❌ Order error:', err)
    });
  }
}
