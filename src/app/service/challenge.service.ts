import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertService} from "./alert.service";

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
        .then(response => response.json().data as Challenge[])
        .catch(ChallengeService.handleError);
  }

  getChallenge(id: number): Promise<Challenge>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => response.json().data as Challenge)
      .catch(ChallengeService.handleError);
  }

  createChallenge(challenge: Challenge): Promise<Challenge>{
    //TODO PARAMETERS SHOULD BE FILLED ON SERVER
    challenge.created = new Date();
    challenge.author = "Привет";

    return this.http.post(this.url, challenge)
      .toPromise()
      .then(response => {
        challenge = response.json().data as Challenge;
        if (challenge) this.alertService.success("Вы успешно создали задачу");
        else this.alertService.warning("Не удалось создать задачу");
        return challenge;
      })
      .catch(ChallengeService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
