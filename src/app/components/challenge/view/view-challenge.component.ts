import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AccessOption, Challenge, ChallengeStatus} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import 'rxjs/add/operator/switchMap';
import {AceEditorComponent} from "ng2-ace-editor";
import {Solution} from "../../../model/solution";
import {SolutionService} from "../../../service/solution.service";
import {SolutionStatus} from "../../../model/solutions-status";
import {AlertService} from "../../../service/alert.service";
import {SharedSolutionService} from "../../../service/shared-solution.service";
import {UserService} from "../../../service/user.service";
import {Rating} from "../../../model/rating";

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
  solution: Solution;
  solutionStatus = SolutionStatus;

  submitted = false;
  authorized = false;
  testResultsActive = false;

  options = {
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    fontSize: '16px',
  };

  constructor(
    private challengeService: ChallengeService,
    private sharedSolutionService: SharedSolutionService,
    private solutionService: SolutionService,
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.authorized = this.userService.user != null;
  }

  setSolution(solution: Solution){
    if (this.solution) this.updateText();
    this.solution = solution;
    this.solutionEditor.setText(this.solution.newSolution);
    this.solutionEditor.updateText();
    this.solutionEditor.getEditor().clearSelection();
  }

  updateText(){
    this.solution.newSolution = this.solutionEditor.text;
  }

  updateBookmark(){
    let bookmark = !this.challenge.bookmark;
    this.challenge.bookmark = bookmark;
    this.challengeService.updateBookmark(this.challenge.id, bookmark)
      .then(() => bookmark
              ? this.alertService.success('Задача успешно добавлена в закладки')
              : this.alertService.info('Задача успешно удалена из закладок'));
  }

  updateUserRating(userRating: Rating){
    this.challenge.userRating = userRating;
    this.challengeService.updateUserRating(
      this.challenge.id, userRating)
      .then((rating) => {
        this.alertService.info('Ваша оценка сохранена. Рейтинг и сложность задачи пересчитаны с учетом вашей оценки');
        this.challenge.rating = rating.rating;
        this.challenge.difficulty = rating.difficulty;
      });
  }

  testSolution(){
    this.submitted = true;
    let thatSolution = this.solution;
    this.solutionService.testSolution(this.challenge.id, this.solution)
        .then(solution => {
          this.submitted = false;
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
    this.createNewSolution(this.challenge.solutionTemplate);
  }

  copySolution(){
    this.createNewSolution(this.solution.newSolution);
  }

  createNewSolution(solution: string){
    if (this.challenge.solutions.length >= 10){
      this.alertService.warning('Для одной задачи можно хранить не больше 10 решений');
      return;
    }
    this.solution = new Solution(null, 'Новое Решение', SolutionStatus.created, solution);
    this.challenge.solutions.push(this.solution);
    this.solutionEditor.setText(this.solution.newSolution);
    this.solutionEditor.updateText();
    this.solutionEditor.getEditor().clearSelection();
  }

  saveSolution(){
    this.submitted = true;
    let thatSolution = this.solution;
    this.solutionService.saveSolution(this.challenge.id, this.solution)
      .then(solution => {
        this.submitted = false;
        Object.assign(thatSolution, solution);
        this.setSolution(solution);
        if (this.challenge.status == ChallengeStatus.NotStarted){
          this.challenge.status = ChallengeStatus.InProgress;
        }
      });
  }

  shareSolution(comment: string){
    this.sharedSolutionService.addSharedSolution(this.challenge.id, this.solution.id, comment);
  }

  revertChanges(){
    console.log(this.solution.newSolution);
    console.log(this.solution.solution);
    this.solution.newSolution = this.solution.solution;
    this.setSolution(this.solution);
  }

  removeSolution(){
    let index = this.challenge.solutions.indexOf(this.solution);
    if (this.solution.status == SolutionStatus.created){
      this.challenge.solutions.splice(index, 1);
      if (this.challenge.solutions.length == 0) this.addSolution();
      this.setSolution(this.challenge.solutions[Math.min(index, this.challenge.solutions.length - 1)]);
    } else {
      this.solutionService.deleteSolution(this.challenge.id, this.solution.id)
        .then(() => {
          this.challenge.solutions.splice(index, 1);
          if (this.challenge.solutions.length == 0) this.addSolution();
          this.setSolution(this.challenge.solutions[Math.min(index, this.challenge.solutions.length - 1)]);
        })
    }
  }

  checkShare(): boolean {
    return (this.challenge.shareAccess == AccessOption.allow
      || this.challenge.shareAccess == AccessOption.solvedOnly
      && this.challenge.status == ChallengeStatus.Completed)
    && this.solution.status != SolutionStatus.created
    && this.solution.solution == this.solution.newSolution
  }

  titleShare(): string {
    if (this.challenge.shareAccess == AccessOption.solvedOnly && this.challenge.status != ChallengeStatus.Completed){
      return 'Вы получите доступ к этой функции после решения задачи';
    } else if (this.solution.status == SolutionStatus.created || this.solution.solution == this.solution.newSolution){
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
    if (changes['challenge'].currentValue){
      if (this.challenge.solutions.length){
        this.setSolution(this.challenge.solutions[this.challenge.solutions.length-1])
      } else {
        this.addSolution();
      }
    }
  }
}
