import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {SharedSolution} from "../model/shared-solution";
import {SolutionStatus} from "../model/solutions-status";
import {AlertService} from "./alert.service";

@Injectable()
export class SharedSolutionService {

  constructor(
    private http: Http,
    private alertService: AlertService,
  ) { }

  getSharedSolutions(challengeId: number): Promise<SharedSolution[]> {
    //TODO change url to 'api/challenges/:id/sharedSolutions'
    return this.http.get('api/sharedSolutions?challengeId=' + challengeId)
      .toPromise()
      .then(response => response.json().data as SharedSolution[])
      .catch(SharedSolutionService.handleError);
  }

  getSharedSolution(challengeId: number, sharedSolutionId: number): Promise<SharedSolution> {
    //TODO change url to 'api/challenges/:id/solution/:share_id/'
    return this.http.get(`api/sharedSolutions?challengeId=${challengeId}&id=${sharedSolutionId}`)
      .toPromise()
      .then(response => response.json().data[0] as SharedSolution)
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

  addSharedSolution(challengeId: number, solutionId: number, comment: string): Promise<SharedSolution>{
    //TODO change url to 'api/challenges/:id/solution/1/share/'
    let solution = new SharedSolution();
    solution.id = 20 + solutionId;
    solution.date = new Date();
    solution.comment = comment;
    solution.author = 'Privet';
    solution.status = Math.random() > 0.5 ? SolutionStatus.success : SolutionStatus.failed;
    solution.likes = 0;
    solution.liked = false;

    return this.http.post('api/sharedSolutions', solution)
      .toPromise()
      .then(response => {
        let newSol = response.json().data as SharedSolution;
        this.alertService.success(`Вы успешно поделились своим решением: <a href='/challenges/${challengeId}/solutions/${newSol.id}'>${newSol.comment}</a>`);
        return newSol;
      })
      .catch(SharedSolutionService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
