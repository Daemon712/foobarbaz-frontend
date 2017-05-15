import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserAccount} from "../../../model/user-account";
import {UserService} from "../../../service/user.service";
import {Challenge} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import {ChallengeListService} from "../../../service/challenge-list.service";
import {ChallengeList} from "../../../model/challenege-list";
import {SharedSolution} from "../../../model/shared-solution";
import {SharedSolutionService} from "../../../service/shared-solution.service";

@Component({
  selector: 'app-user-view',
  templateUrl: 'user-view.component.html',
})
export class UserViewComponent implements OnInit {

  userAccount: UserAccount;
  challenges: Challenge[];
  bookmarks: Challenge[];
  challengeLists: ChallengeList[];
  solutions: SharedSolution[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private challengeService: ChallengeService,
    private challengeListService: ChallengeListService,
    private sharedSolutionService: SharedSolutionService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.userService.getUserAccount(params['username']))
      .subscribe((user: UserAccount) => {
        this.userAccount = user;
        this.loadChallenges();
        this.loadChallengeLists();
        this.loadBookmarks();
        this.loadSolutions();
      });
  }

  private loadChallenges(){
    this.challengeService.getChallengesByAuthor(this.userAccount.username)
      .then(challenges => this.challenges = challenges);
  }

  private loadChallengeLists(){
    this.challengeListService.getChallengeListsByAuthor(this.userAccount.username)
      .then(lists => this.challengeLists = lists);
  }

  private loadBookmarks(){
    this.challengeService.getBookmarksByUser(this.userAccount.username)
      .then(challenges => this.bookmarks = challenges);
  }

  private loadSolutions() {
    this.sharedSolutionService.getSharedSolutionsByUser(this.userAccount.username)
      .then(solutions => this.solutions = solutions);
  }
}
