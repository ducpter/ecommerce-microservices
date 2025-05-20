import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path : 'products', component: ProductListComponent},
    {path: 'orders', component: OrderComponent},
    {path: 'cart', component: CartComponent},
    {path : '', redirectTo: 'products', pathMatch: 'full'}
];
