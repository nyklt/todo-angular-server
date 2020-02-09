import {Component, OnDestroy, OnInit,} from '@angular/core';
import {delay, switchMap, switchMapTo, takeUntil, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';

import {MetaPagination, Product} from '../../../../shared/models/products/product.model';
import {ProductService} from '../../../../shared/api/product-service/product.service';
import {NotificationsService} from "../../../../shared/common-services/notifications.service";
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public loadingProducts = true;

  products: Product[] = [];

  private _dataUpdatedSubject$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productService: ProductService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this._dataUpdatedSubject$
      .pipe(
        switchMap(() => {
          return this.productService.getProducts().pipe(delay(500))
        }),
        tap((products: Product[]) => {
          this.products = products;
          this.loadingProducts = false;
        }, () => {
          this.notificationService.error('Could not get products', {title: 'Server error'});
          this.loadingProducts = false
        })
      ).subscribe();
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.complete();
  }

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
