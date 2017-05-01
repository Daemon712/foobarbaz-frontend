import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertService} from "./alert.service";
import {Solution} from "../model/solution";
import {SolutionStatus} from "../model/solutions-status";

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
        let data = response.json() as any;
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
          userRating: data.details.userDetails.rating,
          userDifficulty: data.details.userDetails.difficulty,
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
        console.log(response);
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

  addSolution(challengeId: number, solution: Solution): Promise<Solution> {
    let sol = new Solution();
    Object.assign(sol, solution);
    sol.id = 10 + Math.floor(10 * Math.random());
    sol.name = 'Решение №' + sol.id;
    sol.status = Math.random() < 0.5 ? SolutionStatus.success : SolutionStatus.failed;
    sol.date = new Date();
    sol.solution = sol.newSolution;
    return this.getChallenge(challengeId)
      .then(challenge => {
        challenge.solutions.push(sol);
        return this.http.post(`${this.url}/${challengeId}`, challenge)
          .toPromise()
          .then(() => this.handleSolutionResponse(sol));
      });
  }

  updateSolution(challengeId: number, solution: Solution): Promise<Solution> {
    let sol = new Solution();
    Object.assign(sol, solution);
    sol.status = Math.random() < 0.5 ? SolutionStatus.success : SolutionStatus.failed;
    sol.date = new Date();
    sol.solution = sol.newSolution;
    return this.getChallenge(challengeId)
      .then(challenge => {
        Object.assign(challenge.solutions.find(s => s.id == sol.id), sol);
        return this.http.post(`${this.url}/${challengeId}`, challenge)
          .toPromise()
          .then(() => this.handleSolutionResponse(sol));
      });
  }

  deleteSolution(challengeId: number, solutionId: number): Promise<void> {
    return this.getChallenge(challengeId)
      .then(challenge => {
        challenge.solutions = challenge.solutions.filter(s => s.id != solutionId);
        return this.http.post(`${this.url}/${challengeId}`, challenge)
          .toPromise()
          .then(() => {});
      });
  }

  private handleSolutionResponse(result: Solution){
    if (result) {
      switch (result.status) {
        case SolutionStatus.empty: this.alertService.info("Решение успешно сохранено"); break;
        case SolutionStatus.success: this.alertService.success("Задача успешно решена!"); break;
        default: this.alertService.warning("Решение не прошло все тесты..."); break;
      }
    }
    else this.alertService.danger("Не удалось протестировать задачу");
    return result;
  }

  private handleError(error: any): Promise<any> {
    this.alertService.danger('Ошибка на стороне сервера');
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
