import {Component, OnInit, ViewChild} from '@angular/core';
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {SharedSolution} from "../../../model/shared-solution";
import {ActivatedRoute, Params} from "@angular/router";
import {ChallengeService} from "../../../service/challenge.service";
import {AceEditorComponent} from "ng2-ace-editor";
import {SharedSolutionService} from "../../../service/shared-solution.service";

@Component({
  selector: 'app-shared-solution-view',
  templateUrl: './shared-solution-view.component.html',
  styleUrls: ['./shared-solution-view.component.scss']
})
export class SharedSolutionViewComponent implements OnInit {

  @ViewChild(AceEditorComponent)
  solutionView: AceEditorComponent;

  challenge: Challenge;
  solution: SharedSolution;
  challengeStatus = ChallengeStatus;

  options = {
    printMargin: false,
    fontSize: '16px',
    highlightActiveLine: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private challengeService: ChallengeService,
    private sharedSolutionService: SharedSolutionService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .switchMap((params: Params) => this.challengeService.getChallenge(+params['id']))
    .subscribe((challenge: Challenge) => {
      this.challenge = challenge;
    });

    this.activatedRoute.params
      .switchMap((params: Params) => this.sharedSolutionService.getSharedSolution(+params['id'], +params['share_id']))
      .subscribe((solution: SharedSolution) => {
        this.solution = solution;
        this.solutionView.setText(solution.text);
        this.solutionView.getEditor().clearSelection();
      });
  }

  like(){
    this.solution.liked = !this.solution.liked;
    this.solution.likes += this.solution.liked ? +1 : -1;
    this.sharedSolutionService.likeSharedSolution(this.challenge.id, this.solution.id, this.solution.liked)
      .then(solution => {
        this.solution.liked = solution.liked;
        this.solution.likes = solution.likes;
      });
  }
}
