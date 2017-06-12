import { Component, OnInit } from '@angular/core';
import {ChallengeList} from "../../../model/challenege-list";
import {ChallengeListService} from "../../../service/challenge-list.service";
import {Page} from "../../../model/page";

@Component({
  selector: 'app-challenge-list-list-page',
  templateUrl: 'challenge-list-list-page.component.html',
})
export class challengeListListPageComponent implements OnInit {

  page: Page<ChallengeList>;
  search: string;

  constructor(
    private challengeListService: ChallengeListService,
  ) { }

  ngOnInit() {
    this.challengeListService.getChallengeLists()
      .then(page => this.page = page);
  }

  changePage(newPage: number){
    this.page.content = null;
    this.challengeListService.getChallengeLists(newPage, this.search)
      .then(page => this.page = page);
  }

  changeSearch(search: string){
    this.page.content = null;
    this.search = search;
    this.challengeListService.getChallengeLists(null, this.search)
      .then(page => this.page = page);
  }
}
