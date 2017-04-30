import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import 'rxjs/add/operator/switchMap';
import {AceEditorComponent} from "ng2-ace-editor";
import {Solution} from "../../../model/solution";
import {TestSolutionService} from "../../../service/test-solution.service";
import {SolutionStatus} from "../../../model/solutions-status";
import {AlertService} from "../../../service/alert.service";
import {SharedSolutionService} from "../../../service/shared-solution.service";

@Component({
  selector: 'app-view-challenge',
  templateUrl: 'view-challenge.component.html',
  styleUrls: ['view-challenge.component.css']
})
export class ViewChallengeComponent implements OnChanges {

  @ViewChild(AceEditorComponent)
  solutionEditor : AceEditorComponent;

  @Input()
  challenge: Challenge;
  challengeStatus = ChallengeStatus;
  solution: Solution;
  solutionStatus = SolutionStatus;

  submitted = false;
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
    private testSolutionService: TestSolutionService,
    private alertService: AlertService,
  ) { }

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
    this.challenge.bookmark = !this.challenge.bookmark;
    this.challengeService.updateBookmark(this.challenge.id, this.challenge.bookmark)
      .then((challenge) => this.challenge.bookmark = challenge.bookmark);
  }

  updateUserRating(userRating: {rating: number, difficulty: number}){
    this.challengeService.updateUserRating(
      this.challenge.id,
      (userRating.rating - 1) / 4,
      (userRating.difficulty - 1) / 4,
    )
      .then((challenge) => {
        this.challenge.userRating = challenge.userRating;
        this.challenge.userDifficulty = challenge.userDifficulty;
      });
  }

  testSolution(){
    this.submitted = true;
    let thatSolution = this.solution;
    this.testSolutionService.testSolution(this.challenge.id, this.solution)
      .then(solution => {
        this.submitted = false;
        Object.assign(thatSolution, solution);
        this.setSolution(solution);
        this.testResultsActive = true;
      }
    );
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
    this.solution = new Solution(null, 'Новое Решение', SolutionStatus.created, null, solution);
    this.challenge.solutions.push(this.solution);
    this.solutionEditor.setText(this.solution.newSolution);
    this.solutionEditor.updateText();
    this.solutionEditor.getEditor().clearSelection();
  }

  saveSolution(){
    this.submitted = true;
    let thatSolution = this.solution;
    let promise: Promise<Solution> = this.solution.status === SolutionStatus.created ?
      this.challengeService.addSolution(this.challenge.id, this.solution) :
      this.challengeService.updateSolution(this.challenge.id, this.solution);

    promise.then(solution => {
      this.submitted = false;
      if (solution){
        Object.assign(thatSolution, solution);
        this.setSolution(solution);
      }
    });
  }

  shareSolution(comment: string){
    this.sharedSolutionService.addSharedSolution(this.challenge.id, this.solution.id, comment);
  }

  revertChanges(){
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
      this.challengeService.deleteSolution(this.challenge.id, this.solution.id)
        .then(() => {
          this.challenge.solutions.splice(index, 1);
          if (this.challenge.solutions.length == 0) this.addSolution();
          this.setSolution(this.challenge.solutions[Math.min(index, this.challenge.solutions.length - 1)]);
        })
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
      if (!this.challenge.solutions) this.challenge.solutions = [];
      if (this.challenge.solutions.length){
        this.challenge.solutions.forEach(s => s.newSolution = s.solution);
        this.setSolution(this.challenge.solutions[this.challenge.solutions.length-1])
      } else {
        this.addSolution();
      }
    }
  }
}
