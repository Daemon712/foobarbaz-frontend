import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Comment} from "../model/comment";

@Injectable()
export class CommentService {

  constructor(
    private http: Http,
  ) { }

  getComments(challengeId: number, sharedSolId?: number): Promise<Comment[]>{
    //TODO change url to 'api/challenges/:id/comments'
    return this.http.get(`api/comments?challengeId=${challengeId}&sharedSolId=${sharedSolId}`)
      .toPromise()
      .then(response => response.json().data as Comment[])
      .catch(CommentService.handleError);
  }

  addComment(text: string, challengeId: number, sharedSolId?: number): Promise<Comment>{
    //TODO params should be filled on server
    let comment = {
      id: 10 + 10000 * Math.random(),
      challengeId: challengeId,
      sharedSolId: sharedSolId,
      text: text,
      date: new Date(),
      likes: 0,
      liked: false,
    };

    //TODO change url to 'api/challenges/:id/comments'
    return this.http.post('api/comments', comment)
      .toPromise()
      .then(response => response.json().data as Comment)
      .catch(CommentService.handleError)
  }

    likeComment(commentId: number, like: boolean): Promise<Comment>{
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
      .catch(CommentService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
