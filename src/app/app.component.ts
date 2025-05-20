import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'keycloak-angular-test';
  cartCount = 0;
  constructor(private cartService: CartService) {}


  ngOnInit(): void{
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      })
  }
}
