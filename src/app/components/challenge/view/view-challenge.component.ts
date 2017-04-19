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
import {AlertService} from "../../../service/alert.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-view-challenge',
  templateUrl: 'view-challenge.component.html',
  styleUrls: ['view-challenge.component.css']
})
export class ViewChallengeComponent implements OnInit {

  @ViewChild(AceEditorComponent)
  solutionEditor : AceEditorComponent;

  @ViewChild('ratingModal')
  ratingModal: ModalDirective;

  challenge: Challenge;
  challengeStatus = ChallengeStatus;
  revisions: Revision[] = [];
  revision: Revision;
  solutionStatus = SolutionStatus;

  sharedSolutions: SharedSolution[];
  comments: Comment[];
  newComment: string;
  userRating = {
    rating: 0,
    difficulty: 0,
  };

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
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
      .subscribe((challenge: Challenge) => {
        this.challenge = challenge;
        this.userRating = {
          rating: this.challenge.userRating,
          difficulty: this.challenge.userDifficulty,
        };
        this.addSolution();
        this.loadComments();
        this.loadRevisions();
        this.loadSolutions();
      });
  }

  updateBookmark(){
    this.challenge.bookmark = !this.challenge.bookmark;
    this.challengeService.updateBookmark(this.challenge.id, this.challenge.bookmark)
      .then((challenge) => this.challenge.bookmark = challenge.bookmark);
  }

  updateUserRating(){
    this.challengeService.updateUserRating(
      this.challenge.id,
      (this.userRating.rating - 1) / 4,
      (this.userRating.difficulty - 1) / 4,
    )
      .then((challenge) => {
        this.challenge.userRating = challenge.userRating;
        this.challenge.userDifficulty = challenge.userDifficulty;
        this.userRating = {
          rating: challenge.userRating,
          difficulty: challenge.userDifficulty,
        };
      });
    this.ratingModal.hide();
  }

  closeUserRating(){
    this.userRating = {
      rating: this.challenge.userRating,
      difficulty: this.challenge.userDifficulty,
    };
    this.ratingModal.hide();
  }

  openRevision(revision: Revision){
    this.revision = revision;
  }

  testSolution(){
    this.submitted = true;
    let thatSolution = this.revision;
    let promise: Promise<Revision> = this.revision.status === SolutionStatus.created ?
      this.testSolutionService.testSolution(this.challenge.id, this.revision.newSolution) :
      this.testSolutionService.testSolution(this.challenge.id, this.revision.newSolution, this.revision.id);

    promise.then(revision => {
      this.submitted = false;
      if (revision){
        Object.assign(thatSolution, revision);
        this.revision = revision;
        this.testResultsActive = true;
      }
    });
  }

  addSolution(){
    if (this.revisions.length >= 10){
      this.alertService.warning('Для одной задачи можно хранить не больше 10 решений');
      return;
    }
    this.revision = new Revision(
      -1-this.revisions.length,
      'Новое Решение',
      SolutionStatus.created,
      null,
      this.challenge.solutionTemplate
    );
    this.revisions.push(this.revision);
  }

  copySolution(){
    if (this.revisions.length >= 10){
      this.alertService.warning('Для одной задачи можно хранить не больше 10 решений');
      return;
    }
    let solution = this.revision.newSolution;
    this.revision = new Revision(
      -1-this.revisions.length,
      'Новое Решение',
      SolutionStatus.created,
      null,
      solution
    );
    this.revisions.push(this.revision);
  }

  saveSolution(){
    this.submitted = true;
    let thatSolution = this.revision;
    let promise: Promise<Revision> = this.revision.status === SolutionStatus.created ?
      this.challengeService.addRevision(this.challenge.id, this.revision.newSolution) :
      this.challengeService.updateRevision(this.challenge.id, this.revision.id, this.revision.newSolution);

    promise.then(revision => {
      this.submitted = false;
      if (revision){
        Object.assign(thatSolution, revision);
        this.revision = revision;
      }
    });
  }

  shareSolution(){
    console.log('share solution:\n' + this.revision.newSolution);
  }

  revertChanges(){
    this.revision.newSolution = this.revision.solution;
  }

  removeSolution(){
    let index = this.revisions.indexOf(this.revision);
    if (this.revision.status == SolutionStatus.created){
      this.revisions.splice(index, 1);
      if (this.revisions.length == 0) this.addSolution();
      this.revision = this.revisions[Math.min(index, this.revisions.length - 1)];
    } else {
      this.challengeService.deleteRevision(this.challenge.id, this.revision.id)
        .then(() => {
          this.revisions.splice(index, 1);
          if (this.revisions.length == 0) this.addSolution();
          this.revision = this.revisions[Math.min(index, this.revisions.length - 1)];
        })
    }
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
      .then(revisions => {
        if (revisions && revisions.length > 0) {
          this.revisions = revisions;
          this.revision = revisions[0];
        }
      });
  }

  loadSolutions(){
    this.challengeService.getSharedSolutions(this.challenge.id)
      .then(solutions => this.sharedSolutions = solutions);
  }
}
