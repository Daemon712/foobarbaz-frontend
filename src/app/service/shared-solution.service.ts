import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {SharedSolution} from "../model/shared-solution";
import {SolutionService} from "./solution.service";
import {ChallengeService} from "./challenge.service";

@Injectable()
export class SharedSolutionService {

  url = 'api/shared-solutions/';

  constructor(
    private http: Http,
  ) { }

  getSharedSolutions(challengeId: number): Promise<SharedSolution[]> {
    return this.http.get(`${this.url}challenge/${challengeId}`)
      .toPromise()
      .then(response => response.json().map(item => SharedSolutionService.parseSharedSolution(item)))
      .catch(SharedSolutionService.handleError);
  }

  getSharedSolution(sharedSolutionId: number): Promise<SharedSolution> {
    return this.http.get(`${this.url}${sharedSolutionId}`)
      .toPromise()
      .then(response => SharedSolutionService.parseSharedSolution(response.json()))
      .catch(SharedSolutionService.handleError);
  }

  likeSharedSolution(challengeId: number, sharedSolutionId: number, like: boolean): Promise<SharedSolution>{
    //TODO change url to 'api/challenges/:id/solution/:id/like'
    return this.http.get(`api/sharedSolutions?challengeId=${challengeId}&id=${sharedSolutionId}`)
      .toPromise()
      .then(response => {
        //TODO move the logic to server side
        let solution = response.json().data[0] as SharedSolution;
        if (like && !solution.liked){
          solution.likes++;
          solution.liked = true;
        } else if (!like && solution.liked) {
          solution.likes--;
          solution.liked = false;
        }
        return this.http.post('api/sharedSolutions/' + sharedSolutionId, solution)
          .toPromise()
          .then(response => solution)
      })
      .catch(SharedSolutionService.handleError);
  }

  private static parseSharedSolution(data: any) : SharedSolution{
    console.log(data);
    return {
      id: data.sharedSolutionId,
      challenge: data.challenge ? ChallengeService.parseChallenge(data.challenge) : null,
      author: {
        username: data.author.username,
        name: data.author.username,
      },
      comment: data.comment,
      text: data.implementation,
      date: data.created,
      status: data.status,
      likes: data.rating,
      testResults: SolutionService.parseTestResults(data.testResults),
    } as SharedSolution;
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
