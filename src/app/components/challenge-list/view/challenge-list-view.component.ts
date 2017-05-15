import { Component, OnInit } from '@angular/core';
import {ChallengeList} from "../../../model/challenege-list";
import {ActivatedRoute, Params} from "@angular/router";
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {ChallengeListService} from "../../../service/challenge-list.service";

@Component({
  selector: 'app-challenge-list-view',
  templateUrl: './challenge-list-view.component.html',
})
export class ChallengeListViewComponent implements OnInit {

  challengeList: ChallengeList;
  challengeStatus = ChallengeStatus;
  current: Challenge;
  page = 0;
  itemsPerPage = 4;

  constructor(
    private activeRoute: ActivatedRoute,
    private challengeListService: ChallengeListService,
  ) { }

  ngOnInit() {
    this.activeRoute.params
      .switchMap((params: Params) => this.challengeListService.getChallengeList(+params['id']))
      .subscribe((list: ChallengeList) => {
        this.challengeList = list;
        this.current = list.challenges[0];
      });
  }

}
