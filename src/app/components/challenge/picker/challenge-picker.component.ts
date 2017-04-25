import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Challenge} from "../../../model/challenge";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {ChallengeService} from "../../../service/challenge.service";
import {SortableComponent, TypeaheadMatch} from "ng2-bootstrap";

@Component({
  selector: 'app-challenge-picker',
  templateUrl: './challenge-picker.component.html',
  styleUrls: ['./challenge-picker.component.scss']
})
export class ChallengePickerComponent implements OnInit {

  @ViewChild(SortableComponent)
  sortableComponent: SortableComponent;

  @Output()
  challengesChange = new EventEmitter();

  @Input()
  challenges: Challenge[];

  newChallenge: Challenge;

  availableChallenges: Observable<Challenge[]>;

  constructor(
    private challengeService: ChallengeService,
  ) { }

  ngOnInit() {
    this.availableChallenges = Observable
      .create((observer: Observer<Challenge>) => observer.next(this.newChallenge))
      .mergeMap((search: string) =>
        this.challengeService
          .getChallengesByName(search)
          .then(challenges => {
            return !this.challenges ? challenges :
              challenges.filter(c1 => this.challenges.map(c2 => c2.id).indexOf(c1.id) < 0);
          })
      );
  }

  onSelect(match: TypeaheadMatch){
    if (this.challenges == null) this.challenges = [];
    this.challenges.push(match.item);
    this.sortableComponent.writeValue(this.challenges);
    this.challengesChange.emit(this.challenges);
    this.newChallenge = null;
  }

  removeItem(index: number){
    this.challenges.splice(index, 1);
    this.sortableComponent.writeValue(this.challenges);
    this.challengesChange.emit(this.challenges);
  }
}
