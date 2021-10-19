import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable,from } from 'rxjs';
import Auth from "@aws-amplify/auth";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return from(this.handle(request, next));

    
  }
  async handle(req: HttpRequest<any>, next: HttpHandler) {
    // if your getAuthToken() function declared as "async getAuthToken() {}"
     let token=await Auth.currentSession();

    // if your getAuthToken() function declared to return an observable then you can use
    // await this.auth.getAuthToken().toPromise()

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.getIdToken().getJwtToken()}`
      }
    })

    // Important: Note the .toPromise()
    return next.handle(req).toPromise()
  }
}
