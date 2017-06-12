import { Component, OnInit } from '@angular/core';
import {Challenge} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";

@Component({
  selector: 'app-random-challenge',
  templateUrl: 'random-challenge.component.html',
})
export class RandomChallengeComponent implements OnInit {

  challenge: Challenge;

  constructor(
    private challengeService: ChallengeService,
  ) { }

  ngOnInit() {
    this.challengeService.getRandomChallengeList()
      .then(list => this.challenge = list);
  }

}
