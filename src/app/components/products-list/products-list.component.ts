import {Component, OnDestroy, ViewChild, OnInit,} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';


import {Product} from '../../shared/models/products/product.model';
import {ProductService} from '../../shared/api/product-service/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements  OnInit, OnDestroy {
  public loadingProducts = true;
  products: Product[] = [];

  private _dataUpdatedSubject$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  productsStats: { pages: number; count: number; pageSize: number; page: number};


  public searchTerm: string = null;
  public isFocused = false;

  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private dataService: ProductService) {
  }

  ngOnInit() {
    this._dataUpdatedSubject$
      .pipe(
        tap(_ => (this.loadingProducts = true)),
        switchMap(() => this.dataService.sendGetRequest()),
        takeUntil(this.destroy$)
      )
      .subscribe((res: HttpResponse<Product[]>) => {
        this.loadingProducts = false;
        console.log(res);
        this.products = res.body;
    });
  }

  // ngOnInit() {
  //   this.dataService
  //     .sendGetRequest()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((res: HttpResponse<Product[]>) => {
  //       console.log(res);
  //       this.products = res.body;
  //     });
  // }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.complete();
  }



  public firstPage() {
    this.products = [];
    this.dataService
      .sendGetRequestToUrl(this.dataService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }

  public previousPage() {
    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.products = [];
      this.dataService
        .sendGetRequestToUrl(this.dataService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }

  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
      this.dataService
        .sendGetRequestToUrl(this.dataService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }

  public lastPage() {
    this.products = [];
    this.dataService
      .sendGetRequestToUrl(this.dataService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }
}
