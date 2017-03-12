import {Component, OnInit, ViewChild} from '@angular/core';
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {Comment} from "../../../model/comment";
import {AceEditorComponent} from "ng2-ace-editor";

@Component({
  selector: 'app-view-challenge',
  templateUrl: 'view-challenge.component.html',
  styleUrls: ['view-challenge.component.css']
})
export class ViewChallengeComponent implements OnInit {

  @ViewChild('editor')
  editor : AceEditorComponent;

  challenge: Challenge;
  challengeStatus = ChallengeStatus;
  comments: Comment[];
  newComment: string;

  options = {
    fontSize: '18px'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
        this.editor.setText(challenge.solutionTemplate);
        this.editor.getEditor().clearSelection();
      });
  }

  sendComment(){
    this.challengeService.addComment(this.newComment);
    this.newComment = null;
  }

  loadComments(){
    this.challengeService.getComments(this.challenge.id)
      .then(comments => this.comments = comments);
  }
}
