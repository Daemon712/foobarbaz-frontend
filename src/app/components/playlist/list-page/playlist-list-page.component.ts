import { Component, OnInit } from '@angular/core';
import {Playlist} from "../../../model/playlist";
import {PlaylistService} from "../../../service/playlist.service";

@Component({
  selector: 'app-playlist-list-page',
  templateUrl: './playlist-list-page.component.html',
})
export class PlaylistListPageComponent implements OnInit {

  items: Playlist[];

  constructor(
    private playlistService: PlaylistService,
  ) { }

  ngOnInit() {
    this.playlistService.getPlaylists()
      .then(items => this.items = items);
  }

}
