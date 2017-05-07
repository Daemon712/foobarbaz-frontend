import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Http, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertService} from "./alert.service";
import {SolutionService} from "./solution.service";
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

  getChallenges(page?: number, sortField?: string, sortDir?: string): Promise<Page<Challenge>>{
    let params = new URLSearchParams();
    if (page) params.set("page", page.toString());
    if (sortField) params.set("field", sortField);
    if (sortDir) params.set("dir", sortDir);
    return this.http.get(this.url, {params: params})
        .toPromise()
        .then(response => {
          let data = response.json();
          return {
            content: data.content.map(c => ChallengeService.parseChallenge(c)),
            totalElements: data.totalElements,
            number: data.number,
          }
        })
        .catch((e) => this.handleError(e));
  }

  getChallengesByAuthor(author: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}/author/${author}`)
      .toPromise()
      .then(response => response.json().map(c => ChallengeService.parseChallenge(c)))
      .catch((e) => this.handleError(e));
  }

  getChallengesByName(name: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}?name=${name}`)
      .toPromise()
      .then(response => response.json().data as Challenge[])
      .catch((e) => this.handleError(e));
  }

  getBookmarksByUser(username: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}/bookmark/${username}`)
      .toPromise()
      .then(response => response.json().map(c => ChallengeService.parseChallenge(c)))
      .catch((e) => this.handleError(e));
  }

  getChallenge(id: number): Promise<Challenge>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        let data = response.json();
        let userRating = data.details.userDetails ? data.details.userDetails.userRating : null;
        return {
          id: data.id,
          name: data.name,
          abstract: data.shortDescription,
          description: data.details.fullDescription,
          tags: data.tags,
          status: data.status,
          author: {
            username: data.author.username,
            name: data.author.name,
          },
          created: data.created,
          rating: data.rating,
          difficulty: data.difficulty,
          views: data.details.views,
          completedSolutions: data.details.solutions,
          solutionTemplate: data.details.template,
          userRating: userRating
            ? { rating: userRating.rating, difficulty: userRating.difficulty }
            : null,
          bookmark: data.details.userDetails ? data.details.userDetails.bookmark : null,
          solutions: data.details.userDetails ? data.details.userDetails.solutions.map(i => SolutionService.parseSolution(i)) : [],
        }
      })
      .catch((e) => this.handleError(e));
  }

  createChallenge(challenge: Challenge): Promise<Number|TestResult[]|String>{
    return this.http.post(this.url, {
      name: challenge.name,
      shortDescription: challenge.abstract,
      fullDescription: challenge.description,
      tags: challenge.tags,
      difficulty: challenge.difficulty,
      template: challenge.solutionTemplate,
      unitTest: challenge.solutionTest,
      sample: challenge.solutionExample,
    })
      .toPromise()
      .then(response => {
        if (response.status == 201) {
          this.alertService.success("Вы успешно создали задачу");
          return Number.parseInt(response.text());
        }
        else if (response.json() instanceof Array) {
          this.alertService.warning("Пример решения не прошел все тесты");
          return SolutionService.parseTestResults(response.json());
        } else {
          this.alertService.warning("Не удалось создать задачу");
          return response.text();
        }
      })
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

  private static parseChallenge(c: any) {
    return {
      id: c.id,
      name: c.name,
      abstract: c.shortDescription,
      status: c.status,
      tags: c.tags,
      author: {
        username: c.author.username,
        name: c.author.name,
      },
      created: c.created,
      rating: c.rating,
      difficulty: c.difficulty,
    }
  }
}
