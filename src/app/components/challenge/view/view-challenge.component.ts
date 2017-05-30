import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {
  AccessOption, Challenge, ChallengeDetails, ChallengeStatus,
  ChallengeUserDetails
} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import 'rxjs/add/operator/switchMap';
import {AceEditorComponent} from "ng2-ace-editor";
import {Solution} from "../../../model/solution";
import {SolutionService} from "../../../service/solution.service";
import {SolutionStatus} from "../../../model/solutions-status";
import {AlertService} from "../../../service/alert.service";
import {UserService} from "../../../service/user.service";
import {Rating} from "../../../model/rating";
import {User, UserRole} from "../../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-challenge',
  templateUrl: 'view-challenge.component.html',
  styleUrls: ['view-challenge.component.css']
})
export class ViewChallengeComponent implements OnChanges, OnInit {

  @ViewChild(AceEditorComponent)
  solutionEditor : AceEditorComponent;

  @Input()
  challenge: Challenge;
  details: ChallengeDetails;
  userDetails: ChallengeUserDetails;
  solutions: Solution[];
  solution: Solution;
  solutionStatus = SolutionStatus;

  submitted = null;
  user: User;
  testResultsActive = false;

  options = {
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    fontSize: '16px',
  };

  constructor(
    private challengeService: ChallengeService,
    private solutionService: SolutionService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  get canEdit(){
    return this.user && this.user.username == this.challenge.author.username
      || this.user.role > UserRole.USER;
  }

  updateChallenge(challenge: Challenge){
    this.submitted = 'edit';
    this.challengeService.updateChallenge(challenge)
      .then(value => {
        this.submitted = null;
        this.challenge.name = value.name;
        this.challenge.shortDescription = value.shortDescription;
        this.challenge.tags = value.tags;
        this.challenge.details.fullDescription = value.details.fullDescription;
        this.challenge.details.commentAccess = value.details.commentAccess;
        this.challenge.details.shareAccess = value.details.shareAccess;
      });
  }

  deleteChallenge(){
    this.submitted = 'delete';
    this.challengeService.deleteChallenge(this.challenge.id)
      .then(() => this.router.navigate(['/challenges']));
  }

  setSolution(solution: Solution){
    if (this.solution) this.updateText();
    this.solution = solution;
    if (!this.solution.newSolution) this.solution.newSolution = this.solution.implementation;
    this.solutionEditor.setText(this.solution.newSolution);
    this.solutionEditor.updateText();
    this.solutionEditor.getEditor().clearSelection();
  }

  updateText(){
    this.solution.newSolution = this.solutionEditor.text;
  }

  updateBookmark(){
    this.submitted = 'bookmark';
    let bookmark = !this.userDetails.bookmark;
    this.userDetails.bookmark = bookmark;
    this.challengeService.updateBookmark(this.challenge.id, bookmark)
      .then(() => {
        this.submitted = null;
        return bookmark
          ? this.alertService.success('Задача успешно добавлена в закладки')
          : this.alertService.info('Задача успешно удалена из закладок')
      });
  }

  updateUserRating(userRating: Rating){
    this.submitted = 'rating';
    this.userDetails.rating = userRating;
    this.challengeService.updateUserRating(
      this.challenge.id, userRating)
      .then((rating) => {
        this.submitted = null;
        this.alertService.info('Ваша оценка сохранена. Рейтинг и сложность задачи пересчитаны с учетом вашей оценки');
        this.challenge.rating = rating.rating;
        this.challenge.difficulty = rating.difficulty;
      });
  }

  testSolution(){
    this.submitted = "test";
    let thatSolution = this.solution;
    this.solutionService.testSolution(this.challenge.id, this.solution)
        .then(solution => {
          this.submitted = null;
          Object.assign(thatSolution, solution);
          this.setSolution(thatSolution);
          if (solution.status == SolutionStatus.success){
            this.challenge.status = ChallengeStatus.Completed;
          } else if (this.challenge.status == ChallengeStatus.NotStarted){
            this.challenge.status = ChallengeStatus.InProgress;
          }
          this.testResultsActive = true;
        });
  }

  addSolution(){
    this.createNewSolution(this.details.template);
  }

  copySolution(){
    this.createNewSolution(this.solution.implementation);
  }

  createNewSolution(solution: string){
    if (this.solutions.length >= 10){
      this.alertService.warning('Для одной задачи можно хранить не больше 10 решений');
      return;
    }
    this.solution = new Solution();
    this.solution.status = SolutionStatus.created;
    this.solution.newSolution = solution;
    this.solution.implementation = solution;
    this.solutions.push(this.solution);
    this.solutionEditor.setText(this.solution.newSolution);
    this.solutionEditor.updateText();
    this.solutionEditor.getEditor().clearSelection();
  }

  saveSolution(){
    this.submitted = "save";
    let thatSolution = this.solution;
    this.solutionService.saveSolution(this.challenge.id, this.solution)
      .then(solution => {
        this.submitted = null;
        Object.assign(thatSolution, solution);
        this.setSolution(thatSolution);
        if (this.challenge.status == ChallengeStatus.NotStarted){
          this.challenge.status = ChallengeStatus.InProgress;
        }
      });
  }

  shareSolution(comment: string){
    this.submitted = "share";
    this.solutionService.shareSolution(this.challenge.id, this.solution.solutionNum, comment)
      .then(() => this.submitted = null);
  }

  revertChanges(){
    this.solution.newSolution = this.solution.implementation;
    this.solutionEditor.setText(this.solution.newSolution);
    this.solutionEditor.updateText();
    this.solutionEditor.getEditor().clearSelection();
  }

  removeSolution(){
    let index = this.solutions.indexOf(this.solution);
    if (this.solution.status == SolutionStatus.created){
      this.solutions.splice(index, 1);
      if (this.solutions.length == 0) this.addSolution();
      this.setSolution(this.solutions[Math.min(index, this.solutions.length - 1)]);
    } else {
      this.submitted = "remove";
      this.solutionService.deleteSolution(this.challenge.id, this.solution.solutionNum)
        .then(() => {
          this.submitted = null;
          this.solutions.splice(index, 1);
          if (this.solutions.length == 0) this.addSolution();
          this.setSolution(this.solutions[Math.min(index, this.solutions.length - 1)]);
        })
    }
  }

  checkShare(): boolean {
    return (this.details.shareAccess == AccessOption.allow
      || this.details.shareAccess == AccessOption.solvedOnly
      && this.challenge.status == ChallengeStatus.Completed)
    && this.solution.status != SolutionStatus.created
    && this.solution.implementation == this.solution.implementation
  }

  titleShare(): string {
    if (this.details.shareAccess == AccessOption.solvedOnly && this.challenge.status != ChallengeStatus.Completed){
      return 'Вы получите доступ к этой функции после решения задачи';
    } else if (this.solution.status == SolutionStatus.created || this.solution.implementation == this.solution.implementation){
      return 'Решение необходимо проверить или сохранить';
    } else {
      return 'Поделиться решением'
    }
  }

  solutionTabReady = false;
  openSolutionTab(){
    if (this.solutionTabReady) return;
    this.solutionTabReady = true;
    this.solutionEditor.getEditor().selectAll();
    this.solutionEditor.getEditor().clearSelection();
  }

  ngOnChanges(changes: SimpleChanges){
    if (!changes['challenge'].currentValue) return;
    if (this.challenge.details){
      this.setDetails();
    } else {
      this.details = null;
      this.userDetails = null;
      this.solution = null;
      this.challengeService.getChallenge(this.challenge.id)
        .then(challenge => {
          Object.assign(this.challenge, challenge);
          this.setDetails();
        })
    }
  }

  private setDetails() {
    this.details = this.challenge.details;
    if (!this.details.userDetails)
      this.details.userDetails = new ChallengeUserDetails();
    this.userDetails = this.details.userDetails;
    this.solutions = this.userDetails.solutions;
    if (this.solutions.length) {
      this.setSolution(this.solutions[this.solutions.length - 1])
    } else {
      this.addSolution();
    }
  }
}
