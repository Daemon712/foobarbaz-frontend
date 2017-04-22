import { Injectable } from '@angular/core';
import {Challenge} from "../model/challenge";
import {Comment} from "../model/comment";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertService} from "./alert.service";
import {Revision} from "../model/revision";
import {SharedSolution} from "../model/shared-solution";
import {SolutionStatus} from "../model/solutions-status";

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

  getChallengesByAuthor(author: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}?author=${author}`)
      .toPromise()
      .then(response => response.json().data as Challenge[])
      .catch(ChallengeService.handleError);
  }

  getBookmarksByUser(username: string): Promise<Challenge[]>{
    return this.http.get(`${this.url}?bookmark=true`)
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
        let challenge = response.json().data as Challenge;
        if (challenge) this.alertService.success("Вы успешно создали задачу");
        else this.alertService.warning("Не удалось создать задачу");
        return challenge;
      })
      .catch(ChallengeService.handleError);
  }

  updateBookmark(challengeId: number, bookmark: boolean): Promise<Challenge>{
    //TODO change url to 'api/challenges/:id//bookmark'
    return this.getChallenge(challengeId)
      .then(challenge => {
        challenge.bookmark = bookmark;
        return this.http.post(`${this.url}/${challengeId}`, challenge)
          .toPromise()
          .then(response => challenge);
      });
  }

  updateUserRating(challengeId: number, rating: number, difficulty: number): Promise<Challenge>{
    //TODO change url to 'api/challenges/:id/rating'
    console.log(rating, difficulty);
    return this.getChallenge(challengeId)
      .then(challenge => {
        challenge.userRating = rating;
        challenge.userDifficulty = difficulty;
        return this.http.post(`${this.url}/${challengeId}`, challenge)
          .toPromise()
          .then(response => challenge);
      });
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

  addRevision(challengeId: number, solution: string): Promise<Revision> {
    let n = Math.round(6 + Math.random() * 20);
    let rev = new Revision(
      n,
      'Решение №' + n,
      Math.random() < 0.5 ? SolutionStatus.success : SolutionStatus.failed,
      new Date(),
      solution
    );
    //TODO change url to 'api/challenges/:id/revisions'
    return this.http.post('api/revisions', rev)
      .toPromise()
      .then(response => this.handleSolutionResponse(response))
      .catch(ChallengeService.handleError);
  }

  updateRevision(challengeId: number, revisionId: number, solution: string): Promise<Revision> {
    //TODO fill params on server-side
    let revision = new Revision(
      revisionId,
      'Решение №' + revisionId,
      Math.random() < 0.5 ? SolutionStatus.success : SolutionStatus.failed,
      new Date(),
      solution
    );
    //TODO change url to 'api/challenges/:id/revisions'
    return this.http.put(`api/revisions/${revisionId}`, revision)
      .toPromise()
      .then(() => this.http.get(`api/revisions/${revisionId}`)
        .toPromise()
        .then(response => this.handleSolutionResponse(response)))
      .catch(ChallengeService.handleError);
  }

  deleteRevision(challengeId: number, revisionId: number): Promise<void> {
    //TODO change url to 'api/challenges/:id/revisions'
    return this.http.delete(`api/revisions/${revisionId}`)
      .toPromise()
      .then(() => {})
      .catch(ChallengeService.handleError);
  }

  private handleSolutionResponse(response){
    let result = response.json().data as Revision;
    if (result) {
      switch (result.status) {
        case SolutionStatus.empty: this.alertService.info("Решение успешно сохранено"); break;
        case SolutionStatus.success: this.alertService.success("Задача успешно решена!"); break;
        default: this.alertService.warning("Решение не прошло все тесты..."); break;
      }
    }
    else this.alertService.danger("Не удалось протестировать задачу");
    return result;
  }

  getSharedSolutions(challengeId: number): Promise<SharedSolution[]> {
    //TODO change url to 'api/challenges/:id/sharedSolutions'
    return this.http.get('api/sharedSolutions?challengeId=' + challengeId)
      .toPromise()
      .then(response => response.json().data as SharedSolution[])
      .catch(ChallengeService.handleError);
  }

  getSharedSolution(challengeId: number, sharedSolutionId: number): Promise<SharedSolution> {
    //TODO change url to 'api/challenges/:id/solution/:share_id/'
    return this.http.get(`api/sharedSolutions?challengeId=${challengeId}&id=${sharedSolutionId}`)
      .toPromise()
      .then(response => response.json().data[0] as SharedSolution)
      .catch(ChallengeService.handleError);
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
      .catch(ChallengeService.handleError);
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
        console.log(response);
        let newSol = response.json().data as SharedSolution;
        this.alertService.success(`Вы успешно поделились своим решением: <a href='/challenges/${challengeId}/solutions/${newSol.id}'>${newSol.comment}</a>`);
        return newSol;
      });
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
