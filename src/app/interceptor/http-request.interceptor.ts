import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let clone = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });
    return next.handle(clone);
  }
}
