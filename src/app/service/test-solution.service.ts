import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Http} from "@angular/http";
import {TestResult} from "../model/test-result";

@Injectable()
export class TestSolutionService {
  private url = 'api/tests';

  constructor(
    private http: Http,
  ) { }

  testChallenge(challengeId: number, solution: string): Promise<TestResult[]>{
    //TODO POST METHOD
    //this.http.post(this.url, {challengeId: challengeId, solution: solution})
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as TestResult[])
      .catch(TestSolutionService.handleError);
  }

  testNewChallenge(challenge: Challenge): Promise<TestResult[]>{
    //TODO POST METHOD
    //this.http.post(this.url, challenge)
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as TestResult[])
      .catch(TestSolutionService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
