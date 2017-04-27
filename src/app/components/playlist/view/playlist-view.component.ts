import { Component, OnInit } from '@angular/core';
import {Playlist} from "../../../model/playlist";
import {ActivatedRoute, Params} from "@angular/router";
import {Challenge, ChallengeStatus} from "../../../model/challenge";
import {PlaylistService} from "../../../service/playlist.service";

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
})
export class PlaylistViewComponent implements OnInit {

  playlist: Playlist;
  challengeStatus = ChallengeStatus;
  current: Challenge;
  page = 0;
  itemsPerPage = 4;

  constructor(
    private activeRoute: ActivatedRoute,
    private playlistService: PlaylistService,
  ) { }

  ngOnInit() {
    this.activeRoute.params
      .switchMap((params: Params) => this.playlistService.getPlaylist(+params['id']))
      .subscribe((playlist: Playlist) => {
        this.playlist = playlist;
        this.current = playlist.challenges[0];
      });
  }

}
