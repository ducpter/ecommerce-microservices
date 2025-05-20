import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../services/product-service.service';
import { ProductRequest } from '../../requests/product-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  constructor(private productService: ProductServiceService, 
    private cartService: CartService
  ) {}
  products: Product[] = [];
  newProduct: ProductRequest = { name: '', description: '', price: 0 };
  selectedQuantities: { [productName: string]: number } = {};

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => {
        console.error('🔴 Failed to fetch products:', err)
        console.log('Error details:', {
          status: err.status,
          statusText: err.statusText,
          message: err.message,
          url: err.url
        });
      }
    });
  }

  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.newProduct = { name: '', description: '', price: 0 };
        this.loadProducts();
      },
      error: (err) => console.error('🔴 Failed to create product:', err)
    });
  }

  addToCart(product: Product) {
    const quantity = this.selectedQuantities[product.name] || 1;
    this.cartService.addToCart(product);
  }
}
