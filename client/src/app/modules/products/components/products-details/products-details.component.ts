import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable, from} from 'rxjs';
import {distinctUntilChanged, switchMap, share, tap, map, delay} from 'rxjs/operators';

import {Product} from '../../../../shared/models/products/product.model';
import {ProductService} from '../../../../shared/api/product-service/product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  isLoadingProduct = true;

  product$: Observable<Product>;
  products: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, public location: Location,
              private router: Router,) {
  }


  // ngOnInit() {
  //   // this.route.params.pipe(
  //   //   distinctUntilChanged(),
  //   //   switchMap(params => {
  //   //     return this.productService.getProductDetails(params.id);
  //   //   }), delay(500))
  //   //   .subscribe((product: Product) => {
  //   //    return new Product(product);
  //   //     this.isLoadingProduct = false;
  //   //   }, (error) => {
  //   //     this.isLoadingProduct = false;
  //   //   });
  //
  //
  //     this.product$ = this.route.params.pipe(
  //       distinctUntilChanged(),
  //       switchMap(params => {
  //         return this.productService.getProductDetails(params.id);
  //       })
  //     );
  //
  // }


    ngOnInit() {
      const routeParams$ = this.route.params.pipe(distinctUntilChanged());

      this.product$ = routeParams$.pipe(
        switchMap(params => this.productService.getProductDetails(params.id)),
        tap(data => {
          this.products = data;
        }),
        share()
      );
    }

    // console.log('p', this.product$);
    //     // this.product$ = this.route.params.pipe(
    //     //   distinctUntilChanged(),
    //     //   switchMap(params => {
    //     //     return this.productService.getProductDetails(params._id);
    //     //   })
    //     // );

    // const routeParams$: Observable<Params> = this.route.params.pipe(distinctUntilChanged());
    //
    // console.log('product$', this.product$);
    // this.product$ = routeParams$.pipe(
    //   switchMap(params => {
    //     return this.productService.getProductDetails(params.id);
    //   }),
    //   map((productById: Product) => {
    //     console.log('pr', productById);
    //     return productById;
    //   }),
    //   share()
    // );
  // }

  //
  // ngOnInit() {
  //   const routeParams$: Observable<Params> = this.route.params.pipe(distinctUntilChanged());
  //   this.product$ = routeParams$.pipe(
  //     switchMap(params => {
  //       return this.productService.getProductDetails(params.id);
  //     }),
  //     tap(data => {
  //       this.product = data;
  //     }),
  //     share()
  //   );
  // }
}



