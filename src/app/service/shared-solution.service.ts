import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {SharedSolution} from "../model/shared-solution";
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

  getSharedSolutionsByUser(username: string): Promise<SharedSolution[]> {
    return this.http.get(`${this.url}user/${username}`)
      .toPromise()
      .then(response => response.json().map(item => Object.assign(new SharedSolution(), item)))
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
          solution.rating++;
          solution.liked = true;
        } else if (!like && solution.liked) {
          solution.rating--;
          solution.liked = false;
        }
        return this.http.post('api/sharedSolutions/' + sharedSolutionId, solution)
          .toPromise()
          .then(response => solution)
      })
      .catch(SharedSolutionService.handleError);
  }

  private static parseSharedSolution(data: any) : SharedSolution{
    let ss = Object.assign(new SharedSolution(), data);
    if (data.challenge) ss.challenge = ChallengeService.parseChallenge(data.challenge);
    return ss;
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
