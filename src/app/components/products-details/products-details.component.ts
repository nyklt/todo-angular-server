import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable, from} from 'rxjs';
import {distinctUntilChanged, switchMap, share, tap, map} from 'rxjs/operators';

import {Product} from '../../shared/models/products/product.model';
import {ProductService} from '../../shared/api/product-service/product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  public product$: Observable<Product>;
  products: Product[] = [];

  constructor(private _dataService: ProductService, private _route: ActivatedRoute, private _router: Router, public location: Location) {
    console.log('data service', _dataService);
  }

  ngOnInit() {
    const routeParams$: Observable<Params> = this._route.params.pipe(distinctUntilChanged());
    this.product$ = routeParams$.pipe(
      switchMap(params => {
        console.log(params);
        // from(this._dataService.get(params.id))
        return this._dataService.get(params.id);
      }),
      map((productById: Product) => {
        console.log(productById);
        return productById;
      }),
      share()
    );


    this.onClick();
  }


  //cart: Product[];

  onClick() {
   // this.cart.push(Product);
  }
}


