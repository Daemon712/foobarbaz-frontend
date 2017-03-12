import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Comment} from "../model/comment";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertService} from "./alert.service";
import {Revision} from "../model/revision";
import {SharedSolution} from "../model/shared-solution";

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

  getComments(challengeId: number): Promise<Comment[]>{
    //TODO change url to 'api/challenges/:id/comments'
    return this.http.get('api/comments')
      .toPromise()
      .then(response => response.json().data as Comment[])
      .catch(ChallengeService.handleError);
  }

  addComment(challengeId: number, text: string): Promise<Comment>{
    //TODO params should be filled on server
    let comment: Comment = {
      id: 10 + 10000 * Math.random(),
      text: text,
      author: "User",
      date: new Date(),
      likes: 0,
      liked: false,
    };

    //TODO change url to 'api/challenges/:id/comments'
    return this.http.post('api/comments', comment)
      .toPromise()
      .then(response => response.json().data as Comment)
      .catch(ChallengeService.handleError)
  }

  likeComment(challengeId: number, commentId: number, like: boolean): Promise<Comment>{
    //TODO change url to 'api/challenges/:id/comments/:id/like'
    return this.http.get(`api/comments/${commentId}`)
      .toPromise()
      .then(response => {
        //TODO move the logic to server side
        let comment = response.json().data as Comment;
        if (like && !comment.liked){
          comment.likes++;
          comment.liked = true;
        } else if (!like && comment.liked) {
          comment.likes--;
          comment.liked = false;
        }
        return this.http.post('api/comments', comment)
          .toPromise()
          .then(response => comment)
      })
      .catch(ChallengeService.handleError);
  }

  getRevisions(challengeId: number): Promise<Revision[]> {
    //TODO change url to 'api/challenges/:id/revisions'
    return this.http.get('api/revisions')
      .toPromise()
      .then(response => response.json().data as Revision[])
      .catch(ChallengeService.handleError);
  }

  getSharedSolutions(challengeId: number): Promise<SharedSolution[]> {
    //TODO change url to 'api/challenges/:id/sharedSolutions'
    return this.http.get('api/sharedSolutions')
      .toPromise()
      .then(response => response.json().data as SharedSolution[])
      .catch(ChallengeService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
