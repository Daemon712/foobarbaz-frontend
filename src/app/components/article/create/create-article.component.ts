import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ArticleService} from "../../../service/article.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-article',
  templateUrl: 'create-article.component.html',
})
export class CreateArticleComponent implements OnInit {
  tags: string[];
  form: FormGroup;
  submitted = false;
  editorConfig = {
    placeholder: "",
  };

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
  ) {
    this.form = formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Zа-яА-Я0-9\-._ ]+')
        ])
      ],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(250)
        ])
      ],
      body: [
        '',
        Validators.compose([Validators.required])
      ],
    });

  }

  ngOnInit() {
  }

  displayErrors(control: string){
    return this.form.controls[control].errors &&
      (this.form.controls[control].dirty || this.form.controls[control].touched);
  }

  displayError(control: string, error: string){
    return this.form.controls[control].errors[error];
  }

  onSubmit(){
    this.submitted = true;
    const article = this.form.value;
    article.tags = this.tags;

    this.articleService.createArticle(article)
      .then(article => {
        if (!article) {
          this.submitted = false;
        } else {
          this.router.navigate([`articles/${article.id}`]);
        }
      });
  }
}
