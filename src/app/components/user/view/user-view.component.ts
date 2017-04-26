import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserAccount} from "../../../model/user-account";
import {UserService} from "../../../service/user.service";
import {Challenge} from "../../../model/challenge";
import {ChallengeService} from "../../../service/challenge.service";
import {PlaylistService} from "../../../service/playlist.service";
import {Playlist} from "../../../model/playlist";

@Component({
  selector: 'app-user-view',
  templateUrl: 'user-view.component.html',
})
export class UserViewComponent implements OnInit {

  userAccount: UserAccount;
  challenges: Challenge[];
  bookmarks: Challenge[];
  playlists: Playlist[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private challengeService: ChallengeService,
    private playlistService: PlaylistService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .switchMap((params: Params) => this.userService.getUserAccount(params['username']))
      .subscribe((user: UserAccount) => {
        this.userAccount = user;
        this.loadChallenges();
        this.loadPlaylists();
        this.loadBookmarks();
      });
  }

  loadChallenges(){
    this.challengeService.getChallengesByAuthor(this.userAccount.username)
      .then(challenges => this.challenges = challenges);
  }

  loadPlaylists(){
    this.playlistService.getPlaylistsByAuthor(this.userAccount.username)
      .then(playlists => this.playlists = playlists);
  }

  loadBookmarks(){
    this.challengeService.getBookmarksByUser(this.userAccount.username)
      .then(challenges => this.bookmarks = challenges);
  }

}
