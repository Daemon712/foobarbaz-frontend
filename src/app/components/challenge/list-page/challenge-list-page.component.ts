import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../../../service/challenge.service";
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {Page} from "../../../model/page";

@Component({
  selector: 'app-challenge-list-page',
  templateUrl: 'challenge-list-page.component.html',
  styleUrls: ['challenge-list-page.component.scss']
})
export class ChallengeListPageComponent implements OnInit {
  page: Page<Challenge>;
  request = {
    page: null,
    sortField: 'created',
    sortDir: 'desc',
    name: null,
    rating: null,
    difficulty: null,
    status: null,
    tag: null,
  };
  defaultFilter = {
    status: null,
    rating: null,
    difficulty: null,
  };
  newFilter = Object.assign({}, this.defaultFilter);
  activeFilter = Object.assign({}, this.defaultFilter);
  challengeStatus = ChallengeStatus;

  constructor(
    private challengeService: ChallengeService
  ) { }

  ngOnInit() {
    this.challengeService.getChallenges({}).then(page => this.page = page);
  }

  private reload() {
    this.request.page = null;
    this.page.content = null;
    this.challengeService.getChallenges(this.request)
      .then(page => this.page = page);
  }

  changePage(newPage: number){
    this.page.content = null;
    this.request.page = newPage;
    this.challengeService.getChallenges(this.request)
      .then(page => this.page = page);
  }

  changeSort(){
    this.page.content = null;
    this.reload();
  }

  changeSearch(search: string){
    this.request.name = search;
    this.reload();
  }

  changeTag(tag: string){
    this.request.tag = tag;
    this.reload();
  }

  applyFilter(){
    this.activeFilter = Object.assign({}, this.newFilter);
    Object.assign(this.request, this.activeFilter);
    this.reload();
  }

  clearFilter(){
    let reload = !this.showApplyButton();
    this.newFilter = Object.assign({}, this.defaultFilter);
    this.activeFilter = Object.assign({}, this.defaultFilter);
    Object.assign(this.request, this.activeFilter);
    if (reload) this.reload();
  }

  showApplyButton(){
    return JSON.stringify(this.activeFilter) !== JSON.stringify(this.newFilter);
  }

  showClearButton(){
    return this.showApplyButton() || JSON.stringify(this.activeFilter) !== JSON.stringify(this.defaultFilter);
  }
}
