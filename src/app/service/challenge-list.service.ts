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
      .catch((e) => this.handleError(e));
  }

  getChallengeListsByAuthor(author: string){
    return this.http.get(`${this.url}/author/${author}`)
      .toPromise()
      .then(response => response.json().map(c => Object.assign(new ChallengeList(), c)))
      .catch((e) => this.handleError(e));
  }

  getChallengeList(id: number): Promise<ChallengeList>{
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        if (response.status == 404){
          this.alertService.warning(`Подборка <b>#${id}</b> не найдена`);
          return null;
        }

        let data = Object.assign(new ChallengeList(), response.json());
        data.challenges = response.json().challenges.map(c => Object.assign(new Challenge(), c));
        return data;
      })
      .catch((e) => this.handleError(e));
  }

  getRandomChallengeList(): Promise<ChallengeList>{
    return this.http.get(`${this.url}/random`)
      .toPromise()
      .then(response => Object.assign(new ChallengeList(), response.json()))
      .catch((e) => this.handleError(e));
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
      })
      .catch((e) => this.handleError(e));
  }

  updateChallengeList(challengeList: ChallengeList) : Promise<ChallengeList>{
    return this.http.post(`${this.url}/${challengeList.id}`, {
      name: challengeList.name,
      description: challengeList.description,
      challenges: challengeList.challenges.map(c => c.id),
    })
      .toPromise()
      .then((response) => {
        this.alertService.success("Подборка успешно обновлена");
        return Object.assign(new ChallengeList(), response.json());
      })
      .catch((e) => this.handleError(e));
  }

  deleteChallengeList(challengeListId: number): Promise<void>{
    return this.http.delete(`${this.url}/${challengeListId}`)
      .toPromise()
      .then(() => this.alertService.success("Подборка успешно удалена"))
      .catch((e) => this.handleError(e));
  }

  likeChallengeList(listId: number, like: boolean): Promise<number>{
    return this.http.post(`${this.url}/${listId}/like`, like)
      .toPromise()
      .then(response => Number.parseInt(response.text()))
      .catch((e) => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.alertService.danger(error.message || error);
    return Promise.reject(error.message || error);
  }
}
