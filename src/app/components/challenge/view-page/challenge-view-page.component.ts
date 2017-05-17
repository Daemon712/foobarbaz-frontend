import { Component, OnInit } from '@angular/core';
import {SharedSolution} from "../../../model/shared-solution";
import {SharedSolutionService} from "../../../service/shared-solution.service";
import {ChallengeCommentService} from "../../../service/comment.service";
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
  commentsAllowed = false;
  shareAllowed = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private commentService: ChallengeCommentService,
    private sharedSolutionService: SharedSolutionService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authorized = this.userService.user != null;
    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
        this.commentsAllowed = this.checkAccess(challenge.details.commentAccess);
        this.shareAllowed = this.checkAccess(challenge.details.shareAccess);
        this.loadComments();
        this.loadSolutions();
      });
  }

  sendComment(){
    this.commentService.addComment(this.challenge.id, this.newComment)
      .then(comment => this.comments.push(comment));
    this.newComment = null;
  }

  commentLiked(comment: Comment){
    comment.liked = !comment.liked;
    this.commentService.likeComment(comment.id, comment.liked)
      .then(likes => comment.rating = likes);
  }

  loadComments(){
    if (!this.challenge || !this.commentsAllowed) return;

    this.commentService.getComments(this.challenge.id)
      .then(comments => this.comments = comments);
  }

  loadSolutions(){
    if (!this.challenge || !this.shareAllowed) return;

    this.sharedSolutionService.getSharedSolutions(this.challenge.id)
      .then(solutions => this.sharedSolutions = solutions);
  }

  //noinspection JSMethodCanBeStatic
  accessDeny(option: AccessOption): boolean {
    return option == AccessOption.deny;
  }

  accessOnlySolved(option: AccessOption): boolean {
    return option == AccessOption.solvedOnly && this.challenge.status != ChallengeStatus.Completed
  }

  checkAccess(option: AccessOption): boolean {
    return !this.accessDeny(option) && !this.accessOnlySolved(option);
  }
}
