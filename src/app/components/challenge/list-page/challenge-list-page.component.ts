import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../../../service/challenge.service";
import {Challenge} from "../../../model/challenge";

@Component({
  selector: 'app-challenge-list-page',
  templateUrl: 'challenge-list-page.component.html',
  styleUrls: ['challenge-list-page.component.scss']
})
export class ChallengeListPageComponent implements OnInit {
  challenges: Challenge[];
  page = 1;
  sortField = "created";
  sortReverse = false;
  defaultFilter = {
    name: null,
    author: null,
    statusNotStarted: true,
    statusInProgress: true,
    statusCompleted: true,
    createdAfter: null,
    createdBefore: null,
  };
  newFilter = Object.assign({}, this.defaultFilter);
  activeFilter = Object.assign({}, this.defaultFilter);


  constructor(
    private challengeService: ChallengeService
  ) { }

  ngOnInit() {
    this.challengeService.getChallenges().then(
      challenges => this.challenges = challenges
    );
  }

  applyFilter(){
    console.log(this.newFilter);
    this.activeFilter = Object.assign({}, this.newFilter);
  }

  clearFilter(){
    this.newFilter = Object.assign({}, this.defaultFilter);
    this.activeFilter = Object.assign({}, this.defaultFilter);
  }

  showApplyButton(){
    return JSON.stringify(this.activeFilter) !== JSON.stringify(this.newFilter);
  }

  showClearButton(){
    return this.showApplyButton() || JSON.stringify(this.activeFilter) !== JSON.stringify(this.defaultFilter);
  }
}
