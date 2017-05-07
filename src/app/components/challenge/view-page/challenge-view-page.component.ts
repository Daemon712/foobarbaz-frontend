import { Component, OnInit } from '@angular/core';
import {SharedSolution} from "../../../model/shared-solution";
import {SharedSolutionService} from "../../../service/shared-solution.service";
import {CommentService} from "../../../service/comment.service";
import {AccessOption, Challenge, ChallengeStatus} from "../../../model/challenge";
import {Comment} from "../../../model/comment";
import {ChallengeService} from "../../../service/challenge.service";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-challenge-view-page',
  templateUrl: './challenge-view-page.component.html',
})
export class ChallengeViewPageComponent implements OnInit {

  challenge: Challenge;
  sharedSolutions: SharedSolution[];
  comments: Comment[];
  newComment: string;
  authorized = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private commentService: CommentService,
    private sharedSolutionService: SharedSolutionService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authorized = this.userService.user != null;
    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
        this.loadComments();
        this.loadSolutions();
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
    // this.commentService.getComments(this.challenge.id)
    //   .then(comments => this.comments = comments);
  }

  loadSolutions(){
    // this.sharedSolutionService.getSharedSolutions(this.challenge.id)
    //   .then(solutions => this.sharedSolutions = solutions);
  }

  //noinspection JSMethodCanBeStatic
  accessDeny(option: AccessOption): boolean {
    return option == AccessOption.allow;
  }

  accessOnlySolved(option: AccessOption): boolean {
    return option == AccessOption.solvedOnly && this.challenge.status == ChallengeStatus.Completed
  }

  checkAccess(option: AccessOption): boolean {
    return this.accessDeny(option) || this.accessOnlySolved(option);
  }
}
