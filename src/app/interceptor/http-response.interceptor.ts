import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error) {
          switch (error.status) {
            case 400:
              break;
            case 401:
              break;
            case 500:
              break;
            default:
              break;
          }
        }
        throw error;
      })
    );
  }
}
