import { IProduct } from './product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): IProduct[] {
    return [
      {
        productId: 2,
        productName: 'Garden Cart',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2021',
        description: '15 gallon capacity rolling',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/garden_cart.png',
      },
      {
        productId: 5,
        productName: 'Hammer',
        productCode: 'TBX-0048',
        releaseDate: 'March 21, 2021',
        description: 'Curved claw steel hammer',
        price: 8.9,
        starRating: 4.8,
        imageUrl: 'assets/images/hammer.png',
      },
    ];
  }
}
