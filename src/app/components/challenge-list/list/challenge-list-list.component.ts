import {Component, Input, OnInit} from '@angular/core';
import {ChallengeList} from "../../../model/challenege-list";

@Component({
  selector: 'app-challenge-list-list',
  templateUrl: 'challenge-list-list.component.html',
})
export class ChallengeListListComponent implements OnInit {

  @Input()
  items: ChallengeList[];

  constructor() { }

  ngOnInit() {
  }

}
