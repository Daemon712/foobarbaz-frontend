import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../../../service/challenge.service";
import {Challenge, ChallengeStatus} from "../../../model/challenge";

@Component({
  selector: 'app-challenge-list',
  templateUrl: 'challenge-list.component.html',
  styleUrls: ['challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[];
  challengeStatus = ChallengeStatus;
  page = 1;
  sortField = "created";
  sortReverse = false;
  filter = {
    name: null,
    author: null,
    status: {
      notStarted: true,
      inProgress: true,
      completed: true,
    },
    createdAfter: null,
    createdBefore: null,
  };


  constructor(
      private challengeService: ChallengeService
  ) { }

  ngOnInit() {
    this.challengeService.getChallenges().then(
        challenges => this.challenges = challenges
    );
  }

}
