import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from './product';
import { Observable, Subscription, filter } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';

  private _listFilter: string = '';
  private _sub!: Subscription;

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
    this._sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProduct = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
