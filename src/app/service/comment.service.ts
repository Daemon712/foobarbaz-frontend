import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Comment} from "../model/comment";

abstract class CommentService {
  constructor(
    private http: Http,
    private url,
  ) { }

  getComments(challengeId: number): Promise<Comment[]>{
    return this.http.get(`${this.url}?parentId=${challengeId}`)
      .toPromise()
      .then(response => response.json().map(c => Object.assign(new Comment(), c)))
      .catch(CommentService.handleError);
  }

  addComment(parentId: number, text: string): Promise<Comment>{
    return this.http.post(this.url, {parentId, text})
      .toPromise()
      .then(response => Object.assign(new Comment, response.json()))
      .catch(CommentService.handleError)
  }

  updateComment(commentId: number, text: string): Promise<Comment>{
    return this.http.post(`${this.url}/${commentId}`, text)
      .toPromise()
      .then(response => Object.assign(new Comment(), response.json()))
      .catch(CommentService.handleError);
  }

  deleteComment(commentId: number): Promise<void>{
    return this.http.delete(`${this.url}/${commentId}`)
      .toPromise()
      .then(() => {})
      .catch(CommentService.handleError);
  }

  likeComment(commentId: number, like: boolean): Promise<number>{
    return this.http.post(`${this.url}/${commentId}/like`, like)
      .toPromise()
      .then(response => Number.parseInt(response.text()))
      .catch(CommentService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

@Injectable()
export class ChallengeCommentService extends CommentService {
  constructor(http: Http) {
    super(http, 'api/comments/challenge');
  }
}

@Injectable()
export class SolutionCommentService extends CommentService {
  constructor(http: Http) {
    super(http, 'api/comments/solution');
  }
}
