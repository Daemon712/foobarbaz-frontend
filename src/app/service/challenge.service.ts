import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Http, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertService} from "./alert.service";
import {TestResult} from "../model/test-result";
import {Page} from "../model/page";
import {Rating} from "../model/rating";

@Injectable()
export class ChallengeService {
  private url = 'api/challenges';

  constructor(
    private alertService: AlertService,
    private http: Http,
  ) { }

  getChallenges(request: {
    page?: number,
    sortField?: string,
    sortDir?: string,
    name?: string,
    rating?: number,
    difficulty?: number,
    status?: number,
    tag?: string,
  }): Promise<Page<Challenge>>{
    let params = new URLSearchParams();
    if (request.page) params.set("page", ''+request.page);
    if (request.sortField) params.set("field", request.sortField);
    if (request.sortDir) params.set("dir", request.sortDir);
    if (request.name) params.set("name", request.name);
    if (request.rating) params.set("rating", ''+request.rating);
    if (request.difficulty) params.set("difficulty", ''+request.difficulty);
    if (request.status != null) params.set("status", ''+request.status);
    if (request.tag) params.set("tag", request.tag);
    return this.http.get(this.url, {params})
        .toPromise()
        .then(response => {
          let data = response.json();
          return {
            content: data.content.map(c => Object.assign(new Challenge(), c)),
            totalElements: data.totalElements,
            number: data.number,
          }
        })
        .catch((e) => this.handleError(e));
  }

  getChallengesByAuthor(author: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}/author/${author}`)
      .toPromise()
      .then(response => response.json().map(c => Object.assign(new Challenge(), c)))
      .catch((e) => this.handleError(e));
  }

  getChallengesByName(name: string): Promise<Challenge[]>{
    let params = new URLSearchParams();
    if (name) params.set("name", name);
    return this.http.get(`${this.url}/quick-search`, {params})
      .toPromise()
      .then(response => response.json().map(c => Object.assign(new Challenge(), c)))
      .catch((e) => this.handleError(e));
  }

  getBookmarksByUser(username: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}/bookmark/${username}`)
      .toPromise()
      .then(response => response.json().map(c => Object.assign(new Challenge(), c)))
      .catch((e) => this.handleError(e));
  }

  getChallenge(id: number): Promise<Challenge>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        if (response.status == 404){
          this.alertService.warning(`Задача <b>#${id}</b> не найдена`);
          return null;
        }
        return ChallengeService.parseChallenge(response.json())
      })
      .catch((e) => this.handleError(e));
  }

  getRandomChallenge() {
    return this.http.get(`${this.url}/random`)
      .toPromise()
      .then(response => ChallengeService.parseChallenge(response.json()))
      .catch((e) => this.handleError(e));
  }

  createChallenge(challenge: Challenge): Promise<Number|TestResult[]|String>{
    return this.http.post(this.url, {
      name: challenge.name,
      shortDescription: challenge.shortDescription,
      fullDescription: challenge.details.fullDescription,
      tags: challenge.tags,
      difficulty: challenge.difficulty,
      template: challenge.details.template,
      unitTest: challenge.details.unitTest,
      sample: challenge.details.sample,
      commentAccess: challenge.details.commentAccess,
      shareAccess: challenge.details.shareAccess,
    })
      .toPromise()
      .then(response => {
        if (response.status == 201) {
          this.alertService.success("Вы успешно создали задачу");
          return Number.parseInt(response.text());
        }
        else if (response.json() instanceof Array) {
          this.alertService.warning("Пример решения не прошел все тесты");
          return response.json().map(tr => Object.assign(new TestResult(), tr))
        } else {
          this.alertService.warning("Не удалось создать задачу");
          return response.text();
        }
      })
      .catch((e) => this.handleError(e));
  }

  updateChallenge(challenge: Challenge): Promise<Challenge>{
    console.log(challenge.details.fullDescription);
    return this.http.put(`${this.url}/${challenge.id}`, {
      name: challenge.name,
      shortDescription: challenge.shortDescription,
      fullDescription: challenge.details.fullDescription,
      tags: challenge.tags,
      commentAccess: challenge.details.commentAccess,
      shareAccess: challenge.details.shareAccess,
    })
      .toPromise()
      .then(response => {
        this.alertService.success("Задача успешно обновлена");
        return Object.assign(new Challenge(), response.json())
      })
      .catch((e) => this.handleError(e));
  }

  deleteChallenge(challengeId: number): Promise<void>{
    return this.http.delete(`${this.url}/${challengeId}`)
      .toPromise()
      .then(() => this.alertService.success("Задача успешно удалена"))
      .catch((e) => this.handleError(e));
  }

  updateBookmark(challengeId: number, bookmark: boolean): Promise<void>{
    return this.http.post(`${this.url}/${challengeId}/bookmark`, bookmark.toString())
      .toPromise()
      .then(() => {});
  }

  updateUserRating(challengeId: number, rating: Rating): Promise<Rating>{
    return this.http.post(`${this.url}/${challengeId}/rating`, rating)
      .toPromise()
      .then(response => { return {
        rating: response.json().rating,
        difficulty: response.json().difficulty,
      }});
  }

  private handleError(error: any): Promise<any> {
    this.alertService.danger('Ошибка на стороне сервера');
    console.error(error);
    return Promise.reject(error.message || error);
  }

  static parseChallenge(data: any) : Challenge {
    return Object.assign(new Challenge(), data);
  }
}
