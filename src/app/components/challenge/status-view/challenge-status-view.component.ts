import {Component, Input} from '@angular/core';
import {ChallengeStatus} from "../../../model/challenge";

@Component({
  selector: 'app-challenge-status-view',
  templateUrl: './challenge-status-view.component.html',
})
export class ChallengeStatusViewComponent {
  @Input()
  status: ChallengeStatus;
  challengeStatus = ChallengeStatus;
}
