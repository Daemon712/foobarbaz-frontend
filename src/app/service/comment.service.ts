import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Comment} from "../model/comment";

@Injectable()
export class CommentService {
  url = 'api/comments';
  //TODO change url to 'api/challenges/:id/comments'

  constructor(
    private http: Http,
  ) { }

  getChallengeComments(challengeId: number): Promise<Comment[]>{
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as Comment[]);
  }

  addChallengeComment(text: string): Promise<Comment>{
    //TODO params should be filled on server

    let comment: Comment = {
      id: 10 + 10000 * Math.random(),
      text: text,
      author: "User",
      date: new Date(),
    };

    return this.http.post(this.url, comment)
      .toPromise()
      .then(response => response.json().data as Comment);
  }
}
