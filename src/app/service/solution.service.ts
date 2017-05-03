import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Http} from "@angular/http";
import {TestResult} from "../model/test-result";
import {Solution} from "../model/solution";

@Injectable()
export class SolutionService {
  private url = 'api/challenges/';

  constructor(
    private http: Http,
  ) { }

  getSolutions(challengeId: number): Promise<Solution[]>{
    return this.http.get(`${this.url}${challengeId}/solutions`)
      .toPromise()
      .then(response => {
        let list = response.json();
        return list.map(item => SolutionService.parseSolution(item));
      })
      .catch(SolutionService.handleError);
  }

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

  private processSolution(challengeId: number, action: string, solution: Solution): Promise<Solution> {
    let solutionId = solution.id ? solution.id : 'new';
    let url = `${this.url}${challengeId}/solutions/${solutionId}/${action}`;
    return this.http.post(url, solution.newSolution)
      .toPromise()
      .then(response => SolutionService.parseSolution(response.json()))
      .catch(SolutionService.handleError);
  }

  public static parseSolution(s: any): Solution {
    let res: Solution = {
      id: s.pk.solutionNum,
      name: 'Решение №' + s.pk.solutionNum,
      status: s.status,
      solution: s.implementation,
      newSolution: s.implementation,
      testResults: [],
    };
    if (s.testResults) s.testResults.forEach(tr => {
      res.testResults.push({
        testName: tr.testName,
        status: tr.status,
        message: tr.message,
      });
    });
    return res;
  }

  testSolutionExample(challenge: Challenge): Promise<TestResult[]>{
    //TODO POST METHOD
    //this.http.post(this.url, challenge)
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as TestResult[])
      .catch(SolutionService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
