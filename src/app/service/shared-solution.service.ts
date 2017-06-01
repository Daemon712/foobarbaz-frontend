import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {SharedSolution} from "../model/shared-solution";
import {ChallengeService} from "./challenge.service";
import {AlertService} from "./alert.service";

@Injectable()
export class SharedSolutionService {

  url = 'api/shared-solutions/';

  constructor(
    private http: Http,
    private alertService: AlertService,
  ) { }

  getSharedSolutions(challengeId: number): Promise<SharedSolution[]> {
    return this.http.get(`${this.url}challenge/${challengeId}`)
      .toPromise()
      .then(response => response.json().map(item => Object.assign(new SharedSolution(), item)))
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
      .then(response => {
        if (response.status == 404){
          this.alertService.warning(`Решение <b>#${sharedSolutionId}</b> не найдено`);
          return null;
        }
        return SharedSolutionService.parseSharedSolution(response.json())
      })
      .catch(SharedSolutionService.handleError);
  }

  likeSharedSolution(sharedSolutionId: number, like: boolean): Promise<number>{
    return this.http.post(`${this.url}${sharedSolutionId}/like`, like)
      .toPromise()
      .then(response => {
        return Number.parseInt(response.text())
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
