import {Component, Input} from '@angular/core';
import {Challenge, ChallengeStatus} from "../../../model/challenge";

@Component({
  selector: 'app-challenge-list',
  templateUrl: 'challenge-list.component.html',
  styleUrls: ['challenge-list.component.css']
})
export class ChallengeListComponent {
  @Input()
  challenges: Challenge[];
  challengeStatus = ChallengeStatus;
  math = Math;
}
