import {Component, OnInit, ViewChild} from '@angular/core';
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {Comment} from "../../../model/comment";
import {AceEditorComponent} from "ng2-ace-editor";
import {Revision} from "../../../model/revision";
import {SharedSolution} from "../../../model/shared-solution";
import {TestSolutionService} from "../../../service/test-solution.service";
import {SolutionStatus} from "../../../model/solutions-status";

@Component({
  selector: 'app-view-challenge',
  templateUrl: 'view-challenge.component.html',
  styleUrls: ['view-challenge.component.css']
})
export class ViewChallengeComponent implements OnInit {

  @ViewChild(AceEditorComponent)
  solutionEditor : AceEditorComponent;

  challenge: Challenge;
  challengeStatus = ChallengeStatus;
  revisions: Revision[];
  revision: Revision;
  solutionStatus = SolutionStatus;

  sharedSolutions: SharedSolution[];
  comments: Comment[];
  newComment: string;

  submitted = false;
  testResultsActive = false;

  options = {
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    fontSize: '16px',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private testSolutionService: TestSolutionService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
        this.revision = new Revision(-1, 'Новое Решение',  SolutionStatus.created, null, challenge.solutionTemplate);
        this.revisions = [this.revision];
        this.loadComments();
        this.loadRevisions();
        this.loadSolutions();
      });
  }

  openRevision(revision: Revision){
    this.revision = revision;
  }

  testSolution(){
    this.submitted = true;
    this.testSolutionService.testChallenge(this.challenge.id, this.revision.solution)
      .then(revision => {
        this.submitted = false;
        if (revision){
          this.revisions.push(revision);
          this.revision = revision;
          this.testResultsActive = true;
        }
      });
  }

  solutionTabReady = false;
  openSolutionTab(){
    if (this.solutionTabReady) return;
    this.solutionTabReady = true;
    this.solutionEditor.getEditor().clearSelection();
  }

  sendComment(){
    this.challengeService.addComment(this.challenge.id, this.newComment)
      .then(comment => this.comments.push(comment));
    this.newComment = null;
  }

  commentLiked(comment: Comment){
    this.challengeService.likeComment(this.challenge.id, comment.id, !comment.liked)
      .then(newComment => {
        comment.liked = newComment.liked;
        comment.likes = newComment.likes;
      });
  }

  loadComments(){
    this.challengeService.getComments(this.challenge.id)
      .then(comments => this.comments = comments);
  }

  loadRevisions(){
    this.challengeService.getRevisions(this.challenge.id)
      .then(revisions => revisions.forEach(r => this.revisions.push(r)))
  }

  loadSolutions(){
    this.challengeService.getSharedSolutions(this.challenge.id)
      .then(solutions => this.sharedSolutions = solutions);
  }
}
