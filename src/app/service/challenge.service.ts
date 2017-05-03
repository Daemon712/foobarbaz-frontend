import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertService} from "./alert.service";
import {SolutionService} from "./solution.service";

@Injectable()
export class ChallengeService {
  private url = 'api/challenges';

  constructor(
    private alertService: AlertService,
    private http: Http,
  ) { }

  getChallenges(): Promise<Challenge[]>{
    return this.http.get(this.url)
        .toPromise()
        .then(response => {
          let list = response.json() as any[];
          return list.map(item => { return {
            id: item.id,
            name: item.name,
            abstract: item.shortDescription,
            status: item.status,
            author: item.author.username,
            created: item.created,
            rating: item.rating,
            difficulty: item.difficulty,
          }})
        })
        .catch((e) => this.handleError(e));
  }

  getChallengesByAuthor(author: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}?author=${author}`)
      .toPromise()
      .then(response => response.json().data as Challenge[])
      .catch((e) => this.handleError(e));
  }

  getChallengesByName(name: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}?name=${name}`)
      .toPromise()
      .then(response => response.json().data as Challenge[])
      .catch((e) => this.handleError(e));
  }

  getBookmarksByUser(username: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}?bookmark=true`)
      .toPromise()
      .then(response => response.json().data as Challenge[])
      .catch((e) => this.handleError(e));
  }

  getChallenge(id: number): Promise<Challenge>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        let data = response.json();
        return {
          id: data.id,
          name: data.name,
          abstract: data.shortDescription,
          description: data.details.fullDescription,
          status: data.status,
          author: data.author.username,
          created: data.created,
          rating: data.rating,
          difficulty: data.difficulty,
          views: data.details.views,
          completedSolutions: data.details.solutions,
          solutionTemplate: data.details.template,
          userRating: data.details.userDetails ? data.details.userDetails.rating : null,
          userDifficulty: data.details.userDetails ? data.details.userDetails.difficulty : null,
          solutions: data.details.userDetails ? data.details.userDetails.solutions.map(i => SolutionService.parseSolution(i)) : [],
        }
      })
      .catch((e) => this.handleError(e));
  }

  createChallenge(challenge: Challenge): Promise<number>{
    return this.http.post(this.url, {
      name: challenge.name,
      shortDescription: challenge.abstract,
      fullDescription: challenge.description,
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
        else {
          this.alertService.warning("Не удалось создать задачу");
          return null;
        }
      })
      .catch((e) => this.handleError(e));
  }

  updateBookmark(challengeId: number, bookmark: boolean): Promise<Challenge>{
    //TODO change url to 'api/challenges/:id//bookmark'
    return this.getChallenge(challengeId)
      .then(challenge => {
        challenge.bookmark = bookmark;
        return this.http.post(`${this.url}/${challengeId}`, challenge)
          .toPromise()
          .then(response => challenge);
      });
  }

  updateUserRating(challengeId: number, rating: number, difficulty: number): Promise<Challenge>{
    //TODO change url to 'api/challenges/:id/rating'
    return this.getChallenge(challengeId)
      .then(challenge => {
        challenge.userRating = rating;
        challenge.userDifficulty = difficulty;
        return this.http.post(`${this.url}/${challengeId}`, challenge)
          .toPromise()
          .then(response => challenge);
      });
  }

  private handleError(error: any): Promise<any> {
    this.alertService.danger('Ошибка на стороне сервера');
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
