import {Injectable} from '@angular/core';
import {Http, Request, Response, Headers, RequestOptions, RequestOptionsArgs, XHRBackend} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpService extends Http{

  constructor (backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('auth_token');
    if (token != 'null') {
      if (typeof url === 'string') {
        if (!options) {
          options = {headers: new Headers()};
        }
        options.headers.set('Authorization', `Basic ${token}`);
      } else {
        url.headers.set('Authorization', `Basic ${token}`);
      }
    }
    return super.request(url, options).catch(HttpService.catchBusinessError);
  }

  private static catchBusinessError(res: Response) {
    return (res.status >= 400 && res.status < 500) ?
      Promise.resolve(res) :
      Observable.throw(res);
  }
}


export function HttpServiceFactory(backend: XHRBackend, options: RequestOptions){
  return new HttpService(backend, options);
}
