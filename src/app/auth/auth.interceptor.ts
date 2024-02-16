import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('token') != null) { 
      console.log("Token found");
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + localStorage.getItem('token')!
        }
      });
    } else {
      console.log("Token not found");
    }
    return next.handle(request);
  }
}
