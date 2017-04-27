import { Component, OnInit } from '@angular/core';
import {SharedSolution} from "../../../model/shared-solution";
import {SharedSolutionService} from "../../../service/shared-solution.service";
import {CommentService} from "../../../service/comment.service";
import {Challenge} from "../../../model/challenge";
import {Comment} from "../../../model/comment";
import {ChallengeService} from "../../../service/challenge.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-challenge-view-page',
  templateUrl: './challenge-view-page.component.html',
})
export class ChallengeViewPageComponent implements OnInit {

  sharedSolutions: SharedSolution[];
  comments: Comment[];
  newComment: string;

  challenge: Challenge;

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private commentService: CommentService,
    private sharedSolutionService: SharedSolutionService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
      });
  }

  sendComment(){
    this.commentService.addComment(this.newComment, this.challenge.id)
      .then(comment => this.comments.push(comment));
    this.newComment = null;
  }

  commentLiked(comment: Comment){
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? 1 : -1;
    this.commentService.likeComment(comment.id, !comment.liked)
      .then(newComment => {
        comment.liked = newComment.liked;
        comment.likes = newComment.likes;
      });
  }

  loadComments(){
    this.commentService.getComments(this.challenge.id)
      .then(comments => this.comments = comments);
  }

  loadSolutions(){
    this.sharedSolutionService.getSharedSolutions(this.challenge.id)
      .then(solutions => this.sharedSolutions = solutions);
  }
}
