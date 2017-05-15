import { Component, OnInit } from '@angular/core';
import {ChallengeList} from "../../../model/challenege-list";
import {ChallengeListService} from "../../../service/challenge-list.service";

@Component({
  selector: 'app-challenge-list-list-page',
  templateUrl: './challenge-list-list-page.component.html',
})
export class challengeListListPageComponent implements OnInit {

  items: ChallengeList[];

  constructor(
    private challengeListService: ChallengeListService,
  ) { }

  ngOnInit() {
    this.challengeListService.getChallengeLists()
      .then(items => this.items = items);
  }

}
