import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Tag} from "../model/tag";

@Injectable()
export class TagService {
  private url = 'api/tags';

  constructor(private http: Http) { }

  getTags(): Promise<Tag[]>{
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as Tag[])
      .catch(TagService.handleError);
  }

  findTags(name: string): Promise<Tag[]>{
    // if (name == null) return this.getTags();
    return this.http.get(`${this.url}?name=${name}`)
      .toPromise()
      .then(response => response.json().data as Tag[])
      .catch(TagService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
