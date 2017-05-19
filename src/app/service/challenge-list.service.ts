import { Injectable } from '@angular/core';
import {ChallengeList} from "../model/challenege-list";
import {Http,URLSearchParams} from "@angular/http";
import {AlertService} from "./alert.service";
import {Page} from "../model/page";
import {Challenge} from "../model/challenge";

@Injectable()
export class ChallengeListService {

  url = '/api/challenge-lists';

  constructor(
    private http: Http,
    private alertService: AlertService,
  ) { }

  getChallengeLists(page?: number, search?: string): Promise<Page<ChallengeList>>{
    let params = new URLSearchParams();
    if (page) params.set("page", page.toString());
    if (search) params.set("search", search);
    return this.http.get(this.url, {params})
      .toPromise()
      .then(response => {
        let data = response.json();
        return {
          content: data.content.map(c => Object.assign(new ChallengeList(), c)),
          totalElements: data.totalElements,
          number: data.number,
        }
      })
  }

  getChallengeListsByAuthor(author: string){
    return this.http.get(`${this.url}/author/${author}`)
      .toPromise()
      .then(response => response.json().map(c => Object.assign(new ChallengeList(), c)));
  }

  getChallengeList(id: number): Promise<ChallengeList>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        let data = Object.assign(new ChallengeList(), response.json());
        data.challenges = response.json().challenges.map(c => Object.assign(new Challenge(), c));
        return data;
      });
  }

  addChallengeList(challengeList: ChallengeList): Promise<number>{
    return this.http.post(this.url, {
      name: challengeList.name,
      description: challengeList.description,
      challenges: challengeList.challenges.map(c => c.id),
    })
      .toPromise()
      .then(response => {
        this.alertService.success("Вы успешно создали подборку");
        return Number.parseInt(response.text());
      });
  }
}
