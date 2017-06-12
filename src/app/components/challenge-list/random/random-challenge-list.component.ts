import { Component, OnInit } from '@angular/core';
import {ChallengeList} from "../../../model/challenege-list";
import {ChallengeListService} from "../../../service/challenge-list.service";

@Component({
  selector: 'app-random-challenge-list',
  templateUrl: 'random-challenge-list.component.html',
})
export class RandomChallengeListComponent implements OnInit {

  challengeList: ChallengeList;

  constructor(
    private challengeListService: ChallengeListService,
  ) { }

  ngOnInit() {
    this.challengeListService.getRandomChallengeList()
      .then(list => this.challengeList = list);
  }

}
