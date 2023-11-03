import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { filter } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(iListFilter: string) {
    this._listFilter = iListFilter.toLowerCase();
    this.filteredProduct = this.performFilter(iListFilter);
  }

  filteredProduct: IProduct[] = [];
  products: IProduct[] = [];

  performFilter(filterBy: string): IProduct[] {
    return this.products.filter((iProduct: IProduct) =>
      iProduct.productName.toLowerCase().includes(filterBy)
    );
  }

  onRatingClicked(message: string): void {
    console.log(`received rating: ${message}`);
    this.pageTitle = 'Product List: ' + message;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProduct = this.products;
  }
}
