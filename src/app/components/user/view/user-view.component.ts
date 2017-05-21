import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserAccount} from "../../../model/user-account";
import {UserService} from "../../../service/user.service";
import {Challenge} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import {ChallengeListService} from "../../../service/challenge-list.service";
import {ChallengeList} from "../../../model/challenege-list";
import {SharedSolution} from "../../../model/shared-solution";
import {SharedSolutionService} from "../../../service/shared-solution.service";
import {User} from "../../../model/user";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-view',
  templateUrl: 'user-view.component.html',
  styleUrls: ['user-view.component.css'],
})
export class UserViewComponent implements OnInit {

  userAccount: UserAccount;
  currentUser: User;
  userPhotoUrl: string;
  modifyInfoData: {
    name: string;
    description: string;
  };
  modifyPasswordData = {
    password: '',
    confirmPassword: '',
  };
  submitted: string;
  @ViewChild('modifyPasswordForm')
  modifyPasswordForm: NgForm;

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
    this.currentUser = this.userService.user;
    this.activatedRoute.params
      .switchMap((params: Params) => this.userService.getUserAccount(params['username']))
      .subscribe((user: UserAccount) => {
        if (!user) return;
        this.userAccount = user;
        this.userPhotoUrl = `/api/users/account/${user.username}/photo/max`;
        this.modifyInfoData = {
          name: user.name,
          description: user.description
        };
        this.loadChallenges();
        this.loadChallengeLists();
        this.loadBookmarks();
        this.loadSolutions();
      });
  }

  uploadPhoto(file: File){
    this.submitted = 'photo';
    this.userService.modifyUserPhoto(this.userAccount.username, file)
      .then(() => {
        this.submitted = null;
        this.userPhotoUrl = `/api/users/account/${this.userAccount.username}/photo/max?rand=${Math.random()}`;
      });
  }

  modifyInfo(){
    this.submitted = 'info';
    let info = Object.assign(new UserAccount(), this.modifyInfoData);
    info.username = this.userAccount.username;
    this.userService.modifyUserAccount(info)
      .then((account) => {
        this.submitted = null;
        Object.assign(this.userAccount, account)
      })
  }

  cancelModifyInfo(){
    this.modifyInfoData = {
      name: this.userAccount.name,
      description: this.userAccount.description
    };
  }

  modifyPassword(){
    this.submitted = 'password';
    this.userService.modifyUserPassword(this.userAccount.username, this.modifyPasswordData.password)
      .then(() => {
        this.submitted = null;
        this.modifyPasswordForm.reset();
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
