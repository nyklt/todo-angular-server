import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../models/products/product.model';
import {ApiService} from "../api.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) {
  }

  getProducts(): Observable<Product[]> {

    return this.apiService.get<Product[]>('/products').pipe(
      map((products: Product[]) => {
        return products.map(product => new Product(product))
      })
    );
  }

  getProductDetails(productId) {
    return this.apiService.get(`/products/${productId}`).pipe(
      map((product: Product) => {
        return new Product(product)
      })
    );
  }

  deleteProduct(productId: string) {
    return this.apiService.delete(`/products/${productId}`);
  }

  //
  // public get(id: number): Observable<Product> {
  //   return this.httpClient.get(`${this.REST_API_SERVER}/${id}`).pipe(map(response => new Product(response)));
  // }
}

