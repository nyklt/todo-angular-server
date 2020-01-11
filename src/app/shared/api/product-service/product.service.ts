import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {retry, catchError, tap, map} from 'rxjs/operators';
import {Product} from '../../models/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private REST_API_SERVER = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public first: string = '';
  public prev: string = '';
  public next: string = '';
  public last: string = '';

  parseLinkHeader(header) {
    if (header.length == 0) {
      return;
    }
    let parts = header.split(',');
    var links = {};
    parts.forEach(p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });
    this.first = links['first'];
    this.last = links['last'];
    this.prev = links['prev'];
    this.next = links['next'];
  }

  public sendGetRequest() {
    return this.httpClient.get<Product[]>(this.REST_API_SERVER, {
      params: new HttpParams({fromString: '_page=1&_limit=20'}),
      observe: 'response'
    }).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  public sendGetRequestToUrl(url: string) {
    return this.httpClient.get<Product[]>(url, {observe: 'response'}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  public get(id: number): Observable<Product> {
    return this.httpClient.get(`${this.REST_API_SERVER}/${id}`).pipe(map(response => new Product(response)));
  }
}

