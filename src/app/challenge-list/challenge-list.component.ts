import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ChallengeService} from "../service/challenge.service";
import {Challenge} from "../model/challenge";

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[];

  constructor(
      private router: Router,
      private challengeService: ChallengeService
  ) { }

  ngOnInit() {
    this.challengeService.getChallenges().then(
        challenges => this.challenges = challenges
    );
  }

}
