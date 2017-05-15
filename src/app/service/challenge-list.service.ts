import { Injectable } from '@angular/core';
import {ChallengeList} from "../model/challenege-list";
import {Http} from "@angular/http";
import {AlertService} from "./alert.service";

@Injectable()
export class ChallengeListService {

  url = '/api/challenge-list';

  constructor(
    private http: Http,
    private alertService: AlertService,
  ) { }

  getChallengeLists(): Promise<ChallengeList[]>{
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as ChallengeList[]);
  }

  getChallengeListsByAuthor(author: string){
    return this.http.get(`${this.url}?author=${author}`)
      .toPromise()
      .then(response => response.json().data as ChallengeList[]);
  }

  getChallengeList(id: number): Promise<ChallengeList>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        return response.json().data as ChallengeList;
      });
  }

  addChallengeList(challengeList: ChallengeList): Promise<ChallengeList>{
    return this.http.post(this.url, challengeList)
      .toPromise()
      .then(response => {
        let list = response.json().data as ChallengeList;
        if (list) this.alertService.success("Вы успешно создали задачу");
        else this.alertService.warning("Не удалось создать задачу");
        return list;
      });
  }
}
