import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Article} from "../model/article";

@Injectable()
export class ArticleService {
  url = 'api/articles';

  constructor(
    private http: Http,
  ) { }

  getArticles(): Promise<Article[]>{
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as Article[]);
  }
}
