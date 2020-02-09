import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {catchError, share} from 'rxjs/operators';
import {NotificationsService} from "../common-services/notifications.service";

@Injectable()
export class ApiService {

  baseUrl = environment.KoaServerURL;

  constructor(
    protected http: HttpClient,
    private router: Router,
    private notificationsService: NotificationsService,
  ) {}

  public get<T>(url: string, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.get<T>(pathUrl, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  public post<T>(url: string, body: any | null, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.post<T>(pathUrl, body, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  public put<T>(url: string, body: any | null, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.put<T>(pathUrl, body, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  public patch<T>(url: string, body: any | null, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.patch<T>(pathUrl, body, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  public delete<T>(url: string, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.delete<T>(pathUrl, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  private buildPathUrl(url: string, options): string {
    return this.baseUrl + url;
  }

  protected handleError(httpErrorRes: HttpErrorResponse) {
    const serverErrMsg = (httpErrorRes && httpErrorRes.error) && httpErrorRes.error.message;

    if (httpErrorRes.status === 400) {
      // generic bad request, most likely failed backend validation
      this.notificationsService.error(serverErrMsg);
    } else if (httpErrorRes.status === 401) {
      // this.session.unAuthorize();
      this.router.navigate(['/login']);
      this.notificationsService.error(serverErrMsg, {title: 'Unauthorized'});
    } else if (httpErrorRes.status === 404) {
      this.notificationsService.error(serverErrMsg, {title: 'Not found.'});
    } else {
      // 5xx - server errors
      // TODO see about proper handling or logging
      this.notificationsService.error(serverErrMsg, {title: 'An error occurred.'});
    }
    console.error('Api error occurred:', httpErrorRes); // FIXME: implement logging solution

    return throwError(httpErrorRes);
  }

}
