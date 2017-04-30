import {FactoryProvider, Injectable} from '@angular/core';
import {Http, Request, Response, Headers, RequestOptions, RequestOptionsArgs, XHRBackend} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpService extends Http{

  constructor (backend: XHRBackend, options: RequestOptions) {
    let token = localStorage.getItem('auth_token');
    if (token != 'null') {
      options.headers.set('Authorization', `Basic ${token}`);
    }
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

export class HttpProvider implements FactoryProvider {
  provide = Http;
  useFactory = (backend: XHRBackend, options: RequestOptions) => new HttpService(backend, options);
  deps = [XHRBackend, RequestOptions];
}
