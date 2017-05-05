import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../../../service/challenge.service";
import {Challenge} from "../../../model/challenge";
import {Page} from "../../../model/page";

@Component({
  selector: 'app-challenge-list-page',
  templateUrl: 'challenge-list-page.component.html',
  styleUrls: ['challenge-list-page.component.scss']
})
export class ChallengeListPageComponent implements OnInit {
  page: Page<Challenge>;
  sortField = "created";
  sortDir = 'desc';
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
    this.challengeService.getChallenges().then(page => this.page = page);
  }

  changePage(newPage: number){
    this.page.content = null;
    this.challengeService.getChallenges(newPage, this.sortField, this.sortDir)
      .then(page => this.page = page);
  }

  changeSort(){
    this.page.content = null;
    this.challengeService.getChallenges(null, this.sortField, this.sortDir)
      .then(page => this.page = page);
  }

  applyFilter(){
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
