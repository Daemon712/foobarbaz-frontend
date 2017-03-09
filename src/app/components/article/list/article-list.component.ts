import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../service/article.service";
import {Article} from "../../../model/article";

@Component({
  selector: 'app-article-list',
  templateUrl: 'article-list.component.html',
  styleUrls: ['article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[];

  page = 1;
  sortField = "created";
  sortReverse = false;

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.articleService.getArticles()
      .then(articles => this.articles = articles);
  }

}
