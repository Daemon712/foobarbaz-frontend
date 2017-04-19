import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserAccount} from "../../../model/user-account";
import {UserService} from "../../../service/user.service";
import {Challenge} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";

@Component({
  selector: 'app-user-view',
  templateUrl: 'user-view.component.html',
})
export class UserViewComponent implements OnInit {

  userAccount: UserAccount;
  challenges: Challenge[];
  bookmarks: Challenge[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private challengeService: ChallengeService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.userService.getUserAccount(params['username']))
      .subscribe((user: UserAccount) => this.userAccount = user);

    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getChallengesByAuthor(params['username']))
      .subscribe((challenges: Challenge[]) => this.challenges = challenges);

    this.activatedRoute.params
      .switchMap((params: Params) => this.challengeService.getBookmarksByUser(params['username']))
      .subscribe((challenges: Challenge[]) => this.bookmarks = challenges);
  }
}
