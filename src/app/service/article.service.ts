import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Article} from "../model/article";
import {AlertService} from "./alert.service";

@Injectable()
export class ArticleService {
  url = 'api/articles';

  constructor(
    private http: Http,
    private alertService: AlertService,
  ) { }

  getArticles(): Promise<Article[]>{
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as Article[]);
  }

  getArticle(id: number): Promise<Article>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => response.json().data as Article);
  }

  createArticle(article: Article): Promise<Article>{
    //TODO PARAMETERS SHOULD BE FILLED ON SERVER
    article.created = new Date();
    article.author = "Привет";

    return this.http.post(this.url, article)
      .toPromise()
      .then(response => {
        let article = response.json().data as Article;
        if (article) this.alertService.success("Вы успешно создали задачу");
        else this.alertService.warning("Не удалось создать задачу");
        return article;
      });
  }
}
