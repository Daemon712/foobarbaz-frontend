import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ArticleService} from "../../../service/article.service";
import {Article} from "../../../model/article";

@Component({
  selector: 'app-article-view',
  templateUrl: 'article-view.component.html',
})
export class ArticleViewComponent implements OnInit {

  article: Article;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.articleService.getArticle(+params['id']))
      .subscribe((article: Article) => {
        this.article = article;
      });
  }
}
