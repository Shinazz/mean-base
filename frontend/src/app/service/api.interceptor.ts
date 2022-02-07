import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private data: DataService, private cookie: CookieService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    let headerSettings: { [name: string]: string | string[] } = {};
    headerSettings['Content-Type'] = 'application/json';
    headerSettings['Accept'] = 'application/json';
    const url = request.url.split('/');
    if (url.indexOf('login') >= 0 || url.indexOf('register') >= 0) {
      const newHeader = new HttpHeaders(headerSettings);

      request = request.clone({
        headers: newHeader,
      });

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let data = {};
          data = {
            reason:
              error && error.error && error.error.reason
                ? error.error.reason
                : '',
            status: error.status,
          };
          return throwError(error);
        })
      );
    } else {
      headerSettings['Authorization'] = 'Bearer ' + this.cookie.get('token');
      const newHeader = new HttpHeaders(headerSettings);
      request = request.clone({
        headers: newHeader,
      });

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let data = {};
          data = {
            reason:
              error && error.error && error.error.reason
                ? error.error.reason
                : '',
            status: error.status,
          };
          return throwError(error);
        })
      );
    }
  }
}
