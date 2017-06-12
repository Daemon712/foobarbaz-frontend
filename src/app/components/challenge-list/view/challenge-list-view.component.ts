import { Component, OnInit } from '@angular/core';
import {ChallengeList} from "../../../model/challenege-list";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {ChallengeListService} from "../../../service/challenge-list.service";
import {User, UserRole} from "../../../model/user";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-challenge-list-view',
  templateUrl: 'challenge-list-view.component.html',
})
export class ChallengeListViewComponent implements OnInit {

  challengeList: ChallengeList;
  challengeStatus = ChallengeStatus;
  current: Challenge;
  page = 0;
  itemsPerPage = 4;
  currentUser: User;
  submitted: string;
  solved: number;
  all: number;

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private challengeListService: ChallengeListService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
    this.activeRoute.params
      .switchMap((params: Params) => this.challengeListService.getChallengeList(+params['id']))
      .subscribe((list: ChallengeList) => {
        this.challengeList = list;
        this.calcProgress();
      });
  }

  get canEdit(){
    return this.currentUser && (this.currentUser.username == this.challengeList.author.username
      || this.currentUser.role > UserRole.USER);
  }

  private calcProgress(){
    this.solved = this.challengeList.challenges.filter(c => c.status == ChallengeStatus.Completed).length;
    this.all = this.challengeList.challenges.length;
  }

  openInfo(){
    this.current = null;
    this.calcProgress();
  }

  like(){
    this.challengeList.liked = !this.challengeList.liked;
    this.challengeListService.likeChallengeList(this.challengeList.id, this.challengeList.liked)
      .then(rating => this.challengeList.rating = rating);
  }

  updateChallengeList(update: ChallengeList){
    this.submitted = 'edit';
    console.log(update.challenges.length);
    this.challengeListService.updateChallengeList(update)
      .then(value => {
        this.submitted = null;
        Object.assign(this.challengeList, value);
        this.calcProgress();
      });
  }

  deleteChallengeList(){
    this.submitted = 'delete';
    this.challengeListService.deleteChallengeList(this.challengeList.id)
      .then(() => this.router.navigate(['/challenge-lists']));
  }
}
