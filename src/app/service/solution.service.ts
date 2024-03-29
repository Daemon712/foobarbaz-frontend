import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {TestResult} from "../model/test-result";
import {Solution} from "../model/solution";
import {AlertService} from "./alert.service";

@Injectable()
export class SolutionService {
  private url = 'api/challenges/';

  constructor(
    private http: Http,
    private alertService: AlertService,
  ) { }

  // getSolutions(challengeId: number): Promise<Solution[]>{
  //   return this.http.get(`${this.url}${challengeId}/solutions`)
  //     .toPromise()
  //     .then(response => {
  //       let list = response.json();
  //       return list.map(item => SolutionService.parseSolution(item));
  //     })
  //     .catch(SolutionService.handleError);
  // }

  deleteSolution(challengeId: number, solutionId: number): Promise<void>{
    let url = `${this.url}${challengeId}/solutions/${solutionId}`;
    return this.http.delete(url).toPromise().then(() => {});
  }

  testSolution(challengeId: number, solution: Solution): Promise<Solution>{
    return this.processSolution(challengeId, 'test', solution)
  }

  saveSolution(challengeId: number, solution: Solution): Promise<Solution>{
    return this.processSolution(challengeId, 'save', solution)
  }

  shareSolution(challengeId: number, solutionId: number, comment: string): Promise<number>{
    let url = `${this.url}${challengeId}/solutions/${solutionId}/share`;
    return this.http.post(url, comment)
      .toPromise()
      .then(response => {
        let sharedSolId = Number.parseInt(response.text());
        this.alertService.success(`Ваше решение успешно опубликовано:<br/><a href="/solutions/${sharedSolId}">${comment}</a>`);
        return sharedSolId;
      });
  }

  private processSolution(challengeId: number, action: string, solution: Solution): Promise<Solution> {
    let solutionId = solution.solutionNum ? solution.solutionNum : 'new';
    let url = `${this.url}${challengeId}/solutions/${solutionId}/${action}`;
    return this.http.post(url, solution.newSolution)
      .toPromise()
      .then(response => Object.assign(new Solution(), response.json()))
      .catch(SolutionService.handleError);
  }

  executeTests(test: string, code: string): Promise<TestResult[]>{
    return this.http.post(this.url + 'test', { test: test, code: code })
      .toPromise()
      .then(response => response.json().map(tr => Object.assign(new TestResult(), tr)))
      .catch(SolutionService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
