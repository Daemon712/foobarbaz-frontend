import { Component, OnInit } from '@angular/core';
import {Challenge} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {CommentService} from "../../../service/comment.service";
import {Comment} from "../../../model/comment";

@Component({
  selector: 'app-view-challenge',
  templateUrl: 'view-challenge.component.html',
  styleUrls: ['view-challenge.component.css']
})
export class ViewChallengeComponent implements OnInit {

  challenge: Challenge;
  comments: Comment[];
  options = {
    fontSize: '18px'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
      .subscribe((challenge: Challenge) => this.challenge = challenge);
  }

  openComments(){
    this.commentService.getChallengeComments(this.challenge.id)
      .then(comments => this.comments = comments);
  }
}
