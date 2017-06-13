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
    this.reload();
  }

  reload(){
    this.challenge = null;
    this.challengeService.getRandomChallenge()
      .then(challenge => this.challenge = challenge);
  }
}
