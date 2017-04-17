import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Http} from "@angular/http";
import {TestResult} from "../model/test-result";
import {ChallengeService} from "./challenge.service";
import {Revision} from "../model/revision";

@Injectable()
export class TestSolutionService {
  private url = 'api/tests';

  constructor(
    private http: Http,
    private challengeService: ChallengeService,
  ) { }

  testSolution(challengeId: number, solution: string, prevSolutionId?: number): Promise<Revision>{
    //TODO ONE POST METHOD
    return this.http.get(this.url)
      .toPromise()
      .then(response => {
        let testResults = response.json().data as TestResult[];
        let promise: Promise<Revision> = prevSolutionId ?
            this.challengeService.updateRevision(challengeId, prevSolutionId, solution) :
            this.challengeService.addRevision(challengeId, solution);

        return promise.then(revision => {
          revision.testResults = testResults;
          return revision;
        });
      })
      .catch(TestSolutionService.handleError);
  }

  testSolutionExample(challenge: Challenge): Promise<TestResult[]>{
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
